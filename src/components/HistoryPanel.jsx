import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const HistoryPanel = ({ history, clearHistory, showHistory, closeHistory }) => {
  const [visible, setVisible] = useState(false);

  // Handle visibility based on parent prop
  useEffect(() => {
    if (showHistory) {
      setVisible(true); // show immediately
    } else {
      // start fade-out, and remove after animation
      setTimeout(() => setVisible(false), 300); // match transition time
    }
  }, [showHistory]);

  // If not even visible (after fade-out), don’t render
  if (!showHistory && !visible) return null;

  return (
    <div
      id="history"
      className={`transition-all duration-500 ease-in-out 
        ${showHistory ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} 
        bg-black/35 p-2 border border-gray-200/40 backdrop-blur-[4px] mb-2 mt-2 
        rounded-2xl w-80 max-h-40 overflow-y-auto transform-gpu`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-white font-truculenta font-medium pl-1">History</h3>
        <div className="flex gap-3">
          <button
            onClick={clearHistory}
            className="mt-1 px-1.5 py-0.5 border text-sm text-white rounded-full font-mono bg-white/10 hover:bg-white/20 hover:scale-105 duration-300"
          >
            Clear History
          </button>
          <button onClick={closeHistory}>
            <IoMdClose className="text-white text-3xl bg-white/10 border rounded-full p-1 hover:scale-103 hover:bg-red-500/70 hover:border-transparent active:scale-95 duration-500 transform-gpu cursor-pointer" />
          </button>
        </div>
      </div>

      <ul className="text-md text-gray-200 mt-2">
        {history.slice().reverse().map((item, index) => (
          <li key={index} className="block text-right border-b border-gray-200/10">{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPanel;
