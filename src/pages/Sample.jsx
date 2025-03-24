import nextImage from "@assets/Images/Submission/nextquestion.jpg";
import NextScreen from "@shared/ui/Submission/NextScreen";
import { useState } from "react";

const SampleTestPage = () => {
  const [skillName, setSkillName] = useState("Reading");

  return (
    <div className="">
      <div className="absolute">
      <select
        className="border rounded"
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      >
        <option value="Listening">Listening</option>
          <option value="Reading">Reading</option>
          <option value="Grammar & Vocabulary">Grammar & Vocabulary</option>
        <option value="Writing">Writing</option>
        <option value="Speaking">Speaking</option>
      </select>
      </div>

      <NextScreen
        skillName={skillName}
        nextPath={skillName === "Writing" ? "/success" : "/next-test"}
        imageSrc={nextImage}
      />
    </div>
  );
};

export default SampleTestPage;
