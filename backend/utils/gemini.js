import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResumeFromGemini = async (formData, templateStyle) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
Generate a professional resume using this info:

Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}
Education: ${formData.education}
Experience: ${formData.experience}
Skills: ${formData.skills}
Projects: ${formData.projects}
Summary: ${formData.summary}

Use the following template style: ${templateStyle}
The final output should be in plain text resume format ready to download or view.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
};
