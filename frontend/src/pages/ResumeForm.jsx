// pages/ResumeForm.jsx
import React from 'react';

const ResumeForm = ({ selectedTemplate }) => {
  return (
    <div className="resume-form-container">
      <h2>Fill Your Resume Details for: {selectedTemplate}</h2>

      <form>
        {/* Basic Fields */}
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Phone Number" required />
        <textarea placeholder="Summary"></textarea>

        {/* Add Education / Experience / Skills etc. */}
        <textarea placeholder="Education"></textarea>
        <textarea placeholder="Experience"></textarea>
        <textarea placeholder="Skills"></textarea>

        <button type="submit">Generate Resume</button>
      </form>
    </div>
  );
};

export default ResumeForm;
