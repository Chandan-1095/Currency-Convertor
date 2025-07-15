document.addEventListener("DOMContentLoaded", () => {
  const apiKey = `5f95bc0a8a45ba281d1d7916`; // Replace with your actual API key
  const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  const convertBtn = document.getElementById('convert');
  const result = document.getElementById('result');

  const currencies = ["USD", "INR", "EUR", "GBP", "JPY", "CAD", "AUD"];

  // Populate dropdowns properly
  currencies.forEach(currency => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    fromCurrency.add(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toCurrency.add(option2);
  });

  // Set default selections
  fromCurrency.value = "USD";
  toCurrency.value = "INR";

  convertBtn.addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || isNaN(amount)) {
      alert("Please enter a valid number.");
      return;
    }

    try {
      // ✅ Use backticks here for proper interpolation
      const response = await fetch(`${apiUrl}${from}`);
      
      // Optional: check for non-OK HTTP responses
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.result === "error") {
        result.innerText = "Error fetching exchange rates.";
        return;
      }

      const rate = data.conversion_rates[to];
      const converted = (amount * rate).toFixed(2);

      // ✅ Use backticks here too
      result.innerText = `${amount} ${from} = ${converted} ${to}`;
    } catch (error) {
      result.innerText = "Failed to connect to exchange rate API.";
      console.error(error); // Helpful for debugging
    }
  });
});
