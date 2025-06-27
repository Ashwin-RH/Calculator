import React from "react";
import toast from "react-hot-toast";

const Display = ({ result }) => {
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!", {
        duration: 2000,
        className: "bg-gray-800 text-white text-md px-4 py-2 rounded-2xl shadow-md",
      });
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="w-full text-white text-right mb-4 text-2xl p-3 rounded-xl bg-white/10 font-mono shadow-md hover:scale-105 duration-500 border border-gray-300/50 focus:outline-none"
    >
      {result || "0"}
    </div>
  );
};

export default Display;
