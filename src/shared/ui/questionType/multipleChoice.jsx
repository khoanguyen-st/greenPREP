import { useState, useMemo } from 'react';
import { Typography } from 'antd';
import { multipleChoiceAnswerSchema } from 'src/shared/model/questionType/multipleQuestion.schemas';
const { Title, Text } = Typography;

const MultipleChoice = ({ 
  questionData,
  onSubmit,
  className = '',
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(null);

  // Parse và validate AnswerContent với useMemo
  const { options, isValid } = useMemo(() => {
    try {
      const parsedContent = JSON.parse(questionData.AnswerContent)[0];
      // Validate với schema
      multipleChoiceAnswerSchema.validateSync(parsedContent);
      return { options: parsedContent.options, isValid: true };
    } catch (err) {
      setError(err.message);
      return { options: [], isValid: false };
    }
  }, [questionData.AnswerContent]);

  const handleClick = (optionValue) => {
    setSelectedOption(optionValue);
    onSubmit(optionValue);
  };

  if (!isValid) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-md">
        <p>Lỗi dữ liệu: {error}</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Title level={5} className="mb-6">
        {questionData.Content}
      </Title>
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.value;
          return (
            <div
              key={option.key}
              onClick={() => handleClick(option.value)}
              className={`
                flex w-full h-[48px] border rounded-md cursor-pointer transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-sm'
                }
              `}
            >
              <div 
                className={`
                  flex items-center justify-center w-[48px] min-w-[48px] border-r rounded-l-md
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : 'border-gray-200 bg-gray-50 group-hover:bg-gray-100'
                  }
                `}
              >
                <Text strong className="select-none text-base" style={{ color: isSelected ? 'white' : 'inherit' }}>
                  {option.key}
                </Text>
              </div>
              <div className="flex-1 flex items-center">
                <Text className="px-5 select-none text-base" style={{ color: isSelected ? '#1a56db' : '#374151' }}>
                  {option.value}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoice;