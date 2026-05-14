function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return <p className="empty">No transactions yet</p>;
  }

  return (
    <div>
      <h2>Transactions</h2>

      {transactions.map((t) => (
        <div key={t.id} className="item">
          <b>{t.type.toUpperCase()}</b>
          <p>{t.coin}</p>
          <p>{t.quantity} @ ${t.price}</p>
          <p>{t.date}</p>

          <button onClick={() => onDelete(t.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;