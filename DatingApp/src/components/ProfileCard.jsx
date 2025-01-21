import React, { useState } from "react";
import "../cssFiles/ProfileCard.css";

const ProfileCard = ({
  name,
  age,
  shortBio,
  major,
  favLanguage,
  github,
  githubProfile,
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
        <h2>{name} {age ? `, ${age}` : ""}</h2>
        <h3>Smjer: {major}</h3>
        <h3>O meni: {shortBio }</h3>
        
        {showDetails && (
          <div className="details">
            <p><strong>Najdraži programski jezik:</strong> {favLanguage}</p>
            <p>
              <strong>GitHub profil:</strong>{" "}
              {githubProfile ? (
                <a href={githubProfile} target="_blank" rel="noopener noreferrer">
                  {github}
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
