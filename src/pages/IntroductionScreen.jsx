import { Layout, Button, theme } from "antd";
import SharedHeader from "@shared/ui/SharedHeader";

const { Content } = Layout;

const IntroductionScreen = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <Layout>
        <SharedHeader/>
        <Content className="px-4 py-6 md:px-6">
            <div className="p-3">
                <div
                    className="shadow-lg bg-white w-full md:w-[95%] p-4 md:p-10 rounded-2xl mx-auto"
                    style={{ background: colorBgContainer }}
                >
                    <div>
                        <p className="text-lg text-blue-500 p-2">Test structure & Flow</p>
                        <p className="p-2 text-2xl md:text-[30px] font-bold">Welcome to English Mock Test Journey!</p>
                        <p className="text-lg font-bold p-2">
                            The test is structured to assess different aspects of your language proficiency in the following order:
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
                                    className="flex items-start gap-4 rounded-lg p-3 mb-3 w-full"
                                >
                                    <div
                                        className="flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-1 border-blue-500 text-blue-500 font-bold border-solid text-base"
                                    >
                                        {item.number}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-xl">{item.title}</p>
                                        <p className="text-sm mt-1 text-gray-600 md:whitespace-nowrap md:overflow-hidden md:text-ellipsis">{item.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="justify-center flex mt-6">
                            <Button type="primary" size="large" className="w-72 bg-[#003087] hover:bg-[#003087]">
                                Start Now
                            </Button>
                        </div>
                    </div>
                   
                </div>                
            </div>
        </Content>
    </Layout>
  )
}

export default IntroductionScreen
