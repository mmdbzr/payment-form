import { useState } from "react";

export interface TogggleProps {
  className?: string;
}

const ToggleButtons: React.FC<TogggleProps> = ({ className }) => {
  const [activeButton, setActiveButton] = useState("button1");

  const handleToggle = (button: string) => {
    setActiveButton(button);
  };

  const getButtonStyles = (button: string) =>
    `px-4 py-2 rounded-md font-medium transition-colors duration-200 w-full text-center ${
      activeButton === button
        ? "bg-[#57CF7E] text-white"
        : "text-black hover:bg-gray-300"
    }`;

  return (
    <div className={`p-4 border-2 border-[#57CF7E] rounded-lg ${className}`}>
      <div className="grid grid-cols-3 gap-4  justify-center">
        <button
          className={getButtonStyles("button1")}
          onClick={() => handleToggle("button1")}
        >
          Button 1
        </button>
        <button
          className={getButtonStyles("button2")}
          onClick={() => handleToggle("button2")}
        >
          Button 2
        </button>
        <button
          className={getButtonStyles("button3")}
          onClick={() => handleToggle("button3")}
        >
          Button 3
        </button>
      </div>
    </div>
  );
};

export default ToggleButtons;
