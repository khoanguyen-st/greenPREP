import TimeRemaining from "@shared/ui/TimeRemaining/TimeRemaining";
import QuestionNavigator from "@shared/ui/QuestionNavigatior/QuestionNavigatior";
import { useState } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const QuestionNavigatorContainer = ({
  data,
  answers,
  flaggedQuestions,
  setCurrentPartIndex,
  currentPartIndex,
  handleSubmit,
}) => {
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  return (
    <div>
      <Button
        className="md:hidden fixed bottom-[50%] right-5 bg-blue-500 text-white rounded-full p-2 shadow-lg"
        onClick={() => setIsNavigatorOpen(!isNavigatorOpen)}
      >
        <MenuOutlined />
      </Button>
      <div
        className={`fixed right-2 z-50 w-60 h-auto border border-black-300 rounded-lg shadow-lg bg-white p-2
      ${isNavigatorOpen ? "block" : "hidden"} md:block
      bottom-[65%] mdL:bottom-[70%]`}
      >
        <TimeRemaining duration={10 * 60} onAutoSubmit={handleSubmit} />
        <QuestionNavigator
          values={data.Parts.map((part) => {
            const isFlagged = part.Questions.some(
              (_, index) => flaggedQuestions[`answer-${part.ID}-${index}`],
            );
            const isAnswered = Object.keys(answers).some(
              (key) =>
                key.startsWith(`answer-${part.ID}`) &&
                answers[key]?.trim() !== "",
            );

            let type = "unanswered";
            if (isAnswered && isFlagged) {
              type = "answered-flagged";
            } else if (isFlagged) {
              type = "flagged";
            } else if (isAnswered) {
              type = "answered";
            }

            return { type };
          })}
          action={setCurrentPartIndex}
          position={currentPartIndex}
        />
      </div>
    </div>
  );
};

export default QuestionNavigatorContainer;
