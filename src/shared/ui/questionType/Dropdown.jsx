import { Select } from "antd";
import { useEffect, useState } from "react";
import * as yup from "yup";

const { Option } = Select;

const validationSchema = yup.object().shape({
  selectedOption: yup.string().required("Please select an answer"),
});

const DropdownQuestion = ({
  questionData,
  onChange,
  className = "inline-block mx-2", // Custom className
  dropdownWidth = "w-52", // Custom width for dropdown
  dropdownHeight = "h-9", // Custom height for dropdown
  dropdownFontSize = "text-base", // Custom font size for dropdown options
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (questionData) {
      setSelectedOptions({});
      setError("");
    }
  }, [questionData]);

  if (!questionData)
    return <p className="text-gray-600">No question data available.</p>;

  const handleSelectChange = async (key, value) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: value }));

    try {
      await validationSchema.validate({ selectedOption: value });
      setError("");
      onChange(questionData.id, key, value);
    } catch (validationError) {
      setError(validationError.message);
    }
  };

  const isComplexAnswers = (answers) => {
    return Object.values(answers).every((value) => typeof value === "object");
  };

  // Calculating the size and font adjustments dynamically
  const selectClassNames = `${dropdownWidth} ${dropdownHeight} ${dropdownFontSize}`;

  return (
    <div className={`${className} bg-dark p-6 rounded-lg`}>
      <p className="text-xl text-gray-800 mb-4 whitespace-pre-line">
        {questionData.question}
      </p>

      {isComplexAnswers(questionData.answers) ? (
        Object.entries(questionData.answers).map(([key, options]) => (
          <div key={key} className="flex mb-6">
            <div className="w-6">
              <p className="text-lg text-center p-1 text-gray-700">
                <span className="font-bold">{key}.</span>
              </p>
            </div>

            <Select
              placeholder="Select an answer"
              onChange={(value) => handleSelectChange(key, value)}
              value={selectedOptions[key] || undefined}
              className={selectClassNames}
            >
              {Object.entries(options).map(([optionKey, optionValue]) => (
                <Option
                  key={optionKey}
                  value={optionKey}
                  className="py-3 px-4 hover:bg-blue-50"
                >
                  {optionValue}
                </Option>
              ))}
            </Select>
          </div>
        ))
      ) : (
        <Select
          placeholder="Choose an answer"
          onChange={(value) => handleSelectChange("selected", value)}
          value={selectedOptions["selected"] || undefined}
          className={selectClassNames}
        >
          {Object.entries(questionData.answers).map(([key, value]) => (
            <Option
              key={key}
              value={key}
              className="py-3 px-4 hover:bg-blue-50"
            >
              {value}
            </Option>
          ))}
        </Select>
      )}

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default DropdownQuestion;
