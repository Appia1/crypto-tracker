export async function fetchPrices(coins) {
  const ids = coins.join(",");

  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch prices");
  }

  const data = await response.json();

  const prices = {};

  for (const coin in data) {
    prices[coin] = data[coin].usd;
  }

  return prices;
}