import React from "react";
import { music_menu } from "../resources/music";

export const FinishScreen = ({
  finishScreenData,
  translation,
  language,
  screenSizeType,
  updateMusic,
  setShowFinishScreen,
  setShowMenu,
  restartLevel
}) => {
  const generalHeading = (deaths) => (
    <div>
      <p className="finish_heading">
        <span className="finish_blur">{translation[language].finish}</span>
      </p>
      <p className="finish_time">
        {translation[language].finish_time} {finishScreenData.time / 1000}s
      </p>
      <p className="finish_deaths">
        {translation[language].finish_deaths} {deaths}
      </p>
      <p className="finish_size">
        {translation[language].finish_screen} {screenSizeType}
      </p>
    </div>
  );

  const buttons = (
    <div className="finish_button_wrapper">
      <p
        onClick={() => {
          updateMusic(music_menu);
          setShowFinishScreen(false);
          setShowMenu(true);
        }}
        className="finish_button"
      >
        {translation[language].finish_menu}
      </p>
      <p
        onClick={() => {
          setShowFinishScreen(false);
          restartLevel();
        }}
        className="finish_button"
      >
        {translation[language].finish_replay}
      </p>
    </div>
  );

  const oldMetaForLevel =
    finishScreenData.id in finishScreenData.oldMetaData
      ? finishScreenData.oldMetaData[finishScreenData.id]
      : null;

  if (oldMetaForLevel) {
    const oldBestTime = oldMetaForLevel.record;
    const newRecord =
      oldBestTime != undefined && finishScreenData.time < oldBestTime;
    return (
      <div className="finish_data_wrapper">
        {generalHeading(oldMetaForLevel ? oldMetaForLevel.deaths : 0)}
        {newRecord && (
          <div>
            <p className="finish_heading_newRecord">
              {translation[language].finish_record}
            </p>
            <p className="finish_oldRecordTime">
              {translation[language].finish_oldRecord} {oldBestTime / 1000}s
            </p>
            <p className="finish_record_improvement">
              {translation[language].finish_newRecord_faster_01}
              {(oldBestTime - finishScreenData.time) / 1000}s
              {translation[language].finish_newRecord_faster_02}
            </p>
            <p className="finish_old_screen_size">
              {translation[language].finish_oldRecord_screen}
              {oldMetaForLevel.screenSize}
            </p>
          </div>
        )}
        {!newRecord && (
          <div className="finish_oldRecordWrapper">
            <p className="finish_oldRecord_time">
              {translation[language].finish_best_time} {oldBestTime / 1000}s
            </p>
            <p className="finish_oldRecord_size">
              {translation[language].finish_best_time_screen}{" "}
              {oldMetaForLevel.screenSize}
            </p>
          </div>
        )}
        {buttons}
      </div>
    );
  }
  return (
    <div className="finish_data_wrapper">
      {generalHeading(oldMetaForLevel ? oldMetaForLevel.deaths : 0)}
      {buttons}
    </div>
  );
};
