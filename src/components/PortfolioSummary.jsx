function PortfolioSummary({ portfolio }) {
  return (
    <div>
      <h2>Portfolio Summary</h2>

      <p>Total Portfolio Value: ${portfolio.totalValue.toFixed(2)}</p>
      <p>
        Total Realized Profit/Loss: $
        {portfolio.totalRealizedPnL.toFixed(2)}
      </p>
    </div>
  );
}

export default PortfolioSummary;