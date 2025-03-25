import TimeRemaining from "@shared/ui/TimeRemaining/TimeRemaining";
import QuestionNavigator from "@shared/ui/QuestionNavigatior/QuestionNavigatior";

const QuestionNavigatorContainer = ({
  data,
  answers,
  flaggedQuestions,
  setCurrentPartIndex,
  currentPartIndex,
  handleSubmit,
}) => {
  return (
    <div className="fixed right-2 z-50 w-60 h-auto border-2 border-black rounded-lg shadow-lg bg-white p-2 bottom-[65%] md:bottom-[70%]">
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
  );
};

export default QuestionNavigatorContainer;
