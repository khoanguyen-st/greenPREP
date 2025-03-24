// import { useQuery } from "@tanstack/react-query";
// import { Form, Input, Button, Typography, Spin } from "antd";
// import { useState, useEffect } from "react";
// import TimeRemaining from "@shared/ui/TimeRemaining/TimeRemaining";
// import QuestionNavigator from "@shared/ui/QuestionNavigatior/QuestionNavigatior";
// import { fetchWritingTestDetails } from "../api/WritingAPI"

// const { Title, Text } = Typography;

// const WritingTestScreen = () => {
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["writingQuestions"],
//     queryFn: () => fetchWritingTestDetails(),
//   });

//   const [form] = Form.useForm();
//   const [currentPartIndex, setCurrentPartIndex] = useState(0);
//   const [wordCounts, setWordCounts] = useState({});
//   const [answers, setAnswers] = useState(() => {
//     return JSON.parse(localStorage.getItem("writingAnswers")) || {};
//   });

//   useEffect(() => {
//     const storedAnswers = JSON.parse(localStorage.getItem("writingAnswers")) || {};
//     setAnswers(storedAnswers);
//     form.setFieldsValue(storedAnswers);
//     updateWordCounts(storedAnswers);
//   }, [currentPartIndex]);

//   const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

//   const updateWordCounts = (updatedAnswers) => {
//     const newWordCounts = {};
//     if (data) {
//       data.forEach((part) => {
//         part.SubContent.forEach((subQ, index) => {
//           const fieldName = `answer-${part.ID}-${index}`;
//           newWordCounts[fieldName] = countWords(updatedAnswers[fieldName] || "");
//         });
//       });
//     }
//     setWordCounts(newWordCounts);
//   };

//   const handleTextChange = (field, text) => {
//     const newAnswers = { ...answers, [field]: text };
//     setAnswers(newAnswers);
//     localStorage.setItem("writingAnswers", JSON.stringify(newAnswers));

//     setWordCounts((prev) => ({
//       ...prev,
//       [field]: countWords(text),
//     }));
//   };

//   const handleSubmit = () => {
//     console.table(answers);
//   };

//   if (isLoading) return <Spin className="flex justify-center items-center h-screen" />;
//   if (isError) return <div className="text-red-500 text-center">Error fetching data</div>;

//   const currentPart = data[currentPartIndex];

//   return (
//     <div className="max-w-3xl mx-auto p-5">
//       <div className="md:w-1/4">
//         <QuestionNavigator
//           values={data.map((_, i) => ({
//             type: answers[`answer-${i}`] ? "answered" : "unanswered",
//           }))}
//           action={setCurrentPartIndex}
//           position={currentPartIndex}
//         />
//       </div>
//       <TimeRemaining duration={50 * 60} onAutoSubmit={handleSubmit} />

//       <Title level={2} className="text-center">
//         Writing Test - {currentPart.PartID}
//       </Title>

//       <Text className="block text-lg mb-3">{currentPart.Content}</Text>

//       <Form form={form} layout="vertical">
//         {currentPart.SubContent.map((subQ, index) => {
//           const fieldName = `answer-${currentPart.ID}-${index}`;
//           const hasWordLimit = typeof subQ.maxWords === "number";

//           return (
//             <Form.Item
//               key={fieldName}
//               label={<Text>{subQ.question}</Text>}
//               name={fieldName}
//               initialValue={answers[fieldName] || ""}
//               rules={[
//                 { required: true, message: "You need to answer" },
//                 ...(hasWordLimit
//                   ? [
//                     {
//                       validator: (_, value) =>
//                         countWords(value || "") > subQ.maxWords
//                           ? Promise.reject(`Maximum ${subQ.maxWords} word!`)
//                           : Promise.resolve(),
//                     },
//                   ]
//                   : []),
//               ]}
//             >
//               <>
//                 <Input.TextArea
//                   rows={4}
//                   autoSize={{ minRows: 2, maxRows: 10 }}
//                   placeholder="Enter your answer here"
//                   value={answers[fieldName] || ""}
//                   onChange={(e) => handleTextChange(fieldName, e.target.value)}
//                 />
//                 {hasWordLimit && (
//                   <Text
//                     className={`block text-sm mt-1 ${wordCounts[fieldName] > subQ.maxWords ? "text-red-500" : "text-gray-500"
//                       }`}
//                   >
//                     {`Word count: ${wordCounts[fieldName] || 0} / ${subQ.maxWords}`}
//                   </Text>
//                 )}
//               </>
//             </Form.Item>
//           );
//         })}

//         <div className="flex justify-between mt-4">
//           <Button
//             disabled={currentPartIndex === 0}
//             onClick={() => setCurrentPartIndex((prev) => prev - 1)}
//           >
//             Previous
//           </Button>

//           {currentPartIndex === data.length - 1 ? (
//             <Button type="primary" onClick={handleSubmit}>
//               Submit
//             </Button>
//           ) : (
//             <Button type="primary" onClick={() => setCurrentPartIndex((prev) => prev + 1)}>
//               Next
//             </Button>
//           )}
//         </div>
//       </Form>
//     </div>
//   );
// };

// export default WritingTestScreen;

import { useQuery } from "@tanstack/react-query";
import { Form, Input, Button, Typography, Spin } from "antd";
import { useState, useEffect } from "react";
import TimeRemaining from "@shared/ui/TimeRemaining/TimeRemaining";
import QuestionNavigator from "@shared/ui/QuestionNavigatior/QuestionNavigatior";
import { fetchWritingTestDetails } from "../api/WritingAPI";

const { Title, Text } = Typography;

const WritingTestScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["writingQuestions"],
    queryFn: fetchWritingTestDetails,
  });

  const [form] = Form.useForm();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [wordCounts, setWordCounts] = useState({});
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("writingAnswers")) || {};
  });

  useEffect(() => {
    if (data) {
      const storedAnswers = JSON.parse(localStorage.getItem("writingAnswers")) || {};
      setAnswers(storedAnswers);
      form.setFieldsValue(storedAnswers);
      updateWordCounts(storedAnswers);
    }
  }, [data, currentPartIndex]);

  const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

  const updateWordCounts = (updatedAnswers) => {
    const newWordCounts = {};
    if (data?.Parts) {
      data.Parts.forEach((part) => {
        part.Questions.forEach((question, index) => {
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

  if (!data || !data.Parts || data.Parts.length === 0) {
    return <div className="text-center text-gray-500">No test data available</div>;
  }

  const currentPart = data.Parts[currentPartIndex];

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="md:w-1/4">
      <QuestionNavigator
  values={data.Parts.map((part) => ({
    type: Object.keys(answers).some(
      (key) => key.startsWith(`answer-${part.ID}`) && answers[key]?.trim() !== ""
    )
      ? "answered"
      : "unanswered",
  }))}
  action={setCurrentPartIndex}
  position={currentPartIndex}
/>

      </div>
      <TimeRemaining duration={1 * 60} onAutoSubmit={handleSubmit} />

      <Title level={2} className="text-center">
        Writing Test - {currentPart.ID}
      </Title>

      <Text className="block text-lg mb-3">{currentPart.Content}</Text>

      <Form form={form} layout="vertical">
        {currentPart.Questions.map((question, index) => {
          const fieldName = `answer-${currentPart.ID}-${index}`;
          const hasWordLimit = typeof question.maxWords === "number";

          return (
            <Form.Item
              key={fieldName}
              label={<Text>{question.Content}</Text>}
              name={fieldName}
              initialValue={answers[fieldName] || ""}
              rules={[
                { required: true, message: "You need to answer" },
                ...(hasWordLimit
                  ? [
                    {
                      validator: (_, value) =>
                        countWords(value || "") > question.maxWords
                          ? Promise.reject(`Maximum ${question.maxWords} words!`)
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
                    className={`block text-sm mt-1 ${wordCounts[fieldName] > question.maxWords ? "text-red-500" : "text-gray-500"
                      }`}
                  >
                    {`Word count: ${wordCounts[fieldName] || 0} / ${question.maxWords}`}
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

          {currentPartIndex === data.Parts.length - 1 ? (
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
