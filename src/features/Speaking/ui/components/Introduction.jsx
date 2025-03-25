import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Introduction = () => {
  const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className="bg-white rounded-xl h-screen w-full box-border pt-28 px-28">
      <h1 className="text-4xl m-0 font-bold text-[#003087] mb-6">Speaking Test</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-9">Prompt</h2>
          <p className="mb-20 text-2xl">
            <span className="font-bold text-2xl">Part One</span> - In this part, I am going to ask you three short questions about yourself and your interests. You will have 30 seconds to reply to each question.
        </p>
        <p className="text-2xl">Click next to begin speaking test.</p>
        </div>

        <div className="flex justify-center mt-20">
          <Button
            type="primary"
            onClick={() => navigate(`${location.pathname}/part1`)}
            className="bg-[#003087] text-[20px] hover:bg-blue-700 h-[60px] w-[150px]"
          >
          Next
          <ArrowRightOutlined />
          </Button>
        </div>
      </div>
  )
}

export default Introduction