import React, { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import CalculatorCard from "./components/CalculatorCard";
import HistoryPanel from "./components/HistoryPanel";
import Footer from "./components/Footer";

function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);
  const [showHistory, setShowHistory] = useState(false);


  const handleClick = (e) => {
    let value = e.target.id;
    if (value === "x") value = "*";
    if (value === "." && result.endsWith(".")) return;

    if (justCalculated) {
      setResult(/[0-9.]/.test(value) ? value : result + value);
      setJustCalculated(false);
    } else {
      setResult(result + value);
    }
  };

  const clear = () => setResult("");
  const deleteElement = () => setResult(result.slice(0, -1));

  const calculate = useCallback(() => {
    if (!result || result === "Invalid" || result.trim() === "") return;
    try {
      const evaluated = Function('"use strict"; return (' + result + ')')();
      if (isNaN(evaluated)) {
        setResult("Invalid");
        setTimeout(() => setResult(""), 1000);
      } else {
        setHistory((prev) => [...prev, `${result} = ${evaluated}`]);
        setResult(evaluated.toString());
        setJustCalculated(true);
      }
    } catch {
      setResult("Invalid");
      setTimeout(() => setResult(""), 1000);
    }
  }, [result]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (/[0-9+\-*/.%]/.test(key)) {
        const value = key === "*" ? "*" : key;
        if (justCalculated) {
          setJustCalculated(false);
          setResult(/[0-9.]/.test(value) ? value : result + value);
        } else {
          setResult((prev) => prev + value);
        }
      } else if (key === "Enter") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        deleteElement();
      } else if (key.toLowerCase() === "c") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [calculate, justCalculated, result]);

  const buttons = [
    ["AC", "operator", clear],
    ["DE", "operator", deleteElement],
    [".", "operator", handleClick],
    ["/", "operator", handleClick],
    ["7", "number", handleClick],
    ["8", "number", handleClick],
    ["9", "number", handleClick],
    ["x", "operator", handleClick],
    ["4", "number", handleClick],
    ["5", "number", handleClick],
    ["6", "number", handleClick],
    ["-", "operator", handleClick],
    ["1", "number", handleClick],
    ["2", "number", handleClick],
    ["3", "number", handleClick],
    ["+", "operator", handleClick],
    ["00", "number", handleClick],
    ["0", "number", handleClick],
    ["=", "operator", calculate],
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-700">
      <Toaster position="top-center" />
      <div className="absolute w-[200px] h-[200px] bg-white/30 rounded-full -top-20 -left-12 z-0 hover:bg-white/60 hover:scale-105 duration-500"></div>

      <CalculatorCard
        result={result}
        buttons={buttons}
        handleClick={handleClick}
        clear={clear}
        deleteElement={deleteElement}
        calculate={calculate}
        openHistory={() => setShowHistory(true)}
      />

      <HistoryPanel
      history={history}
      clearHistory={() => setHistory([])}
      showHistory={showHistory} />
      <div className="pb-20" />
      <Footer />
    </div>
  );
}

export default App;
