import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const CurrencyConverter = ({onClose}) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [currencies, setCurrencies] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Get list of currencies
  useEffect(() => {
    fetch("https://api.frankfurter.app/currencies")
      .then((res) => res.json())
      .then((data) => {
        const formatted = Object.entries(data).reduce((acc, [code, name]) => {
          acc[code] = { description: name };
          return acc;
        }, {});
        setCurrencies(formatted);
      })
      .catch((err) => console.error("❌ Failed to fetch currencies", err));
  }, []);

  // Convert amount
  const convert = () => {
    if (!amount || !fromCurrency || !toCurrency || !currencies) return;

    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        const rate = data.rates[toCurrency];
        if (rate) {
          setConvertedAmount(rate.toFixed(2));
        } else {
          setConvertedAmount("Conversion failed");
          console.error("Invalid response", data);
        }
      })
      .catch((err) => {
        console.error("❌ Conversion error", err);
        setConvertedAmount("Conversion failed");
      });
  };

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency, currencies]);

  return (
    <div className="p-4 bg-transparent shadow-md rounded-xl border-y-2 border-gray-500/20 max-w-md mx-auto mt-4 text-black">
        <div className="flex items-center justify-between mb-3 ">
      <h2 className="text-lg font-truculenta text-white ">🌍 Currency Converter</h2>
      <button
      onClick={(onClose)} className="" >
        <IoMdClose className="text-white text-3xl bg-white/10 border rounded-full p-1 hover:scale-103 hover:bg-red-500/70 hover:border-transparent active:scale-95 duration-500 transform-gpu cursor-pointer" />
       </button>
        </div>
      <div className="mb-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-400/50 bg-white/10 p-2 w-full rounded-xl hover:scale-102 duration-500 "
        />
      </div>

      <div className="flex gap-2 mb-4">
        <select
          className="border rounded-xl p-2 w-full bg-black/10 hover:bg-white/10 duration-300 text-white text-sm cursor-pointer"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies ? (
            Object.entries(currencies).map(([code, data]) => (
              <option key={code} value={code}>
                {code} - {data.description}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>

        <select
          className="border rounded-xl p-2 w-full bg-black/10 hover:bg-white/10 duration-300 text-white text-sm cursor-pointer"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies ? (
            Object.entries(currencies).map(([code, data]) => (
              <option key={code} value={code}>
                {code} - {data.description}
              </option>
            ))
          ) : (
            <option>Loading...</option>
          )}
        </select>
      </div>

      <div className="text-lg text-center font-semibold text-white">
        {convertedAmount && (
          <p>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
