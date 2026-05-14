function HoldingsTable({ holdings }) {
  if (!holdings.length) {
    return <p className="empty">No holdings yet</p>;
  }

  return (
    <div>
      <h2>Holdings</h2>

      {holdings.map((h) => (
        <div key={h.coin} className="item">
          <b>{h.coin.toUpperCase()}</b>

          <p>Qty: {h.quantity}</p>
          <p>Cost: ${h.costBasis.toFixed(2)}</p>
          <p>Value: ${h.currentValue.toFixed(2)}</p>

          <p className={h.unrealizedPnL >= 0 ? "profit" : "loss"}>
            Unrealized: ${h.unrealizedPnL.toFixed(2)}
          </p>

          <p>Realized: ${h.realizedPnL.toFixed(2)}</p>
          <p>{h.pnlPercent}%</p>
        </div>
      ))}
    </div>
  );
}

export default HoldingsTable;