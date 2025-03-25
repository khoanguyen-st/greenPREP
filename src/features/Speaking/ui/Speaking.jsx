import { useState } from "react";
import Introduction from "./components/Introduction";

const SpeakingTest = () => {
  const [active, setActive] = useState(1); // Default active section

  return (
    <Introduction/>
  );
};

export default SpeakingTest;
