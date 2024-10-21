import React, { useState } from "react";
import GameHome from "./GameHome";
import {
  TranslationContext,
} from "../helper";

import "../../static/css/style-game.css";
import "antd/dist/antd.css";
import { translations } from "../translations";

const App = () => {
  const [language, setLanguage] = useState("de");

  const getText = (key) => {
    if(key in translations[language]){
      return translations[language][key]
    }
    return translations["de"][key]
  }

  return (
    <div className="app">
      <TranslationContext.Provider
          value={{ language, locales: ["de", "en"], setLanguage, texts: translations, getText }}
      >
        <GameHome />
      </TranslationContext.Provider>
    </div>
  );
};
export default App;
