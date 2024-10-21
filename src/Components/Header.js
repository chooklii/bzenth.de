import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {TranslationContext} from "../helper"
import {LanguageSwitch} from "./LanguageSwitch"

const  Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const {language, getText} = useContext(TranslationContext)

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
          {getText("header.projects")}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/skills"
        >
          {getText("header.skills")}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/privat"
        >
          {getText("header.aboutMe")}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/blog"
        >
          {getText("header.blog")}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element"
          to="/kontakt"
        >
          {getText("header.contact")}
        </Link>
        <Link
          onClick={() => hideMenu()}
          className="header-element notShownDesktop"
          to="/impressum"
        >
          {getText("header.imprint")}
        </Link>
        <LanguageSwitch/>
      </div>
    </div>
  );
};

export default Header;
