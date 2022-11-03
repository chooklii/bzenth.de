import React, {useContext} from "react"
import {Select} from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import {localeNames, keyGenerator, TranslationContext} from "../helper"

export const LanguageSwitch = () => {
    const {language, locales, setLanguage} = useContext(TranslationContext)


const handleLanguageChange = (lang) => {
  setLanguage(lang);
};

const renderLanguageOptions = () => {
  return locales.map((localeOption) => {
    return (
      <Select.Option value={localeOption.code} key={keyGenerator()}>
        <div>
          <FontAwesomeIcon icon={faLanguage} />
          <span className="localeText">
            {localeNames[language][localeOption.code]}
          </span>
        </div>
      </Select.Option>
    );
  });
};

const languageSelect = () => {
    console.log(locales)
  if (!locales) {
    return <div></div>;
  }
  return (
    <div className="header-element">
      <Select
        defaultValue={language}
        style={{ fontSize: "20px" }}
        onChange={handleLanguageChange}
      >
        {renderLanguageOptions()}
      </Select>
    </div>
  );
};

if (!locales) {
    return <div></div>;
  }
  return (
    <div className="header-element">
      <Select
        defaultValue={language}
        style={{ fontSize: "20px" }}
        onChange={handleLanguageChange}
      >
        {renderLanguageOptions()}
      </Select>
    </div>
  );
}