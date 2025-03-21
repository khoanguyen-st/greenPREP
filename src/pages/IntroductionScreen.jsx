import React from 'react';
import { Layout, Button, Typography, theme } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

const IntroductionScreen = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
return (
    <Layout>
        <Header className="text-[#003087] p-2">
            <Title level={2} className="!text-white !m-0">
                GreenPREP
            </Title>
        </Header>
        <Content style={{ padding: 20 }}>
            <div className="p-6">
                <div
                    className="shadow-lg bg-white w-[90%] min-h-[80px] p-20 rounded-2xl mx-auto"
                    style={{ background: colorBgContainer }}
                >
                    <div>
                        <h4 className=" text-blue-500 p-2">Test structure & Flow</h4>
                        <h2 className="p-2">Welcome to English Mock Test Journey!</h2>
                        <p className="p-2">
                            <strong>
                                The test is structured to assess different aspects of your language proficiency in the following order:
                            </strong>
                        </p>
                        <ol className="list-none p-0">
                            {[
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
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center rounded-lg p-3 mb-3 w-full"
                                >
                                    <div
                                        className="flex items-center justify-center w-12 h-12 rounded-full border-1 border-blue-500 text-blue-500 font-bold border-solid text-base"
                                    >
                                        {item.number}
                                    </div>
                                    <div className="ml-4">
                                        <strong className="text-xl">{item.title}</strong>
                                        <p className="mt-1 text-gray-600">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <div className="justify-center flex">
                        <Button  type="primary">
                            Start Now
                        </Button>
                    </div>
                </div>                
            </div>
        </Content>
    </Layout>
)
}

export default IntroductionScreen
 