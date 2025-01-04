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
} from "./resources/music";
import {
  translation,
  minHeight,
  minWidth,
  itemsToUnlock,
} from "./resources/config";
import { TranslationContext, keyGenerator } from "../helper";
import { FinishScreen, DeathScreen, IngameButtons } from "./components";
import {
  writeLocalStorage,
  addDeathToCount,
  readLocalStorage,
} from "./StorageManagement";

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
  const [screenHeight, setScreenHight] = useState(1500);
  const [screenWidth, setScreenWidth] = useState(1500);
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
  const [currentGamePage, setCurrentGamePage] = useState(0);
  const { language, setLanguage, getText } = useContext(TranslationContext);

  useEffect(() => {
    initDefaultGame();
    initMusic();

    const data = readLocalStorage();
    if (data) {
      setFinishedLevel([...data.finishedLevel, 5, 6, 7, 8]);
      setMetaData(data.metaData);
    }

    readLanguageFromQuery();
  }, []);

  const readLanguageFromQuery = () => {
    const searchParams = new URLSearchParams(document.location.search);
    const langQueryParm = searchParams.get("lang");
    if (langQueryParm) {
      window.history.pushState({}, document.title, window.location.pathname);
      setLanguage(langQueryParm);
    }
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
      game.restart = () => restartLevel();
      game.scaleFactor = getScaleFactor(type);
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
    writeLocalStorage(
      id,
      metaData,
      getScreenSize().type,
      runTime,
      finishedLevel,
      setMetaData
    );
    game.scene.pause("default");
    setShowFinishScreen(true);
  };

  const death = (way, levelId) => {
    setShowDeadscreen(true);
    addDeathToCount(levelId, metaData, finishedLevel, setMetaData);
    setKilledBy(way);
    window.addEventListener("keydown", (event) => {
      if ((event.key === "r" || event.key === "R") && deathscreen) {
        restartLevel(levelId);
      }
    });
  };

  const selectedNewLevel = (id, music_theme) => {
    // kill current game
    game.destroy(true);
    updateMusic(music_theme);
    setShowMenu(false);
    setMusicPlaylist(music_theme);
    // create new game with correct level id
    setSelectedLevel(id);
    initGame(id);
  };

  const getScaleFactor = (type) => {
    switch (type) {
      case "s":
        return 0.75;
      case "m":
        return 0.875;
      case "l":
        return 1;
      case "xl":
        return 1.125;
    }
  };

  const initGame = (id) => {
    game = new Phaser.Game(config);
    game.levels = levels[id];
    game.type = type;
    game.scaleFactor = getScaleFactor(type);
    game.playMusic = music_playing;
    game.finished = (runTime) => finished(runTime, id);
    game.death = (way) => death(way, id);
    game.restart = () => restartLevel(id);
  };

  const restartLevel = (id) => {
    game.destroy(true);
    setShowDeadscreen(false);
    setShowFinishScreen(false);
    initGame(id ?? selectedLevel);
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
        {renderLevelOptions()}
        <Tooltip title={translation[language].changeLevelPage}>
          <Button
            style={{ width: "80%", marginLeft: "10%" }}
            onClick={() => setCurrentGamePage(currentGamePage === 0 ? 1 : 0)}
            disabled={false && !finishedLevel.includes(8)}
          >
            {currentGamePage === 0 && translation[language].nextPage}
            {currentGamePage === 1 && translation[language].lastPage}
          </Button>
        </Tooltip>
      </div>
    );
  };

  const renderLevelOptions = () => {
    if (currentGamePage === 0) {
      return (
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
      );
    }
    if (currentGamePage === 1) {
      return (
        <Row className="level_row">
          {singleLevel(9, "", field_theme)}
          {singleLevel(10, "", sea_theme)}
          {singleLevel(11, "", cave_theme)}
          {singleLevel(12, "", sea_theme)}
          {singleLevel(13, "", field_theme)}
          {singleLevel(14, "", dungeon_theme)}
          {singleLevel(15, "", night_theme)}
          {singleLevel(16, "", night_theme)}
        </Row>
      );
    }
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

  const showPages = () => {
    return (
      <div className="game_pages">
        <div
          onClick={() => {
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
      {deathscreen && (
        <DeathScreen
          language={language}
          restartLevel={restartLevel}
          setShowDeadscreen={setShowDeadscreen}
          killedBy={killedBy}
        />
      )}

      {finishScreen && (
        <FinishScreen
          finishScreenData={finishScreenData}
          translation={translation}
          language={language}
          screenSizeType={getScreenSize().type}
          updateMusic={updateMusic}
          setShowFinishScreen={setShowFinishScreen}
          setShowMenu={setShowMenu}
          restartLevel={restartLevel}
        />
      )}

      {displayPage && showPages()}
      <div className="game">
        {!showMenu && !displayPage && (
          <IngameButtons
            showSettings={showSettings}
            translation={translation}
            handleSettingsMenu={handleSettingsMenu}
            updateMusic={updateMusic}
            setShowSettings={setShowSettings}
            setShowMenu={setShowMenu}
            pageHeight={config.height}
            language={language}
            restartLevel={restartLevel}
          />
        )}
        <section id="phaser-target" />
      </div>
    </div>
  );
};

export default GameHome;
