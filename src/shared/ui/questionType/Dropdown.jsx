import { Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";

const { Option } = Select;

const validationSchema = yup.object().shape({
  selectedOption: yup.string().required("Please select an answer"),
});

const DropdownQuestion = ({
  questionData,
  onChange,
  className = "",
  small = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState({});

  const processedData = useMemo(() => {
    if (!questionData) return null;
    try {
      const parsedAnswerContent = JSON.parse(questionData.AnswerContent);
      const options = parsedAnswerContent.options || [];
      const answers = {};
      options.forEach(({ key, value }) => {
        answers[key] = value;
      });
      const correctAnswers = {};
      (parsedAnswerContent.correctAnswer || []).forEach(({ key, value }) => {
        correctAnswers[key] = value;
      });
      return {
        id: questionData.ID,
        question: questionData.Content,
        answers,
        correctAnswers,
      };
    } catch (error) {
      console.error("Error parsing question data:", error);
      return null;
    }
  }, [questionData]);

  useEffect(() => {
    if (processedData) {
      setSelectedOptions({});
      setError({});
    }
  }, [processedData]);

  const handleSelectChange = async (key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
    try {
      await validationSchema.validate({ selectedOption: value });
      setError((prev) => ({ ...prev, [key]: "" }));
      if (onChange) {
        onChange(processedData.id, key, value);
      }
    } catch (validationError) {
      setError((prev) => ({ ...prev, [key]: validationError.message }));
    }
  };

  if (!processedData)
    return (
      <p className="text-gray-600 text-center">No question data available.</p>
    );

  const isSingleQuestion = Object.keys(processedData.answers).length === 1;

  return (
    <div
      className={`${className} bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto`}
    >
      <div
        className={`flex ${
          isSingleQuestion
            ? "text-wrap w-full gap-4 justify-center items-center"
            : "flex-col items-center"
        }`}
      >
        <p className="text-sm font-semibold text-gray-800 mb-4">
          {processedData.question}
        </p>

        {Object.entries(processedData.answers).map(([key, options]) => (
          <div key={key} className="flex w-full mb-4">
            {Object.keys(processedData.answers).length > 1 && (
              <div className="w-7 ">
                <p className="text-lg text-gray-700 font-bold p-1">{key}.</p>
              </div>
            )}

            <div
              className={`flex ${isSingleQuestion ? " items-center w-1/4" : "w-1/2"}`}
            >
              <Select
                onChange={(value) => handleSelectChange(key, value)}
                value={selectedOptions[key]}
                className={`w-full ${small ? "h-8 text-xs" : "h-10 text-sm"} border border-gray-300 rounded-md`}
              >
                {options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </div>
            {error[key] && (
              <p className="text-red-500 text-xs mt-2">{error[key]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownQuestion;
