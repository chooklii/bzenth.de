import React from "react"

import {
    translation,
    rockheadTexts,
    sawTexts,
    spikeTexts,
  } from "../resources/config";

export const DeathScreen = ({
    language,
    restartLevel,
    setShowDeadscreen,
    killedBy
}) => {
    var killText = translation[language].wasKilled;
    if (killedBy === "saw") {
      const index = Math.floor(Math.random() * sawTexts[language].length);
      killText = sawTexts[language][index];
    } else if (killedBy === "spike") {
      const index = Math.floor(Math.random() * spikeTexts[language].length);
      killText = spikeTexts[language][index];
    } else if (killedBy === "rockhead") {
      const index = Math.floor(Math.random() * rockheadTexts[language].length);
      killText = rockheadTexts[language][index];
    }
    return (
      <div>
        <p className="gameover">Game over!</p>
        <p className="killedbytext">{killText}</p>
        <p
          onClick={() => {
            restartLevel();
            setShowDeadscreen(false);
          }}
          className="restart_text"
        >
          {translation[language].restartText}
        </p>
      </div>
    );
}