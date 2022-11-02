import React, { useContext, useState, useEffect } from "react";
import Phaser from "phaser";
import Game from "./Game";
import { levels, starting } from "./level";
import { Button, Tooltip, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeUp,
  faVolumeMute,
  faTimes,
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
  back,
} from "./config";
import { TranslationContext } from "../helper";

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

const GameHome = () => {
  const [screenHeight, setScreenHight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [finishedLevel, setFinishedLevel] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [deathscreen, setShowDeadscreen] = useState(false);
  const [killedBy, setKilledBy] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [displayPage, setDisplayPage] = useState(false);
  const [type, setType] = useState(null);
  const [music_playing, setMusicPlaying] = useState(false);
  const [music_playlist, setMusicPlaylist] = useState(music_menu);
  const [music_index, setMusicIndex] = useState(0);
  const { language, setLanguage } = useContext(TranslationContext);

  useEffect(() => {
    initDefaultGame();
    initMusic();
    readLocalStorage(), readLanguageFromQuery();
  }, []);

  const readLanguageFromQuery = () => {
    const searchParams = new URLSearchParams(document.location.search);
    const langQueryParm = searchParams.get("lang");
    if (langQueryParm) {
      setLanguage(langQueryParm);
    }
  };

  const readLocalStorage = () => {
    const dataFromLocalStorage = localStorage.getItem("finishedLevel");
    if (dataFromLocalStorage) {
      setFinishedLevel(dataFromLocalStorage);
    }
  };

  const resetLevel = () => {
    localStorage.removeItem("finishedLevel");
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

  const finished = () => {
    finishedLevel.push(selectedLevel);
    localStorage.setItem("finishedLevel", finishedLevel);
    updateMusic(music_menu);
    setShowMenu(true);
    game.scene.pause("default");
  };

  const death = (way) => {
    setShowDeadscreen(true);
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
    game.finished = () => finished();
    game.death = (way) => death(way);
    game.restart = () => restartLevel();
  };

  const restartLevel = () => {
    game.destroy(true);
    setShowDeadscreen(false);
    initGame(selectedLevel);
  };

  const levelSelection = () => {
    return (
      <div className="level_selector">
        <div className="game_back">
          <Button onClick={() => resetLevel()}>{translation[language].reset}</Button>
          <Button
            className="margin_left"
            onClick={() => (window.location.href = "/")}
          >
            {translation[language].backMenu}
          </Button>
          {renderMusicIconMenu()}
        </div>
        <div className="explaination">
          <h1 className="explaination_heading">{translation[language].name}</h1>
          <div className="explaination_text">
            Beende Level um einzelne Seiten freizuschalten. Erreiche mit deiner
            Spielfigur den Pokal, um ein Level anzuschließen.
          </div>
          <div className="explaination_setting">
            <div className="single_setting">
              <p className="key_setting">Bewegung: </p>
              <p className="value_setting">Pfeiltasten</p>
            </div>
            <div className="single_setting">
              <p className="key_setting">Springen: </p>
              <p className="value_setting">Leertaste</p>
            </div>
            <div className="single_setting">
              <p className="key_setting">Restart: </p>
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
          {unlock_button(levelID)}
          <div className="button_start_level">
            <Tooltip
              title={
                disabled
                  ? "Beende das vorherige Level, um dieses zu spielen."
                  : "Klicke hier, um das Level zu starten"
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
      </Col>
    );
  };

  const unlock_button = (levelID) => {
    const disabled = finishedLevel.includes(levelID) ? false : true;
    const unlock = Object.keys(itemsToUnlock).includes(levelID.toString())
      ? true
      : false;
    if (unlock) {
      return (
        <div className="button_start_level">
          <Tooltip
            title={
              disabled
                ? "Beende dieses Level, um diese Seite anzuzeigen."
                : "Klicke hier, um diese Seite anzuzeigen"
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
                {itemsToUnlock[levelID]}
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
            <div className="setting_key">{translation[language].controlls}:</div>
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
          <p className="game_text">
          {translation[language].screenToSmallText}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="game_home">
      {showMenu && levelSelection()}
      {deathscreen && deathScreen()}
      {displayPage && showPages()}
      <div className="game">
        {!showMenu && !displayPage && renderButtons()}
        <section id="phaser-target" />
      </div>
    </div>
  );
};

export default GameHome;
