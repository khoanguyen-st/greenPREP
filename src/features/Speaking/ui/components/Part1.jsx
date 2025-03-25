import { AudioMutedOutlined, AudioOutlined } from "@ant-design/icons";
import { useState } from "react";
import useAntiCheat from "../../../../shared/utils/antiCheat";
import useCountdownTimer from "../../../../shared/utils/useCountdownTimer";

const Part1 = () => {
  const [isActive, setIsActive] = useState(true);
  const { showAlert, alertMessage, enableFullScreen } = useAntiCheat();

  const toggleSound = () => {
    setIsActive(!isActive);
  };

  // Force Full-Screen Mode and Prevent Tab Switching


  return (
    <div className="flex flex-row bg-white rounded-xl h-screen w-screen">
      <div className="lg:w-auto sm:w-1/2 pt-28 pl-28">
        <h1 className="text-4xl font-bold text-[#003087] mb-6">Speaking Test</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-9">Part 1 of 3</h2>
          <p className="mb-20 text-2xl">
            <span className="font-bold">Part One</span> - In this part, I am going to ask you three short questions about yourself and your interests. You will have 30 seconds to reply to each question.
          </p>
          <p className="text-2xl">Click next to begin the speaking test.</p>
        </div>
      </div>
      <div className="lg:w-1/3 sm:w-1/2 mx-8 shadow-[10px_10px_4px_rgba(0,48,135,0.25)] my-6 min-h-3/4 rounded-3xl border-2 border-solid border-[#003087]">
        <span className="flex justify-center m-10 text-5xl font-normal">Instruction...</span>
        <div className="flex items-center justify-center bg-transparent">
          <button
            onClick={toggleSound}
            className="w-56 h-56 rounded-full flex items-center justify-center border-2 transition-all border-solid border-[#003087] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-[10px_10px_4px_rgba(0,48,135,0.25)] bg-white"
            aria-label={isActive ? "Mute sound" : "Unmute sound"}
          >
            {isActive ? <AudioOutlined style={{ fontSize: "6rem", color: "#0047AB" }} /> : <AudioMutedOutlined style={{ fontSize: "6rem", color: "#0047AB" }} />}
          </button>

        </div>
        {useCountdownTimer(20)}
      </div>
    </div>
  );
};

export default Part1;
