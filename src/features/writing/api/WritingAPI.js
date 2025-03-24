import axios from "axios";
const API_BASE_URL = "https://greenprep-api.onrender.com/api";
export const fetchWritingTestDetails = async () => {
    const response = await axios.get(`${API_BASE_URL}/topics/ef6b69aa-2ec2-4c65-bf48-294fd12e13fc`, {
      params: {
        questionType: "writing",
        skillName: "WRITING",
      },
    });
    return response.data;
  };
  