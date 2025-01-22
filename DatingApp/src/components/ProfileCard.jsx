import React, { useState } from "react";
import "../cssFiles/ProfileCard.css";

const ProfileCard = ({
  name,
  surname,
  major,
  favLanguage,
  github,
  leetcode,
  longBio,
  image,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`profile-card ${showDetails ? "expanded" : ""}`}>

      <div
        className="profile-image"
        style={{
          backgroundImage: `url(${image || "default-image-path.jpg"})`,
        }}
      ></div>
      <div className="profile-content">
        <h2>{name} {surname}</h2>
        <h3>Smjer: {major}</h3>
        
        {showDetails && (
          <div className="details">
            <p><strong>Najdraži programski jezik:</strong> {favLanguage}</p>
            <p>
              <strong>GitHub profil:</strong>{" "}
              {github ? (
                <a href={github} target="_blank" rel="noopener noreferrer">
                  {github}
                </a>
              ) : (
                ""
              )}
              <br></br>
              <strong>Leetcode profil:</strong>{" "}
              {leetcode ? (
                <a href={leetcode} target="_blank" rel="noopener noreferrer">
                  {leetcode}
                </a>
              ) : (
                ""
              )}
            </p>
            <p><strong>Više o meni:</strong> {longBio}</p>
          </div>
        )}

        <button onClick={toggleDetails}>
          {showDetails ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
