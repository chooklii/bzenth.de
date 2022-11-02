import React, { useState, useEffect } from "react";
import GameHome from "./GameHome";
import { init, trackPages } from "insights-js";
import {
  TranslationContext,
  contentfulClient,
} from "../helper";


import "../../static/css/style-game.css";
import "antd/dist/antd.css";

const App = () => {
  const [language, setLanguage] = useState("de");
  const [locales, setLocales] = useState(null);
  const [data, setData] = useState(null);

  const fetchLocales = async () => {
    const entry = await contentfulClient
      .getLocales()
      .catch((err) => console.log(err));

    const defaultLanguage = entry.items
      .filter((x) => x.default)
      .map((x) => x.code)[0];
    setLanguage(defaultLanguage);
    setLocales(entry.items);
    return entry.items;
  };

  const getData = async (key, byTag = false) => {
    // initial setup, fetch locales and setup empty data
    if (!data && !locales) {
      const fetchedLocales = await fetchLocales();
      const languageOptions = fetchedLocales.map((x) => x.code);
      const emptyData = {};
      languageOptions.forEach((key) => {
        emptyData[key] = {};
      });
      setData(emptyData);
      return checkIfDataExists(emptyData, key, byTag);
    }
    return checkIfDataExists(data, key, byTag);
  };

  const checkIfDataExists = async (data, key, byTag) => {
    // check if key for language is defined, if not fetch data
    if (key in data[language]) {
      return data[language][key];
    } else if (!byTag) {
      const fetchedData = await fetchDataByContentType(key);
      data[language][key] = fetchedData;
      return fetchedData;
    } else {
      const fetchedData = await fetchDataByTag(key);
      data[language][key] = fetchedData;
      return fetchedData;
    }
  };

  const fetchDataByContentType = async (key) => {
    const fetchedData = await contentfulClient.getEntries({
      content_type: key,
      locale: language,
    });
    return fetchedData.items;
  };

  const fetchDataByTag = async (key) => {
    const fetchedData = await contentfulClient.getEntries({
      [`metadata.tags[${key}]`]: true,
      locale: language,
    });
    return fetchedData.items;
  };

  useEffect(() => {
    if (location.hostname != "localhost") {
      init("OMGVVhafavnD3FVc");
      trackPages();
    }
  }, []);

  return (
    <div className="app">
      <TranslationContext.Provider
        value={{ language, locales, setLanguage, getData }}
      >
        <GameHome />
      </TranslationContext.Provider>
    </div>
  );
};
export default App;
