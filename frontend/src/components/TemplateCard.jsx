// components/TemplateCard.jsx
import React from 'react';

const TemplateCard = ({ name, onClick }) => {
  const fileName = name.toLowerCase().replace(/ /g, '-') + '.png';
  const imagePath = `/src/assets/templates/${fileName}`;

  return (
    <div className="template-card" onClick={onClick}>
      <img src={imagePath} alt={name} className="template-image" />
      <h3>{name}</h3>
      <p>A modern design to showcase your resume.</p>
    </div>
  );
};

export default TemplateCard;
