import React, { useEffect, useState } from "react";
import { FiGithub , } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";


function App() {
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (e) => {
  let value = e.target.id;
  // Convert 'x' to '*' for actual calculation
  if(value === "x") value="*"
  if (value === "." && result.endsWith(".")) return;
  setResult(result.concat(value));
};


  const clear = () => {
    setResult("");
  };

  const deleteElement = () => {
    setResult(result.slice(0, -1));
  };

const calculate = () => {
  try {
    if (result.trim() === "") {
      setResult("Invalid");
      setTimeout(() => setResult(""), 1500);
      return;
    }

    const evaluated = eval(result);

    if (evaluated === undefined || evaluated === null || isNaN(evaluated)) {
      setResult("Invalid");
      setTimeout(() => setResult(""), 1000);
    } else {
      // ✅ Save to history here
      setHistory(prev => [...prev, `${result} = ${evaluated}`]);

      setResult(evaluated.toString());
    }
  } catch (error) {
    setResult("Invalid");
    setTimeout(() => setResult(""), 1000);
  }
};

useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key;

    if (/[0-9+\-*/.%]/.test(key)) {
      setResult(prev => prev + (key === '*' ? '*' : key));
    } else if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      setResult(prev => prev.slice(0, -1));
    } else if (key.toLowerCase() === 'c') {
      clear();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [calculate, clear]); // Add dependencies if you define calculate/clear with useCallback




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

const getButtonStyle = (label) => {
  if (label === "AC") return "  bg-black/40 text-gray-300 rounded-full border-2 border-gray-300";
  if (label === "DE") return "bg-black/40 rounded-full border-2";
  if (label === "=") return "bg-transparent hover:bg-green-500 text-white rounded-full border-2 border-white/40 hover:scale-105 duration-500 col-span-2";
  if (["/", "x", "-", "+", "."].includes(label)) return " rounded-2xl border-2 border-gray-300/50";
  return "bg-transparent border-2 border-gray-200/10 rounded-3xl";
};


  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-700">
      <Toaster position="top-center" />
       {/* 🔵 Background Circle */}
    <div className="absolute w-[200px] h-[200px] bg-white/30 rounded-full  -top-20 -left-12 -bottom-20 z-0 hover:bg-white/60 hover:scale-105 duration-500"></div>
      {/* Calculator card */}
      <div className="z-10 bg-black/40 border border-gray-200/40 backdrop-blur-[4px] p-6 rounded-2xl shadow-2xl w-80 hover:scale-101 duration-500 transform-gpu will-change-transform">
      <h1 className="text-white text-left font-truculenta font-medium "> Eval </h1>
        <div
        onClick={() => {
          if (result) {
            navigator.clipboard.writeText(result);
            toast.success("Copied to clipboard!", {
              duration: 2000,
              className:"bg-gray-800 text-white text-md px-4 py-2 rounded-2xl shadow-md",
            });

          }
        }}
          className="w-full text-white text-right mb-4 text-2xl p-3 rounded-xl bg-white/10 font-mono shadow-md hover:scale-105 duration-500  border border-gray-300/50 focus:outline-none"
        >
          {result || "0"}
          </div>

        <div className="grid grid-cols-4 gap-3 ">
          {buttons.map(([label, type, onClick]) => (
            <button
              key={label}
              id={type === "number" || type === "operator" ? label : undefined}
              className={`${getButtonStyle(label)} text-white p-3 rounded font-semibold transition transform-gpu will-change-transform hover:scale-101 active:scale-95`}
              onClick={onClick}
            >
              {label}
            </button>
          ))}
          
        </div>
        </div>

        <div className="bg-black/35 p-2 border border-gray-200/40 backdrop-blur[4px] mb-2 mt-2 hover:shadow-md hover:scale-101 duration-500 transform-gpu will-change-transform rounded-2xl w-80 max-h-40 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h3 className=" text-white font-truculenta font-medium pl-1">History</h3>
          <button
            onClick={() => setHistory([])}
            className="mt-1 px-1.5 py-0.5 border text-sm text-white rounded-full font-mono bg-white/10 hover:bg-white/20 hover:scale-105 duration-500 transition-all transform-gpu will-change-transform focus:outline-none"
          >
            Clear History
          </button>
          </div>

          <ul className="text-md text-gray-200 mt-2">
            {history.slice().reverse().map((item, index) => (
              <li key={index} className="block text-right border-b border-gray-200/10">{item}</li>
            ))}
          </ul>
        </div>

          <div className="absolute bottom-4 text-sm text-gray-300 hover:text-gray-100 cursor-pointer">
            &copy; Ashwin Haragi

            <div className="flex items-center justify-center gap-2 mt-1 text-sm">
            <div className="relative flex flex-col items-center justify-center ">
            <a
              href="https://github.com/Ashwin-RH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300/70 hover:text-gray-100 hover:scale-102"
              >
                <FiGithub size={16}/>
              </a>
              </div> 
              
             <div className="relative flex flex-col items-center justify-center">
              <a
                href="https://www.linkedin.com/in/ashwin-rh-aa263b217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300/70 hover:text-gray-100"
                >
                  <LuLinkedin size={16}/>
                </a>
              </div> 
            </div>
         </div>     
      </div>
    
  );
}

export default App;
