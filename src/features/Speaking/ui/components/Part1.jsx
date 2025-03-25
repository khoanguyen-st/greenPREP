import { AudioMutedOutlined, AudioOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Part1 = () => {
  const [isActive, setIsActive] = useState(true);

  const toggleSound = () => {
    setIsActive(!isActive);
  };

  // Force Full-Screen Mode and Prevent Tab Switching
  useEffect(() => {
  const enterFullScreen = () => {
    const elem = document.documentElement;

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    }
  };


    enterFullScreen();

    // Detect when user exits full-screen and re-enter
    const onFullScreenChange = () => {
      if (!document.fullscreenElement) {
        enterFullScreen();
      }
    };

    // Detect when the tab is hidden (user switches tab)
    const onVisibilityChange = () => {
      if (document.hidden) {
        document.title = "⚠️ Please return to the test!";
      } else {
        document.title = "Speaking Test";
        enterFullScreen(); // Re-enter full-screen
        window.focus(); // Force focus back
      }
    };

    // Detect keyboard shortcuts for tab switching (Alt+Tab)
    const onKeyDown = (e) => {
      if (e.key === "F11" || (e.altKey && e.key === "Tab")) {
        e.preventDefault();
      }
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

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
      <div className="lg:w-1/3 sm:w-1/2 mx-8 shadow-[10px_10px_4px_rgba(0,48,135,0.25)] my-6 min-h-3/4 rounded-3xl border-2  border-[#003087]">
        <span className="flex justify-center m-10 text-5xl font-normal">Instruction...</span>
        <div className="flex items-center justify-center bg-transparent">
          <button
            onClick={toggleSound}
            className="w-56 h-56 rounded-full flex items-center justify-center border-2 transition-all hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-[10px_10px_4px_rgba(0,48,135,0.25)] bg-white"
            aria-label={isActive ? "Mute sound" : "Unmute sound"}
          >
            {isActive ? <AudioOutlined style={{ fontSize: "6rem", color: "#0047AB" }} /> : <AudioMutedOutlined style={{ fontSize: "6rem", color: "#0047AB" }} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Part1;
