import { Form, Input, Typography, Image } from "antd";
import { useState, useEffect } from "react";
import NavigationButtons from "@shared/ui/NavigationButtons/NavigationButtons";


const { Title, Text } = Typography;
const DEFAULT_MAX_WORDS = {
  2: 45,
  3: 60,
  4: 225,
};

const testData = {
    "ID": "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
    "Name": "Practice Test 2",
    "createdAt": "2025-03-21T09:01:23.808Z",
    "updatedAt": "2025-03-21T09:01:23.808Z",
    "Parts": [
      {
        "ID": "02316490-29c6-4f4a-adb8-de6b1caa4a6a",
        "Content": "Part 2: You are a new member of the beautiful homes club. Fill in the form. Write sentences. Use 20 – 30 words. Recommended time: 7 minutes. (1.5 points)",
        "SubContent": "* (You’re allowed to write up to 45 words without affecting your grade).",
        "TopicID": "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
        "createdAt": "2025-03-21T09:01:37.639Z",
        "updatedAt": "2025-03-21T09:01:37.639Z",
        "Questions": [
          {
            "ID": "f1dabc42-5d85-4da5-b921-055f040340ae",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "02316490-29c6-4f4a-adb8-de6b1caa4a6a",
            "Content": "Please write about your ideal house.",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:38.822Z",
            "updatedAt": "2025-03-21T09:01:38.822Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          }
        ]
      },
      {
        "ID": "034084a0-de11-493b-8f28-2703c344ecf3",
        "Content": "Part 3: You are a member of the beautiful homes club. You are talking to some members in the club’s chat room. Talk to them using sentences. Use 30 – 40 words per answer. Recommended time: 10 minutes. (2.5 points)",
        "SubContent": "* (You’re allowed to write up to 60 words without affecting your grade).",
        "TopicID": "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
        "createdAt": "2025-03-21T09:01:37.772Z",
        "updatedAt": "2025-03-21T09:01:37.772Z",
        "Questions": [
          {
            "ID": "dec19eac-d3a9-42ed-b9cc-b3d4b7201c46",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "034084a0-de11-493b-8f28-2703c344ecf3",
            "Content": "Jack: Hello! Have you ever had any problems with your neighbors?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:39.140Z",
            "updatedAt": "2025-03-21T09:01:39.140Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "fec3f2ba-2764-4c0f-babb-046ac221409f",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "034084a0-de11-493b-8f28-2703c344ecf3",
            "Content": "Hannah: Hi! Welcome to the club. I really enjoy watching TV programs about houses. How about you? Are you interested in these programs?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:39.011Z",
            "updatedAt": "2025-03-21T09:01:39.011Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "eb122127-3702-448c-81cb-62da73aab5b9",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "034084a0-de11-493b-8f28-2703c344ecf3",
            "Content": "Nira: Welcome! Houses should be built in a way that is environmentally friendly. Do you agree?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:39.271Z",
            "updatedAt": "2025-03-21T09:01:39.271Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          }
        ]
      },
      {
        "ID": "f83b0e3d-6df9-4624-9bc0-c4842e09c67e",
        "Content": "Part 1: You want to join the beautiful homes club. You have 5 messages from a member of the club. Write short answers (1 – 5 words) to each message. Recommended time: 3 minutes. (1 point)",
        "SubContent": "* (You’re allowed to write up to 10 words without affecting your grade).",
        "TopicID": "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
        "createdAt": "2025-03-21T09:01:37.505Z",
        "updatedAt": "2025-03-21T09:01:37.505Z",
        "Questions": [
          {
            "ID": "6fb5ca29-2422-4a28-83d9-116145de7b42",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "f83b0e3d-6df9-4624-9bc0-c4842e09c67e",
            "Content": "What time of day do you like most?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:38.101Z",
            "updatedAt": "2025-03-21T09:01:38.101Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "bf9c47d3-82b9-4d4c-a4ae-e7dc68bb2732",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "f83b0e3d-6df9-4624-9bc0-c4842e09c67e",
            "Content": "Where do you often meet your friends?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:38.233Z",
            "updatedAt": "2025-03-21T09:01:38.233Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "51e1b7fa-7632-40d3-91b6-8336a37d7c07",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "f83b0e3d-6df9-4624-9bc0-c4842e09c67e",
            "Content": "What did you do last night at home?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:38.422Z",
            "updatedAt": "2025-03-21T09:01:38.422Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "5f6be018-5a62-43ff-b6f1-f6b64d9c5efa",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "f83b0e3d-6df9-4624-9bc0-c4842e09c67e",
            "Content": "What kind of accommodation do you live in now?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:38.556Z",
            "updatedAt": "2025-03-21T09:01:38.556Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "bedbc402-df2f-4a79-b4ba-d0f1d046b000",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "f83b0e3d-6df9-4624-9bc0-c4842e09c67e",
            "Content": "Which part of the house would you like to change?",
            "SubContent": "",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:38.690Z",
            "updatedAt": "2025-03-21T09:01:38.690Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          }
        ]
      },
      {
        "ID": "e5dfe955-13e2-4589-9c7d-80219a5f00cc",
        "Content": "Part 4: You are a member of the beautiful homes club. You received this email from the club president. (5 points) ",
        "SubContent": "Dear members,\nIt has been reported that maintaining old buildings is expensive, and they take up a lot of space. These buildings may no longer be safe. The government is suggesting that these old buildings should be demolished and replaced with modern apartment buildings. This would help create more housing and improve the overall look of the city. We would like to hear your suggestions on this.",
        "TopicID": "ef6b69aa-2ec2-4c65-bf48-294fd12e13fc",
        "createdAt": "2025-03-21T09:01:37.966Z",
        "updatedAt": "2025-03-21T09:01:37.966Z",
        "Questions": [
          {
            "ID": "a93e3ab4-2119-4a6c-9e2f-3c3d471b91df",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "e5dfe955-13e2-4589-9c7d-80219a5f00cc",
            "Content": "1. Write an email to your friend. Share your thoughts on this piece of news and your suggestions. Write about 50 words. Recommended time: 10 minutes. (2 points)",
            "SubContent": "* (You’re allowed to write up to 75 words without affecting your grade).",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:39.470Z",
            "updatedAt": "2025-03-21T09:01:39.470Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          },
          {
            "ID": "67ef5ca8-590d-450e-84e4-01bebb13354e",
            "Type": "writing",
            "AudioKeys": null,
            "ImageKeys": null,
            "SkillID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
            "PartID": "e5dfe955-13e2-4589-9c7d-80219a5f00cc",
            "Content": "2. Write an email to the club president. Express your feelings about this piece of news and your suggestions. Write about 120-150 words. Recommended time: 20 minutes. (3 points)",
            "SubContent": "* (You’re allowed to write up to 225 words without affecting your grade).",
            "GroupContent": null,
            "AnswerContent": null,
            "createdAt": "2025-03-21T09:01:39.603Z",
            "updatedAt": "2025-03-21T09:01:39.603Z",
            "Skill": {
              "ID": "d04750aa-036f-43b5-9bda-ace000bcdd6f",
              "Name": "WRITING",
              "createdAt": "2025-03-21T09:01:23.416Z",
              "updatedAt": "2025-03-21T09:01:23.416Z"
            }
          }
        ]
      }
    ]
  }

const WritingTest = () => {

  const [data, setData] = useState(testData);
  const [form] = Form.useForm();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [wordCounts, setWordCounts] = useState({});
  const [answers, setAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem("writingAnswers")) || {};
  });

  useEffect(() => {
    const sortedParts = data.Parts.sort((a, b) => {
      const partNumberA = parseInt(a.Content.match(/Part (\d+)/)?.[1]) || 0;
      const partNumberB = parseInt(b.Content.match(/Part (\d+)/)?.[1]) || 0;
      return partNumberA - partNumberB;
      });
    setData({ ...data, Parts: sortedParts });
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


  if (!data || !data.Parts || data.Parts.length === 0) {
    return <div className="text-center text-gray-500">No test data available</div>;
  }

  const currentPart = data.Parts[currentPartIndex];
  const partNumber = parseInt(currentPart.Content.match(/Part (\d+)/)?.[1]) || 0;

  return (
    <div className="max-w-3xl mx-auto relative min-h-screen pb-24">
      <Title level={1} className="xs:mx-2 md:mx-0 mt-12 text-left text-3xl md:text-5xl font-bold">
        Writing Test
      </Title>
      <Text className="xs:mx-2 md:mx-0 mb-5 text-l md:text-2xl font-semibold">
        Question {currentPartIndex + 1} of {data.Parts.length}
      </Text>
      <Text className="xs:mx-2 md:mx-0 block text-lg md:text-xl mb-3">{currentPart.Content}</Text>
      <Form form={form} layout="vertical">
        {currentPart.Questions.map((question, index) => {
          const fieldName = `answer-${currentPart.ID}-${index}`;
          const maxWords = partNumber === 1 ? null : question.maxWords || DEFAULT_MAX_WORDS[partNumber];
          return (
            <Form.Item
              key={fieldName}
              label={<Text className="xs:mx-2 md:mx-0">{question.Content}</Text>}
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
             
              <>
                <Input.TextArea
                  rows={5}
                  autoSize={{ minRows: 5, maxRows: 10 }}
                  className="xs:mx-2 md:mx-0 w-full"
                  placeholder="Enter your answer here"
                  value={answers[fieldName] || ""}
                  onChange={(e) => handleTextChange(fieldName, e.target.value)}
                />

                {maxWords && (
                  <Text
                    className={`block text-sm mt-1 ${wordCounts[fieldName] > maxWords ? "text-red-500" : "text-gray-500"}`}
                  >
                    {`Word count: ${wordCounts[fieldName] || 0} / ${maxWords}`}
                  </Text>
                )}
              </>
            </Form.Item>
          );
        })}
      </Form>

    
      <div className="fixed bottom-8 left-4 z-50 w-fit hidden mdL:block ">
        <Image
          src="src/assets/Images/navigate-logo.png"
          alt="Logo"
          preview={false}
          className="h-[100px] w-auto"
        />
      </div>
      <div className="bottom-0 shadow-md">
        <NavigationButtons
          totalQuestions={data.Parts.length}
          currentQuestion={currentPartIndex}
          setCurrentQuestion={setCurrentPartIndex}
          fetchQuestion={() => Promise.resolve()}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default WritingTest;