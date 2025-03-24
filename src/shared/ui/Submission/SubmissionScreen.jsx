import SubmissionImage from "@assets/Images/Submission/submission.jpg";
import { Button, message } from "antd";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FinalTestScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");



  const handleNavigation = async () => {
    try {
      navigate("/homepage");
    } catch (err) {
      setError(err.message);
      message.error("Navigation failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-row text-black pb-10">
        <AiOutlineCheckCircle className="text-7xl text-green-500 mx-auto" />
        <div className="items-center justify-center">
          <div className="font-bold text-3xl">You Finished Your Exam</div>
          <p className="mt-2 text-md text-gray-700">
            Your teacher will release your results shortly. All the best{" "}
            <span className="text-red-500">❤️</span>!
          </p>
        </div>
      </div>

      <Button
        type="primary"
        className="mt-6 px-6 h-14 py-2 flex items-center gap-3 bg-blue-900 text-white hover:bg-blue-800 text-sm md:text-base"
        onClick={handleNavigation}
      >
        Home <span>&rarr;</span>
      </Button>

      {error && (
        <p className="mt-4 text-red-600 text-sm">
          {error} <br />
          <Button type="link" onClick={handleNavigation}>
            Retry
          </Button>
        </p>
      )}

      {<img src={SubmissionImage} alt="submission" className="mt-6 w-24 md:w-64 lg:w-64" />}
    </div>
  );
};

export default FinalTestScreen;
