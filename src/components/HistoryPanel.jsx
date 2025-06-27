import React from "react";

const HistoryPanel = ({ history, clearHistory, showHistory }) => {
  if (!showHistory) return null; // 🚫 Don't render unless needed

  return (
    <div
      id="history"
      className="bg-black/35 p-2 border border-gray-200/40 backdrop-blur[4px] mb-2 mt-2 hover:shadow-md hover:scale-101 duration-500 transform-gpu will-change-transform rounded-2xl w-80 max-h-40 overflow-y-auto"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-white font-truculenta font-medium pl-1">History</h3>
        <button
          onClick={clearHistory}
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
  );
};

export default HistoryPanel;
