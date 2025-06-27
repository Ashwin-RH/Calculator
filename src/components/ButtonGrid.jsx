import React from "react";

const ButtonGrid = ({ buttons, handleClick, clear, deleteElement, calculate }) => {
  const getButtonStyle = (label) => {
    if (label === "AC") return "bg-black/40 text-gray-300 rounded-full border-2 border-gray-300";
    if (label === "DE") return "bg-black/40 rounded-full border-2";
    if (label === "=") return "bg-transparent hover:bg-green-500 text-white rounded-full border-2 border-white/40 hover:scale-105 duration-500 col-span-2";
    if (["/", "x", "-", "+", "."].includes(label)) return "rounded-2xl border-2 border-gray-300/50";
    return "bg-transparent border-2 border-gray-200/10 rounded-3xl";
  };

  return (
    <div className="grid grid-cols-4 gap-3">
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
  );
};

export default ButtonGrid;
