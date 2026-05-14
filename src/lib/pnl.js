export function calculatePortfolio(transactions, prices = {}) {
  const grouped = {};
  let totalRealizedPnL = 0;

  transactions.forEach((tx) => {
    if (!grouped[tx.coin]) {
      grouped[tx.coin] = {
        lots: [],
        realizedPnL: 0,
      };
    }

    const asset = grouped[tx.coin];

    if (tx.type === "buy") {
      asset.lots.push({
        quantity: tx.quantity,
        price: tx.price,
      });
    }

    if (tx.type === "sell") {
      let remaining = tx.quantity;

      while (remaining > 0 && asset.lots.length > 0) {
        const firstLot = asset.lots[0];

        const soldQty = Math.min(remaining, firstLot.quantity);

        const profit = soldQty * (tx.price - firstLot.price);

        asset.realizedPnL += profit;
        totalRealizedPnL += profit;

        firstLot.quantity -= soldQty;
        remaining -= soldQty;

        if (firstLot.quantity === 0) {
          asset.lots.shift();
        }
      }

      if (remaining > 0) {
        throw new Error(`Sell exceeds holdings for ${tx.coin}`);
      }
    }
  });

  const holdings = Object.entries(grouped).map(([coin, asset]) => {
    const quantity = asset.lots.reduce(
      (sum, lot) => sum + lot.quantity,
      0
    );

    const costBasis = asset.lots.reduce(
      (sum, lot) => sum + lot.quantity * lot.price,
      0
    );

    const currentPrice = prices[coin] || 0;
    const currentValue = quantity * currentPrice;
    const unrealizedPnL = currentValue - costBasis;

    return {
      coin,
      quantity,
      costBasis,
      currentValue,
      unrealizedPnL,
      realizedPnL: asset.realizedPnL,
      pnlPercent: costBasis
        ? ((unrealizedPnL / costBasis) * 100).toFixed(2)
        : 0,
    };
  });

  return {
    holdings,
    totalRealizedPnL,
    totalValue: holdings.reduce(
      (sum, item) => sum + item.currentValue,
      0
    ),
  };
}

/*
Sample test:

Buy 1 BTC @ 50000
Buy 1 BTC @ 60000
Sell 1.5 BTC @ 70000

Expected:
Realized profit:
1 BTC => 20000
0.5 BTC => 5000

Total = 25000

Remaining:
0.5 BTC from second lot
*/