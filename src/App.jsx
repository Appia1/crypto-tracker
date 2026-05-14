import { useState, useEffect } from "react";
import { loadTransactions, saveTransactions } from "./lib/storage";
import { usePrices } from "./hooks/usePrices";
import { coins } from "./data/coins";
import { calculatePortfolio } from "./lib/pnl";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import PortfolioSummary from "./components/PortfolioSummary";
import HoldingsTable from "./components/HoldingsTable";

function App() {
  const [transactions, setTransactions] = useState(loadTransactions());
  const { prices, error } = usePrices(coins);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  function addTransaction(tx) {
    setTransactions((prev) => [...prev, tx]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) =>
      prev.filter((t) => t.id !== id)
    );
  }

  const portfolio = calculatePortfolio(transactions, prices);

  if (loading) {
    return (
      <div className="container">
        <h1>Loading Portfolio...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Crypto Portfolio</h1>

      {error && <p className="error">{error}</p>}

      <div className="card">
        <PortfolioSummary portfolio={portfolio} />
      </div>

      <div className="card">
        <TransactionForm
          onAdd={addTransaction}
          transactions={transactions}
        />
      </div>

      <div className="grid">
        <div className="card">
          <HoldingsTable holdings={portfolio.holdings} />
        </div>

        <div className="card">
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default App;