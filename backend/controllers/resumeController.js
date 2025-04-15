// /backend/controllers/resumeController.js
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const templateStyles = {
  "Elegant": `
Use a single-column layout.
- Name at the top in bold and larger font.
- Contact info below the name in smaller font.
- Sections: Summary, Experience, Education, Skills, Projects
- Use modern fonts like Helvetica or Roboto.
- Simple dividers between sections.
- Use purple headers and clean spacing.
  `,
  "Double Column": `
Use a two-column layout:
- Left column: Contact, Skills, Summary
- Right column: Experience, Education, Projects
- Bold name at top center.
- Light background with bordered boxes.
- Section titles with underline.
  `,
  "Timeline": `
- Use a vertical timeline for work experience.
- Place name and contact at the top center.
- Use dotted line with circular bullets for each job entry.
- Education and projects can go below.
  `,
  "Creative": `
Use a colorful design:
- Left column with name and contact.
- Right section with summary, experience, skills.
- Use icons for each section.
- Stylish fonts like Poppins or Montserrat.
- Soft shadows and light gradients.
  `,
  "Modern": `
Use a clean grid layout:
- Full width name on top.
- Two-column section layout below.
- Use subtle colors (gray, blue)
- Highlight key points with bold fonts.
  `,
  "Polished": `
Use a centered layout:
- Name in uppercase, bold, with a line below.
- Contact in a horizontal row.
- Left-aligned section titles with bold fonts.
- Elegant spacing and serif fonts.
  `,
  "Ivy League": `
Academic-style resume:
- Name and contact at top center.
- Education section comes first.
- Use Times New Roman or Georgia.
- Italicize degrees, bold job titles.
  `,
  "Contemporary": `
Modern look:
- Two-column layout with rounded corners.
- Light background colors.
- Use color accent for headers.
- Font: Lato or Open Sans.
  `,
};

export const generateResumeFromGemini = async (req, res) => {
  const { template, formData } = req.body;

  const stylePrompt = templateStyles[template] || "Use a modern resume format.";

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });

    const prompt = `
You are a professional resume builder AI. Generate a clean, visually appealing HTML resume using inline CSS.
Use the following style guide for the "${template}" template:

${stylePrompt}

Resume Data:
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Address: ${formData.address}
- Summary: ${formData.summary}
- Education: ${formData.education}
- Experience: ${formData.experience}
- Skills: ${formData.skills}
- Projects: ${formData.projects}

IMPORTANT:
- Return only valid HTML with inline CSS.
- Do NOT wrap in markdown (no \`\`\`html).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let html = response.text();

    // remove markdown if accidentally wrapped
    if (html.startsWith("```html")) {
      html = html.replace(/^```html/, "").replace(/```$/, "").trim();
    }

    res.status(200).json({ success: true, resumeHTML: html });
  } catch (error) {
    console.error("❌ Resume generation failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Gemini resume generation failed",
      error: error.message,
    });
  }
};
