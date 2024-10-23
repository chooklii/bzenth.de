import React, { useContext, useState, useEffect } from "react";
import Phaser from "phaser";
import Game from "./Game";
import { levels, starting } from "./level";
import { Button, Tooltip, Row, Col, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faVolumeMute,
  faTimes,
  faLanguage,
  faSkull,
  faExpand,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { AboutMe, Skills, Contact, Projects, Credits } from "../Pages";
import {
  music_menu,
  sea_theme,
  night_theme,
  dungeon_theme,
  cave_theme,
  field_theme,
} from "./music";
import {
  translation,
  minHeight,
  minWidth,
  itemsToUnlock,
  rockheadTexts,
  sawTexts,
  spikeTexts,
} from "./config";
import { TranslationContext, keyGenerator } from "../helper";
import { sign, verify } from "jsonwebtoken";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-target",
  width: 0,
  height: 0,
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};
var game;
var currentSong;

const locales = ["de", "en"];

const GameHome = () => {
  const [screenHeight, setScreenHight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [finishedLevel, setFinishedLevel] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [deathscreen, setShowDeadscreen] = useState(false);
  const [finishScreen, setShowFinishScreen] = useState(false);
  const [finishScreenData, setFinishScreenData] = useState({});
  const [killedBy, setKilledBy] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [displayPage, setDisplayPage] = useState(false);
  const [type, setType] = useState(null);
  const [music_playing, setMusicPlaying] = useState(false);
  const [music_playlist, setMusicPlaylist] = useState(music_menu);
  const [music_index, setMusicIndex] = useState(0);
  const { language, setLanguage, getText } = useContext(TranslationContext);

  useEffect(() => {
    initDefaultGame();
    initMusic();
    readLocalStorage(), readLanguageFromQuery();
  }, []);

  const readLanguageFromQuery = () => {
    const searchParams = new URLSearchParams(document.location.search);
    const langQueryParm = searchParams.get("lang");
    if (langQueryParm) {
      window.history.pushState({}, document.title, window.location.pathname);
      setLanguage(langQueryParm);
    }
  };

  const readLocalStorage = () => {
    const dataFromLocalStorage = localStorage.getItem("gamedata");
    if (!dataFromLocalStorage) return;
    try {
      const decoded = verify(dataFromLocalStorage, "hackerman");
      if (decoded) {
        setFinishedLevel(decoded.finishedLevel);
        setMetaData(decoded.metaData);
      }
    } catch (e) {
      console.log("Found invalid JWT - ignore");
    }
  };

  const addDeathToCount = (id) => {
    let newData;
    if (!(id in metaData)) {
      newData = Object.assign(metaData, { [id]: { deaths: 1 } });
    } else {
      const oldData = metaData[id];
      newData = Object.assign(metaData, {
        [id]: {
          deaths: (oldData.deaths += 1),
          record: oldData.record,
          screenSize: oldData.screenSize,
        },
      });
    }
    setMetaData(newData);

    const tokenData = {
      finishedLevel: finishedLevel,
      metaData: newData,
    };
    writeJsonToStorage(tokenData);
  };

  // i know that this is not the way to use jwt, but its the easiest way to prevent my friends from simple cheating - now they at least need to show some efford.
  const writeJsonToStorage = (object) => {
    const token = sign(object, "hackerman");
    localStorage.setItem("gamedata", token);
  };

  const writeLocalStorage = (id, runTime) => {
    let newData;
    if (id in metaData) {
      const oldLevelData = metaData[id];
      const newLevelData = {
        deaths: oldLevelData.deaths,
        record: oldLevelData.record > runTime ? runTime : oldLevelData.record,
        screenSize:
          oldLevelData.record > runTime
            ? getScreenSize().type
            : oldLevelData.screenSize,
      };
      newData = Object.assign(metaData, { [id]: newLevelData });
      setMetaData(newData);
    } else {
      const levelData = {
        deaths: 0,
        record: runTime,
        screenSize: getScreenSize().type,
      };
      newData = Object.assign(metaData, { [id]: levelData });
      setMetaData(newData);
    }

    const tokenData = {
      finishedLevel: finishedLevel,
      metaData: newData,
    };
    writeJsonToStorage(tokenData);
  };

  const resetLevel = () => {
    localStorage.removeItem("gamedata");
    setMetaData({});
    setFinishedLevel([]);
  };

  const initMusic = () => {
    const starting_index = Math.floor(Math.random() * music_menu.length);
    setMusicIndex(starting_index);
    currentSong = new Audio(music_menu[starting_index]);
    currentSong.addEventListener("ended", () => {
      playNextSong();
    });
  };

  const playNextSong = () => {
    if (music_index < music_playlist.length - 1) {
      setMusicIndex(music_index + 1);
      currentSong = new Audio(music_playlist[music_index + 1]);
      currentSong.addEventListener("ended", () => {
        playNextSong();
      });
      currentSong.play();
    } else {
      setMusicIndex(0);
      currentSong = new Audio(music_playlist[0]);
      currentSong.addEventListener("ended", () => {
        playNextSong();
      });
      currentSong.play();
    }
  };

  const updateMusic = (theme) => {
    if (music_playing) {
      currentSong.pause();
      const starting_index = Math.floor(Math.random() * theme.length);
      setMusicIndex(starting_index);
      currentSong = new Audio(theme[starting_index]);
      currentSong.addEventListener("ended", () => {
        playNextSong();
      });
      currentSong.play();
    }
  };

  const initDefaultGame = () => {
    const { width, height, type } = getScreenSize();
    config.height = height;
    config.width = width;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    setScreenWidth(screenWidth);
    setScreenHight(screenHeight);
    if (screenWidth >= minWidth && screenHeight >= minHeight) {
      game = new Phaser.Game(config);
      game.levels = starting;
      game.restart = () => void 0;
      game.type = type;
      game.playMusic = false;
      setType(type);
    }
  };

  const getScreenSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 1450 || height <= 750) {
      return {
        width: 1200,
        height: 600,
        type: "s",
      };
    } else if (width <= 1650 || height <= 850) {
      return {
        width: 1400,
        height: 700,
        type: "m",
      };
    } else if (width <= 1850 || height <= 950) {
      return {
        width: 1600,
        height: 800,
        type: "l",
      };
    } else {
      return {
        width: 1800,
        height: 900,
        type: "xl",
      };
    }
  };

  const finished = (runTime, id) => {
    if (!finishedLevel.includes(id)) {
      finishedLevel.push(id);
    }
    setFinishScreenData({
      id: id,
      time: runTime,
      oldMetaData: JSON.parse(JSON.stringify(metaData)),
    });
    writeLocalStorage(id, runTime);
    game.scene.pause("default");
    setShowFinishScreen(true);
  };

  const death = (way, levelId) => {
    setShowDeadscreen(true);
    addDeathToCount(levelId);
    setKilledBy(way);
    window.addEventListener("keydown", (event) => {
      if ((event.key === "r" || event.key === "R") && deathscreen) {
        restartLevel();
      }
    });
  };

  const selectedNewLevel = (id, music_theme) => {
    // kill current game
    game.destroy(true);
    updateMusic(music_theme);
    setSelectedLevel(id);
    setShowMenu(false);
    setMusicPlaylist(music_theme);
    // create new game with correct level id
    initGame(id);
  };

  const initGame = (id) => {
    game = new Phaser.Game(config);
    game.levels = levels[id];
    game.type = type;
    game.playMusic = music_playing;
    game.finished = (runTime) => finished(runTime, id);
    game.death = (way) => death(way, id);
    game.restart = () => restartLevel();
  };

  const restartLevel = () => {
    game.destroy(true);
    setShowDeadscreen(false);
    setShowFinishScreen(false);
    initGame(selectedLevel);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const renderLanguageOptions = () => {
    return locales.map((localeOption) => {
      return (
        <Select.Option value={localeOption} key={keyGenerator()}>
          <div>
            <FontAwesomeIcon icon={faLanguage} />
            <span className="localeText">
              {getText("locales." + localeOption)}
            </span>
          </div>
        </Select.Option>
      );
    });
  };

  const languageSelect = () => {
    if (!locales) {
      return <div></div>;
    }
    return (
      <div className="header-element">
        <Select defaultValue={language} onChange={handleLanguageChange}>
          {renderLanguageOptions()}
        </Select>
      </div>
    );
  };

  const levelSelection = () => {
    return (
      <div className="level_selector">
        <div className="game_back">
          {languageSelect()}
          <Button className="margin_left" onClick={() => resetLevel()}>
            {translation[language].reset}
          </Button>
          <Button
            className="margin_left"
            onClick={() => (window.location.href = `/?lang=${language}`)}
          >
            {translation[language].backMenu}
          </Button>
          {renderMusicIconMenu()}
        </div>
        <div className="explaination">
          <h1 className="explaination_heading">{translation[language].name}</h1>
          <div className="explaination_text">
            {translation[language].explaination}
          </div>
          <div>
            <p className="explaination_record">
              {translation[language].record}
            </p>
            <p className="explaination_record">
              {translation[language].screenSize}
            </p>
          </div>
          <div className="explaination_setting">
            <div className="single_setting">
              <p className="key_setting">{translation[language].controlls}: </p>
              <p className="value_setting">{translation[language].arrow}</p>
            </div>
            <div className="single_setting">
              <p className="key_setting">{translation[language].jump}: </p>
              <p className="value_setting">{translation[language].space}</p>
            </div>
            <div className="single_setting">
              <p className="key_setting">{translation[language].restart}: </p>
              <p className="value_setting">R</p>
            </div>
          </div>
        </div>
        <Row className="level_row">
          {singleLevel(1, "Getting Started", field_theme)}
          {singleLevel(2, "Schlangen S", sea_theme)}
          {singleLevel(3, "Kettensägenkantine", cave_theme)}
          {singleLevel(4, "Spicy Spike", sea_theme)}
          {singleLevel(5, "Obacht Oben", field_theme)}
          {singleLevel(6, "Aufregender Aufzug", dungeon_theme)}
          {singleLevel(7, "Where is the Way?", night_theme)}
          {singleLevel(8, "Furioses Finale", night_theme)}
        </Row>
      </div>
    );
  };

  const singleLevel = (levelID, levelName, music_theme) => {
    const disabled =
      levelID == 1 || finishedLevel.includes(levelID - 1) ? false : true;
    return (
      <Col xl={6} xxl={6} lg={8} md={12} sm={12} xs={12}>
        <div className="single_level">
          <div className="single_level_row">
            <div className={"level l" + levelID}></div>
            <div className="single_level_name">{levelName}</div>
          </div>

          {highscore(levelID)}
          <div className="button_wrapper">
            {unlock_button(levelID)}

            <div className="button_start_level">
              <Tooltip
                title={
                  disabled
                    ? translation[language].startNotUnlocked
                    : translation[language].startUnlocked
                }
              >
                <Button
                  type="primary"
                  style={{ minWidth: "100%" }}
                  onClick={() => selectedNewLevel(levelID, music_theme)}
                  disabled={disabled}
                >
                  <div className="button_start_text">
                    <div className="level_play"></div>
                    {translation[language].start}
                  </div>
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Col>
    );
  };

  const highscore = (levelID) => {
    if (levelID in metaData) {
      const levelData = metaData[levelID];

      return (
        <div className="highscore">
          <Tooltip title={translation[language].toolTipRecord}>
            <span className="icon_game">
              <FontAwesomeIcon icon={faClock} className="icon" />
              {levelData.record ? levelData.record / 1000 + "s" : "-"}
            </span>
            <span className="icon_game">
              <FontAwesomeIcon icon={faExpand} className="icon" />
              {levelData.screenSize}
            </span>
            <span className="icon_game">
              <FontAwesomeIcon icon={faSkull} className="icon" />
              {levelData.deaths}
            </span>
          </Tooltip>
        </div>
      );
    }
    return <div className="highscore" />;
  };

  const unlock_button = (levelID) => {
    const disabled = finishedLevel.includes(levelID) ? false : true;
    const unlock = Object.keys(itemsToUnlock["de"]).includes(levelID.toString())
      ? true
      : false;
    if (unlock) {
      return (
        <div className="button_start_level">
          <Tooltip
            title={
              disabled
                ? translation[language].pageNotUnlocked
                : translation[language].pageUnlocked
            }
          >
            <Button
              onClick={() => {
                setCurrentPage(levelID);
                setDisplayPage(true);
                setShowMenu(false);
              }}
              style={{ minWidth: "100%" }}
              type="dashed"
              disabled={disabled}
            >
              <div className="button_start_text">
                <div className="unlock_icon"></div>
                {itemsToUnlock[language][levelID]}
              </div>
            </Button>
          </Tooltip>
        </div>
      );
    } else {
      return <div className="no_unlock"></div>;
    }
  };

  const settingsIcon = () => {
    return (
      <div
        onClick={() => handleSettingsMenu()}
        className="settings_icon"
        style={{ marginTop: "-" + config.height / 2 + "px" }}
      ></div>
    );
  };

  const handleSettingsMenu = () => {
    if (showSettings) {
      game.scene.resume("default");
      setShowSettings(false);
    } else {
      game.scene.pause("default");
      setShowSettings(true);
      setShowDeadscreen(false);
      setShowFinishScreen(false);
    }
  };
  const restartIcon = () => {
    return (
      <div
        onClick={() => restartLevel()}
        className="restart_icon"
        style={{ marginTop: "-" + config.height / 2 + "px" }}
      ></div>
    );
  };

  const settings = () => {
    return (
      <div
        className="settings"
        style={{ marginTop: "-" + (config.height / 2 - 30) + "px" }}
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

  const finishMenu = () => {
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
          {translation[language].finish_screen} {getScreenSize().type}
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
      const newRecord = finishScreenData.time < oldBestTime;
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
                {translation[language].finish_best_time}
              </p>
              <p className="finish_oldRecord_size">
                {translation[language].finish_best_time_screen}
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

  const deathScreen = () => {
    var killText = "Gestorben";
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
  };

  const showPages = () => {
    return (
      <div className="game_pages">
        <div
          onClick={() => {
            setDisplayPage(null);
            setDisplayPage(false);
            setShowMenu(true);
          }}
          className="back_icon"
        />
        <div className="content_game_pages">
          {currentPage === 1 && <AboutMe game={true} />}
          {currentPage === 2 && <Credits game={true} />}
          {currentPage === 3 && <Skills game={true} />}
          {currentPage === 6 && <Projects game={true} />}
          {currentPage === 8 && <Contact game={true} />}
        </div>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="ingame_icons">
        {settingsIcon()}
        {restartIcon()}
        {showSettings && settings()}
      </div>
    );
  };

  const renderMusicIconMenu = () => {
    return (
      <div
        className="mute_icon_game"
        onClick={() => {
          music_playing && currentSong.pause();
          !music_playing && currentSong.play();
          setMusicPlaying(!music_playing);
        }}
      >
        <FontAwesomeIcon icon={music_playing ? faVolumeUp : faVolumeMute} />
      </div>
    );
  };

  if (screenWidth < minWidth || screenHeight < minHeight) {
    return (
      <div className="game_home">
        <div className="game_error">
          <h2 className="heading_game">
            <FontAwesomeIcon icon={faTimes} className="icon_game" />
            {translation[language].screenToSmall}
          </h2>
          <p className="game_text">{translation[language].screenToSmallText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game_home">
      {showMenu && levelSelection()}
      {deathscreen && deathScreen()}
      {finishScreen && finishMenu()}
      {displayPage && showPages()}
      <div className="game">
        {!showMenu && !displayPage && renderButtons()}
        <section id="phaser-target" />
      </div>
    </div>
  );
};

export default GameHome;
