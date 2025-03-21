import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DropdownQuestion from "../shared/ui/questionType/Dropdown";

const mockQuestions = [
  {
    id: 1,
    type: "dropdown-list",
    question: "What is the capital of France?",
    answers: { a: "Paris", b: "London", c: "Berlin", d: "Madrid" },
    correctAnswer: "a",
  },
  {
    id: 6,
    type: "dropdown-list",
    question: `Dear Karen,
This contract has fifty pages. It is very 1.___. I ask my staff to read and check 2. ___. I will print and give my staff a 3.___. I know they are 4.___ and not have free time. However, I need to finish this meeting with my 5.___.`,
    answers: {
      1: { hot: "hot", long: "long", cold: "cold" },
      2: { detail: "detail", hour: "hour", money: "money" },
      3: { hand: "hand", listen: "listen", copy: "copy" },
      4: { busy: "busy", long: "long", hire: "hire" },
      5: { boss: "boss", client: "client", host: "host" },
    },
    correctAnswers: {
      1: "long",
      2: "detail",
      3: "copy",
      4: "busy",
      5: "client",
    },
  },
];

const fetchContents = async () => {
  try {
    const { data } = await axios.get("/api/questions");
    return Array.isArray(data) && data.length > 0 ? data : mockQuestions;
  } catch (error) {
    console.error("Error fetching contents:", error);
    return [];
  }
};

const QuestionPage = () => {
  const {
    data: contents,
    isLoading,
    error,
  } = useQuery({ queryKey: ["questions"], queryFn: fetchContents });

  const [answers, setAnswers] = useState({});

  const handleSelectAnswer = (contentId, key, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [contentId]: { ...prev[contentId], [key]: selectedAnswer },
    }));
  };

  if (isLoading)
    return <div className="text-center text-gray-600">Loading question...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 font-medium">
        An error occurred while retrieving data.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 border-4 border-red-500">
        Questions
      </h2>
      {contents.length > 0 ? (
        contents.map((question) => (
          <div
            key={question.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
            data-testid={`question-${question.id}`}
          >
            {question.type === "dropdown-list" ? (
              <DropdownQuestion
                questionData={question}
                onChange={handleSelectAnswer}
                className=""
              />
            ) : (
              <p className="text-gray-800">Unsupported question type</p>
            )}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No contents data.</div>
      )}
    </div>
  );
};

export default QuestionPage;
