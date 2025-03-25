import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const WritingIntroduction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col text-center font-sans">
      <div className="mx-auto mb-6 flex max-w-3xl flex-1 flex-col items-center justify-center text-center">
        <Title className="mb-6 text-3xl" style={{ color: "#003087" }}>
          GreenPREP
        </Title>
        <div className="mb-6 w-full text-left">
          <Title level={4} className="m-0 leading-normal">
            Aptis General Practice Test
          </Title>
          <Title level={5} className="m-0 leading-normal">
            Writing Section
          </Title>

          <div className="mb-6">
            <div className="mb-6 flex flex-col justify-between md:flex-row">
              <div className="mb-6 flex flex-1 flex-col md:mb-0">
                <Text strong className="mb-1">
                  Number of Questions
                </Text>
                <Text className="text-base">4</Text>
              </div>
              <div className="mb-6 flex flex-1 flex-col">
                <Text strong className="mb-1">
                  Time Allowed
                </Text>
                <Text className="text-base">50 mins</Text>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex w-full flex-col">
                <Text strong className="mb-1">
                  Assessment Description
                </Text>
                <Text className="text-base">
                  This assessment evaluates your ability to write in English for different purposes.
                </Text>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex w-full flex-col">
                <Text strong className="mb-1">
                  Form Description
                </Text>
                <Text className="text-base">
                  You will need to complete various writing tasks including emails, essays, and short responses.
                </Text>
              </div>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className="h-10 w-[200px] text-base"
          style={{ backgroundColor: "#003087", borderColor: "#003087" }}
          onClick={() => navigate("/writing/instructions")}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default WritingIntroduction;
