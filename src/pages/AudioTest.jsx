import AudioLevelMeter from "@shared/ui/Audio/AudioVisual.jsx";
import { useState } from "react";

const TestAudioPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        {isVisible ? "Tắt Hiển Thị" : "Bật Hiển Thị"}
      </button>

      {isVisible && (
        <div className="w-full max-w-sm p-3 rounded-lg">
          <AudioLevelMeter enableAudioOutput={false} />
        </div>
      )}
    </div>
  );
};

export default TestAudioPage;
