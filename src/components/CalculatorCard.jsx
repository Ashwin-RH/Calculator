import React, { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import { CiGrid41 } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const CalculatorCard = ({ result, buttons, handleClick, clear, deleteElement, calculate, openHistory }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="z-10 relative bg-black/40 border border-gray-200/40 backdrop-blur-[4px] p-6 rounded-2xl shadow-2xl w-80 hover:scale-101 duration-500 transform-gpu will-change-transform">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-white text-left font-truculenta text-lg">Eval</h1>

        <div className="relative">
          <button onClick={() => setShowMenu(prev => !prev)} className="flex gap-1 items-center">
            <CiGrid41 className="text-white text-3xl hover:scale-110 p-1 hover:bg-gray-200/20 hover:rounded-full duration-500" />
            <BsThreeDotsVertical className="text-white text-3xl p-1 hover:scale-110 hover:bg-gray-200/20 hover:rounded-full duration-500" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-black/40 text-white border border-white/20 backdrop-blur-4xl  rounded-xl z-50 shadow-lg">
                <button
                onClick={() => {
                    setShowMenu(false);
                    console.log("Settings clicked");
                }}
                className="block w-full px-4 py-2 border-b border-white/10 hover:bg-white/20"
                >
                Settings
                </button>
                <button
                onClick={() => {
                    setShowMenu(false);
                    openHistory();
                    setTimeout(() => {
                    document.getElementById("history")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }}
                className="block w-full px-4 py-2 hover:bg-white/20"
                >
                History
                </button>
            </div>
            )}

        </div>
      </div>

      <Display result={result} />
      <ButtonGrid
        buttons={buttons}
        handleClick={handleClick}
        clear={clear}
        deleteElement={deleteElement}
        calculate={calculate}
      />
    </div>
  );
};

export default CalculatorCard;
