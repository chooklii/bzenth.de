import React from "react";
import { Button } from "antd";
import { music_menu } from "../resources/music";

export const IngameButtons = ({
  showSettings,
  translation,
  handleSettingsMenu,
  updateMusic,
  setShowSettings,
  setShowMenu,
  pageHeight,
  language,
  restartLevel
}) => {
  const RestartIcon = () => {
    return (
      <div
        onClick={() => restartLevel()}
        className="restart_icon"
        style={{ marginTop: "-" + pageHeight / 2 + "px" }}
      ></div>
    );
  };

  const Settings = () => {
    return (
      <div
        className="settings"
        style={{ marginTop: "-" + (pageHeight / 2 - 30) + "px" }}
      >
        <div className="controll">
          <div className="single_setting">
            <div className="setting_key">
              {translation[language].controlls}:
            </div>
            <div className="setting_value">{translation[language].arrow}</div>
          </div>
          <div className="single_setting">
            <div className="setting_key">{translation[language].jump}:</div>
            <div className="setting_value">{translation[language].space}</div>
          </div>
          <div className="single_setting">
            <div className="setting_key">{translation[language].restart}:</div>
            <div className="setting_value">R</div>
          </div>
        </div>
        <div className="options">
          <Button
            type="default"
            onClick={() => {
              handleSettingsMenu();
            }}
          >
            {translation[language].back}
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            type="primary"
            onClick={() => {
              updateMusic(music_menu);
              setShowSettings(false);
              setShowMenu(true);
            }}
          >
            {translation[language].mainMenu}
          </Button>
        </div>
      </div>
    );
  };

  const SettingsIcon = () => {
    return (
      <div
        onClick={() => handleSettingsMenu()}
        className="settings_icon"
        style={{ marginTop: "-" + pageHeight / 2 + "px" }}
      ></div>
    );
  };

  return (
    <div className="ingame_icons">
      <SettingsIcon />
      <RestartIcon />
      {showSettings && <Settings />}
    </div>
  );
};
