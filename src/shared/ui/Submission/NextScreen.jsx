import { Button, message } from "antd";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NextScreen = ({ nextPath, skillName, imageSrc }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleNavigation = async () => {
    try {
      navigate(nextPath);
    } catch (err) {
      setError(err.message);
      message.error("Navigation failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white">
      <AiFillLike className="text-9xl text-blue-900 mb-4" />
      <h2 className="text-2xl font-semibold text-blue-900 p-5 tracking-widest">
        Exam Submitted
      </h2>
      <p className="mt-2 text-lg text-blue-900 p-5 tracking-wide">
        Thank you for submitting '<span className="font-semibold">{skillName}</span>'
      </p>

      <Button
        type="primary"
        className="mt-6 px-6 h-14 py-2 flex items-center gap-2 bg-blue-900 text-white hover:bg-blue-800 text-sm md:text-base"
        onClick={handleNavigation}
      >
        Next <span>&rarr;</span>
      </Button>
      {error && (
        <p className="mt-4 text-red-600 text-sm">
          {error} <br />
          <Button type="link" onClick={handleNavigation}>
            Retry
          </Button>
        </p>
      )}

      {imageSrc && (
        <img
          src={imageSrc}
          alt="nextquestion"
          className="absolute bottom-0 left-6 w-24 md:w-64 lg:w-64"
        />
      )}
    </div>
  );
};

export default NextScreen;
