export function saveTransactions(data) {
  localStorage.setItem("transactions", JSON.stringify(data));
}

export function loadTransactions() {
  return JSON.parse(localStorage.getItem("transactions")) || [];
}