import React from "react";

export interface PlansProps {
  className?: string;
}
const Plans: React.FC<PlansProps> = ({ className }) => {
  return (
    <div
      className={`bg-white flex flex-col text-center justify-center items-center w-full p-2 border-[0.5px] ${className}`}
    >
      <p className="text-3xl">Starter</p>
      <p className="text-3xl flex text-end items-end mt-1">
        $299<p className="text-xs">Per Month</p>
      </p>
      <p className="mt-3 font-semibold">$0-$15k</p>
      <p className="font-light">in monthly expenses</p>
      <button className="bg-[#57CF7E] w-[80%] rounded-md text-white p-3 mt-3">
        Get Started
      </button>
    </div>
  );
};

export default Plans;
