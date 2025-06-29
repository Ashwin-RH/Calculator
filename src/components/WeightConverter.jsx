import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const units = {
  Kilograms: 1,
  Grams: 1000,
  Pounds: 2.20462,
  Ounces: 35.274,
};

const WeightConverter = ({onClose}) => {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Kilograms");
  const [toUnit, setToUnit] = useState("Grams");
  const [convertedValue, setConvertedValue] = useState("");

  const handleConvert = () => {
    if (isNaN(inputValue) || inputValue === "") {
      setConvertedValue("Invalid input");
      return;
    }

    const inKg = parseFloat(inputValue) / units[fromUnit];
    const result = inKg * units[toUnit];
    setConvertedValue(result.toFixed(4));
  };

  return (
    <div className="p-4 bg-transparent rounded-xl border-y-2 border-gray-500/20 shadow-md max-w-md mx-auto mt-4">
        <div className="flex items-center justify-between mb-3 ">
              <h2 className="text-lg font-truculenta text-white ">Weight Converter</h2>
              <button
              onClick={(onClose)} className="" >
                <IoMdClose className="text-white text-3xl bg-white/10 border rounded-full p-1 hover:scale-103 hover:bg-red-500/70 hover:border-transparent active:scale-95 duration-500 transform-gpu cursor-pointer" />
               </button>
                </div>
      <div className="mb-3">
        <input
          type="text"
          className="border border-gray-400/50 text-base bg-white/10 p-2 w-full rounded-xl hover:scale-102 duration-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter weight"
        />
      </div>

      <div className="flex justify-between mb-3">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="w-[48%] p-2 border rounded-xl bg-white/10 text-white hover:bg-white/20 duration-500 cursor-pointer"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-[48%] p-2 border rounded-xl bg-white/10 text-white hover:bg-white/20 duration-500 cursor-pointer"
        >
          {Object.keys(units).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleConvert}
        className="w-full  bg-transparent border text-white py-2 px-4 rounded-xl hover:bg-green-500 hover:shadow-md active:scale-95 duration-500 transition-all transform-gpu will-change-transform"
      >
        Convert
      </button>

      {convertedValue && (
        <div className="mt-4 text-center text-md font-semibold text-white">
          {inputValue} {fromUnit} = {convertedValue} {toUnit}
        </div>
      )}
    </div>
  );
};

export default WeightConverter;
