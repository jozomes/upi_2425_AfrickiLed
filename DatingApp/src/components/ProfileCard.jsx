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
  onNextPicture,
  onPreviousPicture, 
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
      
      <div className="image-navigation">
        <button onClick={onPreviousPicture}>Prethodna</button>
        <button onClick={onNextPicture}>Iduća</button>
      </div>

      <div className="profile-content">
        <h2>{name} {surname}</h2>
        <h3>Smjer: {major}</h3>

        {showDetails && (
          <div className="details">
            <table className="details-table">
              <tbody>
                <tr>
                  <td><strong>Najdraži programski jezik:</strong></td>
                  <td>{favLanguage}</td>
                </tr>
                <tr>
                  <td><strong>GitHub:</strong></td>
                  <td>{github}</td>
                </tr>
                <tr>
                  <td><strong>Leetcode profil:</strong></td>
                  <td>{leetcode}</td>
                </tr>
                <tr>
                  <td><strong>Više o meni:</strong></td>
                  <td>{longBio}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <button onClick={toggleDetails}>
          {showDetails ? "Prikaži manje" : "Prikaži više"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
