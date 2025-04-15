import React, { useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const templates = [
  { name: "Double Column", image: "/src/assets/templates/double-column.png" },
  { name: "Ivy League", image: "/src/assets/templates/ivy-league.png" },
  { name: "Elegant", image: "/src/assets/templates/elegant.png" },
  { name: "Contemporary", image: "/src/assets/templates/contemporary.png" },
  { name: "Creative", image: "/src/assets/templates/creative.png" },
  { name: "Modern", image: "/src/assets/templates/modern.png" },
  { name: "Polished", image: "/src/assets/templates/polished.png" },
  { name: "Timeline", image: "/src/assets/templates/timeline.png" },
];

const Dashboard = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    summary: "",
  });

  const [generatedResume, setGeneratedResume] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenerateResume = async (e) => {
    e.preventDefault();

    if (!selectedTemplate) {
      alert("Please select a resume template.");
      return;
    }

    const dataToSend = {
      template: selectedTemplate.name,
      formData: formData,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/resume/generate",
        dataToSend,
        { withCredentials: true }
      );

      if (response.data.success) {
        let html = response.data.resumeHTML;

        // Remove ```html and ``` if Gemini returned Markdown
        if (html.startsWith("```html")) {
          html = html.replace(/^```html/, "").replace(/```$/, "").trim();
        }

        setGeneratedResume(html);
      }
    } catch (error) {
      console.error("❌ Error generating resume:", error);
      alert("Something went wrong while generating your resume.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedResume], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    alert("✨ Share functionality coming soon!");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Start building your resume With Ai</h1>
        <button className="logout-btn">Logout</button>
      </div>

      <div className="template-grid">
        {templates.map((template, index) => (
          <div
            key={index}
            className="template-card"
            onClick={() => setSelectedTemplate(template)}
          >
            <img src={template.image} alt={template.name} />
            <h3>{template.name}</h3>
            <p>A modern design to showcase your resume.</p>
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="modal-overlay">
          <div className="modal-box">
            <span className="close-btn" onClick={() => setSelectedTemplate(null)}>
              &times;
            </span>
            <h2>Fill Resume Details</h2>
            <form onSubmit={handleGenerateResume} className="form-group">
              <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} />
              <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
              <input type="text" name="address" placeholder="Address" onChange={handleChange} />
              <textarea name="education" placeholder="Education" onChange={handleChange}></textarea>
              <textarea name="experience" placeholder="Work Experience" onChange={handleChange}></textarea>
              <textarea name="skills" placeholder="Skills" onChange={handleChange}></textarea>
              <textarea name="projects" placeholder="Projects" onChange={handleChange}></textarea>
              <textarea name="summary" placeholder="Summary" onChange={handleChange}></textarea>
              <button type="submit">Generate Resume</button>
            </form>
          </div>
        </div>
      )}

      {generatedResume && (
        <div className="resume-preview-container">
          <div
            className="resume-preview"
            dangerouslySetInnerHTML={{ __html: generatedResume }}
          ></div>

          <div className="resume-actions">
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
