import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <input
          id="usd"
          type="number"
          placeholder="Enter a value in USD"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}

      <ul>
        {coins.map((item) => (
          <li>
            {item.name} ({item.symbol}): {item.quotes.USD.price} 💰 You can
            purchase{" "}
            {inputValue !== 0 &&
              (inputValue / item.quotes.USD.price).toFixed(5)}{" "}
            {item.name} COINS.
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
