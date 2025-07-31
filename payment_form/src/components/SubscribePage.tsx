import React from "react";
import ToggleButtons from "./ToggleButton";
import Plans from "./Plans";

export interface SubscribeProps {
  className?: string;
}

const loremArray = ["lorem", "lorem", "lorem", "lorem", "lorem"];

const SubscribePage: React.FC<SubscribeProps> = ({ className }) => {
  return (
    <div
      className={`flex flex-col !justify-center w-full !items-center ${className}`}
    >
      <ToggleButtons className="mt-4 w-[500px]" />

      <div className="grid grid-cols-5 w-full mt-6">
        <Plans className="col-start-2" />
        <Plans />
        <Plans />
        <Plans />
      </div>
      <div className="bg-white grid grid-cols-5 w-full h-[50px]">
        {loremArray.map((lorem) => (
          <div className="border-[0.5px] text-center flex justify-center items-center">
            {lorem}
          </div>
        ))}
      </div>
      <div className="bg-white grid grid-cols-5 w-full h-[150px]">
        {loremArray.map((lorem) => (
          <div className="border-[0.5px] text-center flex justify-center items-center">
            {lorem}
          </div>
        ))}
      </div>
      <div className="bg-white grid grid-cols-5 w-full h-[150px]">
        {loremArray.map((lorem) => (
          <div className="border-[0.5px] text-center flex justify-center items-center">
            {lorem}
          </div>
        ))}
      </div>
      <div className="bg-white grid grid-cols-5 w-full h-[150px]">
        {loremArray.map((lorem) => (
          <div className="border-[0.5px] text-center flex justify-center items-center">
            {lorem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribePage;
