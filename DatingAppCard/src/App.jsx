import React from "react";
import ProfileCard from "./ProfileCard";

const App = () => {
  const profiles = [
    {
      name: "Ime",
      age: 25,
      shortBio: "[Opis]",
      major: "[Smjer]",
      favLanguage: "[ProgJezik]",
      github: "[Link]",
      githubProfile: "[Link]",
      longBio: "[Duzi opis]",
      image: "https://via.placeholder.com/300x250",
    },
    
  ];

  return (
    <div>
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))}
    </div>
  );
};

export default App;
