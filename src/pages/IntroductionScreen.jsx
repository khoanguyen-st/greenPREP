import React from "react";
import { Layout, Button, Typography, Card } from "antd";
import SharedHeader from "@shared/ui/SharedHeader";

const { Content } = Layout;
const { Title } = Typography;

const IntroductionScreen = () => {
  const testSections = [
    {
      number: "01",
      title: "Speaking",
      description:
        "You'll describe pictures, share experiences, and give opinions to showcase your speaking abilities.",
    },
    {
      number: "02",
      title: "Listening",
      description:
        "Tune in to various accents and contexts as you answer questions based on dialogues, monologues, and everyday conversations.",
    },
    {
      number: "03",
      title: "Grammar & Vocabulary",
      description:
        "Demonstrate your understanding of English grammar structures and word usage through a series of engaging questions.",
    },
    {
      number: "04",
      title: "Reading",
      description:
        "Analyze different texts, extract key information, and improve your reading comprehension skills with multiple-choice and short-answer questions.",
    },
    {
      number: "05",
      title: "Writing",
      description:
        "Conclude your test with a writing task that challenges you to organize your ideas clearly and effectively in written form.",
    },
  ];

  return (
    <Layout>
      <SharedHeader />
      <Content className="px-4 py-6 md:px-6">
        <div className="p-3">
          <Card className="shadow-lg w-full md:w-[95%] p-4 md:p-10 rounded-2xl mx-auto">
            <p className="text-lg text-blue-500 p-2">Test structure & Flow</p>
            <Title level={2} className="p-2 !text-[30px] font-bold">
              Welcome to English Mock Test Journey!
            </Title>
            <p className="text-lg font-bold p-2">
              The test is structured to assess different aspects of your language proficiency in the following order:
            </p>
            <ul className="p-0">
              {testSections.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 rounded-lg p-3 mb-3 w-full"
                >
                  <div  className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-1 border-blue-500 text-blue-500 font-bold border-solid text-base">
                    {item.number}
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-semibold">{item.title}</p>
                    <p className="text-sm mt-1 text-gray-600">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-6">
              <Button type="primary" size="large" className="w-72 bg-[#003087] hover:bg-[#002570]">
                Start Now
              </Button>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default IntroductionScreen;
