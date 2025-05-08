const CURRENCIES = ["USD", "EUR", "GBP", "ARS", "MXN", "BRL", "COP", "CLP", "JPY", "CAD"];
    const API_BASE = "https://api.frankfurter.app";

    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const amountInput = document.getElementById("amount");
    const resultEl = document.getElementById("result");
    const errorEl = document.getElementById("error");
    const convertBtn = document.getElementById("convertBtn");

    function populateSelects() {
      CURRENCIES.forEach(currency => {
        const opt1 = document.createElement("option");
        const opt2 = document.createElement("option");
        opt1.value = opt2.value = currency;
        opt1.textContent = opt2.textContent = currency;
        fromSelect.appendChild(opt1);
        toSelect.appendChild(opt2);
      });
      fromSelect.value = "USD";
      toSelect.value = "EUR";
    }

    async function convertCurrency() {
      const amount = parseFloat(amountInput.value);
      const from = fromSelect.value;
      const to = toSelect.value;

      resultEl.textContent = "";
      errorEl.textContent = "";

      if (isNaN(amount) || amount <= 0) {
        errorEl.textContent = "⚠️ Ingresa una cantidad válida.";
        return;
      }

      if (from === to) {
        resultEl.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/latest?amount=${amount}&from=${from}&to=${to}`);
        const data = await res.json();
        resultEl.textContent = `${amount} ${from} = ${data.rates[to].toFixed(2)} ${to}`;
      } catch (err) {
        errorEl.textContent = "❌ Error al convertir. Intenta más tarde.";
      }
    }

    convertBtn.addEventListener("click", convertCurrency);
    window.addEventListener("load", populateSelects);