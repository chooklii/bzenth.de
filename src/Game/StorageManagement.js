import { sign, verify } from "jsonwebtoken";

// i know that this is not the way to use jwt, but its the easiest way to prevent my friends from simple cheating - now they at least need to show some efford.
const jwtKey = "hackerman";
const localStorageKey = "gamedata";

const writeJsonToStorage = (object) => {
  const token = sign(object, jwtKey);
  localStorage.setItem(localStorageKey, token);
};

export const readLocalStorage = () => {
  const dataFromLocalStorage = localStorage.getItem(localStorageKey);
  if (!dataFromLocalStorage) return;
  try {
    const decoded = verify(dataFromLocalStorage, jwtKey);
    if (decoded) {
      return {
        finishedLevel: decoded.finishedLevel,
        metaData: decoded.metaData,
      };
    }
  } catch (e) {
    console.log("Found invalid JWT - ignore");
  }
};

export const addDeathToCount = (id, metaData, finishedLevel, setMetaData) => {
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

export const writeLocalStorage = (id, metaData, screenType, runTime, finishedLevel, setMetaData) => {
  let newData;
  if (id in metaData) {
    const oldLevelData = metaData[id];
    const newRecord =
      oldLevelData.record === undefined || oldLevelData.record > runTime;
    const newLevelData = {
      deaths: oldLevelData.deaths,
      record: newRecord ? runTime : oldLevelData.record,
      screenSize: newRecord ? screenType : oldLevelData.screenSize,
    };
    newData = Object.assign(metaData, { [id]: newLevelData });
    setMetaData(newData);
  } else {
    const levelData = {
      deaths: 0,
      record: runTime,
      screenSize: screenType,
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
