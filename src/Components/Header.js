import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {TranslationContext, localeNames} from "../helper"
import {LanguageSwitch} from "./LanguageSwitch"

const formatHeaderData = (entries) => {
  const fields =  entries.map(x => x.fields)
  return fields.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.name }), {});
}

const defaultHeaderNames = {
  "public": "Projekte",
  "skills": "Skills",
  "about": "Über mich",
  "kontakt": "Kontakt",
  "impressum": "Impressum"
}

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [headerNames, setHeaderNames] = useState(defaultHeaderNames)
  const {language, getData} = useContext(TranslationContext)

  useEffect(() => {
    const fetchHeaderData = async () => {
      try{
        const headerData = await getData("header")
        if(headerData){
          setHeaderNames(formatHeaderData(headerData))
        }
      }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
      }
    }
    fetchHeaderData()

  }, [language])

  const showMobileMenu = () => {
    if (mobileMenu) {
      document.getElementsByTagName("body")[0].style.marginLeft = "0px";
      document.getElementsByClassName(
        "header-mobile-menu-wrapper"
      )[0].style.paddingLeft = "0px";
      document.getElementsByTagName("body")[0].style.display = "block";
      document.getElementById("root").style.pointerEvents = "all";
      document.getElementsByClassName("header-nav")[0].style.display = "none";
    } else {
      document.getElementsByTagName("body")[0].style.marginLeft = "256px";
      document.getElementsByClassName(
        "header-mobile-menu-wrapper"
      )[0].style.paddingLeft = "256px";
      document.getElementsByTagName("body")[0].style.display = "flex";
      document.getElementById("root").style.pointerEvents = "none";
      document.getElementsByClassName("header")[0].style.pointerEvents = "all ";
      document.getElementsByClassName("header-nav")[0].style.display = "block";
    }
    setMobileMenu(!mobileMenu);
  };

  const hideMenu = () => {
    if (mobileMenu) {
      setMobileMenu(false);
      document.getElementsByTagName("body")[0].style.marginLeft = "0px";
      document.getElementsByClassName(
        "header-mobile-menu-wrapper"
      )[0].style.paddingLeft = "0px";
      document.getElementsByTagName("body")[0].style.display = "block";
      document.getElementById("root").style.pointerEvents = "all";
      document.getElementsByClassName("header-nav")[0].style.display = "none";
    }
  };

  return (
    <div className="header">
      <div className="header-mobile-menu-wrapper">
        <span onClick={() => showMobileMenu()} className="header-mobile-span">
          <div className="header-mobile-menu-icon"></div>
        </span>
        <h1 className="header-mobile-heading">Benjamin Zenth</h1>
      </div>
      <h1
        onClick={() => (window.location.href = `/?lang=${language}`)}
        className="header-desktop-heading"
      >
        Benjamin Zenth
      </h1>
      <div className="header-nav">
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/projekte"
        >
          {headerNames.public}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/skills"
        >
          {headerNames.skills}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/privat"
        >
          {headerNames.about}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/kontakt"
        >
          {headerNames.kontakt}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element notShownDesktop"
          to="/impressum"
        >
          {headerNames.impressum}
        </Link>
        <LanguageSwitch/>
      </div>
    </div>
  );
};

export default Header;
