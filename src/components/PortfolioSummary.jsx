function PortfolioSummary({ portfolio }) {
  return (
    <div>
      <h2>Portfolio Overview</h2>

      <div className="summary-value">
        ${portfolio.totalValue.toFixed(2)}
      </div>

      <div className="summary-label">Total Portfolio Value</div>

      <p
        className={
          portfolio.totalRealizedPnL >= 0 ? "profit" : "loss"
        }
      >
        Realized P&L: ${portfolio.totalRealizedPnL.toFixed(2)}
      </p>
    </div>
  );
}

export default PortfolioSummary;