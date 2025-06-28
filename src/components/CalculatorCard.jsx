import React, { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import CurrencyConverter from "./CurrencyConverter"; 
import { CiGrid41 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { BiArea } from "react-icons/bi";
import { IoIosSpeedometer } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { FaTemperatureHalf } from "react-icons/fa6";



const CalculatorCard = ({ result, buttons, handleClick, clear, deleteElement, calculate, openHistory }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDiff,setShowDiff] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  

  return (
    <div className="z-10 relative bg-black/40 border border-gray-200/40 backdrop-blur-[4px] p-6 rounded-2xl shadow-2xl w-80 hover:scale-101 duration-500 transform-gpu will-change-transform">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-white text-left font-truculenta text-lg">Eval</h1>

        <div className="relative flex gap-1">
          <button onClick={() => setShowDiff(prev => !prev)} >
            <CiGrid41 className="text-white text-3xl hover:scale-110 p-1 hover:bg-gray-200/20 hover:rounded-full duration-500" />
          </button>
          <button onClick={() => setShowMenu(prev => !prev)} >
            <BsThreeDotsVertical className="text-white text-3xl p-1 hover:scale-110 hover:bg-gray-200/20 hover:rounded-full duration-500" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-6 mt-1 w-36 h-22 divide-y divide-gray-500 bg-black/60 text-white border-r border-white/20 backdrop-blur-[1px]  rounded-xl overflow-hidden">
               <button
                onClick={() => {
                    setShowMenu(false);
                    openHistory();
                    setTimeout(() => {
                    document.getElementById("history")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }}
                className="block w-full h-9 px-4 py-2 active:scale-95 "
                >
                History
                </button>
                <button
                onClick={() => {
                    setShowMenu(false);
                    console.log("Settings clicked");
                }}
                className="block w-full h-9 px-4 py-2 mb-1 active:scale-95"
                >
                Settings
                </button>
               
            </div>
            )}

        </div>
      </div>

            {!showDiff ? (
        <>
          <Display result={result} />
          <ButtonGrid
            buttons={buttons}
            handleClick={handleClick}
            clear={clear}
            deleteElement={deleteElement}
            calculate={calculate}
          />
        </>
      ) : (
        <div className="w-full h-64 flex flex-col text-white rounded-xl border-x border-y border-gray-600/20 shadow-md p-4">
        {/* Top row: Back + Title */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowDiff(false)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm"
          >
            <IoChevronBack />
          </button>
          <h2 className="font-truculenta text-center text-lg">Unit Conversion</h2>
          {/* Empty div to balance layout (same width as button) */}
          <div className="w-[32px]" />
        </div>

        {/* Grid of conversion options */}
        <div className="w-full grid grid-cols-3 gap-2 cursor-pointer">
          <button 
          onClick={()=>setShowCurrency(prev => !prev)}
          className="h-20 flex flex-col items-center justify-between rounded-xl border-2 border-gray-400/30  m-1 shadow-lg hover:border-gray-300/50 hover:scale-101 duration-300 active:scale-95 transition-all transform-gpu will-change-transform">
            <MdOutlineCurrencyRupee className="text-6xl p-2" />
            <span className="text-sm text-white/80 mb-1">Currency</span>
          </button>

          <button className="h-20 flex flex-col items-center justify-between rounded-xl border-2 border-gray-400/30 m-1 shadow-lg hover:border-gray-300/50 hover:scale-101 duration-300 active:scale-95 transition-all transform-gpu will-change-transform">
            <GiWeight className="text-6xl p-2" />
            <span className="text-sm mb-1">Weight</span>
          </button>

          <button className="h-20 flex flex-col items-center justify-between rounded-xl border-2 border-gray-400/30 m-1 shadow-lg hover:border-gray-300/50 hover:scale-101 duration-300 active:scale-95 transition-all transform-gpu will-change-transform">
            <BiArea className="text-6xl p-2" />
            <span className="text-sm mb-1">Area</span>
          </button>

          <button className="h-20 flex flex-col items-center justify-between rounded-xl border-2 border-gray-400/30 m-1 shadow-lg hover:border-gray-300/50 hover:scale-101 duration-300 active:scale-95 transition-all transform-gpu will-change-transform">
            <IoIosSpeedometer className="text-6xl p-2" />
            <span className="text-sm mb-1">Speed</span>
          </button>

          <button className="h-20 flex flex-col items-center justify-between rounded-xl border-2 border-gray-400/30 m-1 shadow-lg hover:border-gray-300/50 hover:scale-101 duration-300 active:scale-95 transition-all transform-gpu will-change-transform">
            <FaTemperatureHalf className="text-6xl p-2" />
            <span className="text-sm mb-1">Speed</span>
          </button>
        </div>
      </div>   
      )}
      {showCurrency && <CurrencyConverter onClose={() => setShowCurrency(false)} />}




    </div>
  );
};

export default CalculatorCard;
