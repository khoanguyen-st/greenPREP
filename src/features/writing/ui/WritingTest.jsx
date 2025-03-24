import { useQuery } from "@tanstack/react-query";
import { Form, Input, Button, Typography, Spin } from "antd";
import { useState, useEffect } from "react";

const { Title, Text } = Typography;

const fakeWritingData = [
  {
        ID: "1",
        PartID: "Part 1",
        Content: "Answer these 4 questions briefly.",
        SubContent: [
          { question: "What is your name?" },
          { question: "Where are you from?"},
          { question: "What is your favorite hobby?"},
          { question: "Describe your last vacation."},
        ],
      },
      {
        ID: "2",
        PartID: "Part 2",
        Content: "Write a short message (50-100 words) to your friend.",
        SubContent: [
          { question: "You forgot your friend's birthday. Write an apology message.", maxWords: 100 },
        ],
      },
      {
        ID: "3",
        PartID: "Part 3",
        Content: "Write a short email (100-150 words).",
        SubContent: [
          { question: "You want to apply for a job. Write an email to the hiring manager.", maxWords: 150 },
          { question: "Describe why you are interested in this job.", maxWords: 150 },
          { question: "Mention your relevant skills.", maxWords: 150 },
        ],
      },
      {
        ID: "4",
        PartID: "Part 4",
        Content: "Write a short essay (150-200 words).",
        SubContent: [
          { question: "Some people believe that technology makes life better. Do you agree or disagree?", maxWords: 200 },
          { question: "Support your answer with examples.", maxWords: 200 },
        ],
      },
];

const fetchWritingQuestions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeWritingData), 1000);
  });
};

const WritingTestScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["writingQuestions"],
    queryFn: fetchWritingQuestions,
  });

  const [form] = Form.useForm();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [wordCounts, setWordCounts] = useState({});
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("writingAnswers")) || {};
  });

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("writingAnswers")) || {};
    setAnswers(storedAnswers);
    form.setFieldsValue(storedAnswers);
    updateWordCounts(storedAnswers);
  }, [currentPartIndex]);

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const updateWordCounts = (updatedAnswers) => {
    const newWordCounts = {};
    if (data) {
      data.forEach((part) => {
        part.SubContent.forEach((subQ, index) => {
          const fieldName = `answer-${part.ID}-${index}`;
          newWordCounts[fieldName] = countWords(updatedAnswers[fieldName] || "");
        });
      });
    }
    setWordCounts(newWordCounts);
  };

  const handleTextChange = (field, text) => {
    const newAnswers = { ...answers, [field]: text };
    setAnswers(newAnswers);
    localStorage.setItem("writingAnswers", JSON.stringify(newAnswers));

    setWordCounts((prev) => ({
      ...prev,
      [field]: countWords(text),
    }));
  };

  const handleSubmit = () => {
    console.table(answers);
  };

  if (isLoading) return <Spin className="flex justify-center items-center h-screen" />;
  if (isError) return <div className="text-red-500 text-center">Error fetching data</div>;

  const currentPart = data[currentPartIndex];

  return (
    <div className="max-w-3xl mx-auto p-5">
      <Title level={2} className="text-center">
        Writing Test - {currentPart.PartID}
      </Title>

      <Text className="block text-lg mb-3">{currentPart.Content}</Text>

      <Form form={form} layout="vertical">
        {currentPart.SubContent.map((subQ, index) => {
          const fieldName = `answer-${currentPart.ID}-${index}`;
          const hasWordLimit = typeof subQ.maxWords === "number";

          return (
            <Form.Item
              key={fieldName}
              label={<Text>{subQ.question}</Text>}
              name={fieldName}
              initialValue={answers[fieldName] || ""}
              rules={[
                { required: true, message: "You need to answer" },
                ...(hasWordLimit
                  ? [
                      {
                        validator: (_, value) =>
                          countWords(value || "") > subQ.maxWords
                            ? Promise.reject(`Maximum ${subQ.maxWords} word!`)
                            : Promise.resolve(),
                      },
                    ]
                  : []),
              ]}
            >
              <>
                <Input.TextArea
                  rows={4}
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  placeholder="Enter your answer here"
                  value={answers[fieldName] || ""}
                  onChange={(e) => handleTextChange(fieldName, e.target.value)}
                />
                {hasWordLimit && (
                  <Text
                    className={`block text-sm mt-1 ${
                      wordCounts[fieldName] > subQ.maxWords ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {`Word count: ${wordCounts[fieldName] || 0} / ${subQ.maxWords}`}
                  </Text>
                )}
              </>
            </Form.Item>
          );
        })}

        <div className="flex justify-between mt-4">
          <Button
            disabled={currentPartIndex === 0}
            onClick={() => setCurrentPartIndex((prev) => prev - 1)}
          >
            Previous
          </Button>

          {currentPartIndex === data.length - 1 ? (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button type="primary" onClick={() => setCurrentPartIndex((prev) => prev + 1)}>
              Next
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default WritingTestScreen;