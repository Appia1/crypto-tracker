import { useState } from "react";
import { coins } from "../data/coins";

function TransactionForm({ onAdd, transactions }) {
  const [form, setForm] = useState({
    type: "buy",
    coin: "bitcoin",
    quantity: "",
    price: "",
    date: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function getHeld(coin) {
    let total = 0;

    transactions.forEach((t) => {
      if (t.coin === coin) {
        if (t.type === "buy") total += t.quantity;
        if (t.type === "sell") total -= t.quantity;
      }
    });

    return total;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const quantity = Number(form.quantity);
    const price = Number(form.price);

    if (quantity <= 0) return setError("Quantity must be > 0");
    if (price <= 0) return setError("Price must be > 0");

    if (form.type === "sell") {
      const held = getHeld(form.coin);
      if (quantity > held)
        return setError(`Cannot sell more than ${held}`);
    }

    onAdd({
      id: crypto.randomUUID(),
      type: form.type,
      coin: form.coin,
      quantity,
      price,
      date: form.date,
    });

    setError("");
    setForm({
      type: "buy",
      coin: "bitcoin",
      quantity: "",
      price: "",
      date: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      {error && <p className="error">{error}</p>}

      <select name="type" onChange={handleChange} value={form.type}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>

      <select name="coin" onChange={handleChange} value={form.coin}>
        {coins.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input name="quantity" placeholder="Quantity" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;