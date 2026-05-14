import { useEffect, useState } from "react";
import { fetchPrices } from "../lib/priceService";

export function usePrices(coins) {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;

    async function loadPrices() {
      try {
        const data = await fetchPrices(coins);
        setPrices(data);
        setError("");
      } catch (error) {
        console.log(error);
        setError("Using last known prices");
      }
    }

    loadPrices();

    interval = setInterval(loadPrices, 60000);

    return () => clearInterval(interval);
  }, [coins]);

  return { prices, error };
}