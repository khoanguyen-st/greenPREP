import { Form, Input, Typography } from "antd";
import FlagButton from "@shared/ui/FLagButton/FlagButton";

const { Text } = Typography;

const QuestionForm = ({
  currentPart,
  partNumber,
  answers,
  flaggedQuestions,
  handleFlagToggle,
  handleTextChange,
  countWords,
  wordCounts,
  DEFAULT_MAX_WORDS,
}) => {
  return (
    <Form layout="vertical">
      {currentPart.Questions.map((question, index) => {
        const fieldName = `answer-${currentPart.ID}-${index}`;
        const maxWords =
          partNumber === 1
            ? null
            : question.maxWords || DEFAULT_MAX_WORDS[partNumber];
        return (
          <Form.Item
            key={fieldName}
            label={
              <div className="flex items-center justify-between w-[1000px] gap-2">
                <div className="flex-1 pl-2 md:pl-0">{question.Content}</div>
                <div className="smL:mr-[-12px]">
                  <FlagButton
                    initialFlagged={flaggedQuestions[fieldName] || false}
                    onFlag={() => handleFlagToggle(fieldName)}
                  />
                </div>
              </div>
            }
            name={fieldName}
            initialValue={answers[fieldName] || ""}
            rules={[
              { required: false },
              ...(maxWords
                ? [
                    {
                      validator: (_, value) =>
                        countWords(value || "") > maxWords
                          ? Promise.reject(`Maximum ${maxWords} words!`)
                          : Promise.resolve(),
                    },
                  ]
                : []),
            ]}
          >
            <Input.TextArea
              rows={5}
              autoSize={{ minRows: 5, maxRows: 10 }}
              className="w-full"
              placeholder="Enter your answer here"
              value={answers[fieldName] || ""}
              onChange={(e) => handleTextChange(fieldName, e.target.value)}
            />
            {maxWords && (
              <Text
                className={`mt-1 block text-sm ${wordCounts[fieldName] > maxWords ? "text-red-500" : "text-gray-500"}`}
              >
                {`Word count: ${wordCounts[fieldName] || 0} / ${maxWords}`}
              </Text>
            )}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default QuestionForm;
