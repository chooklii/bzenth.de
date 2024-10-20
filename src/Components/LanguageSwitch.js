import React, { useContext } from "react";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { keyGenerator, TranslationContext } from "../helper";

export const LanguageSwitch = () => {
  const { language, locales, setLanguage, getText } =
    useContext(TranslationContext);

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
