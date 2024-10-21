import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {Row, Col, Button,Select} from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  keyGenerator,
  TranslationContext,
} from "../helper";
import {
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";

const rotatingText = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.element = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.text = "";
  this.tick();
  this.isDeleting = false;
};

rotatingText.prototype.tick = function () {
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  this.text = this.isDeleting
    ? fullTxt.substring(0, this.text.length - 1)
    : fullTxt.substring(0, this.text.length + 1);
  this.element.innerHTML =
    '<span class="home-rotating-text">' + this.text + "</span>";
  const that = this;

  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }
  if (!this.isDeleting && this.text === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.text === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

const Home = () => {
  const [redirect, setRedirect] = useState(false)
  const { language, setLanguage, getText, locales } = useContext(TranslationContext);


  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const langQueryParm = searchParams.get('lang')
    if(langQueryParm){
      window.history.pushState({}, document.title, window.location.pathname );
      setLanguage(langQueryParm)
    }
  }, [])

  useEffect(() => {
    const width = window.innerWidth
    if(width < 1250) setRedirect(true)
    renderRotation();
  }, [])

  const renderRotation = () => {
    const languageOptions = Array.prototype.slice.call(
      document.getElementsByClassName("home-rotating-text")
    );
    languageOptions.map((single) => {
      const text = single.getAttribute("text");
      const period = single.getAttribute("period");
      if (text) {
        new rotatingText(single, JSON.parse(text), period);
      }
    });
  }

  const classicMode =() =>{
    return (
      <Col className="home_option option_classic" xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
        <div className="classic_content" to="/skills">
        <img
            alt={getText("home.classic.alt")}
            className="home_classic_image"
          />
        <h2 className="home_classic_name">{getText("home.classic.heading")}</h2>
        <p className="home_text">{getText("home.classic.info")}</p>
        <div className="home_button">
        <Button type="primary" onClick={() => setRedirect(true)}>
          {getText("home.classic.button")}
        </Button>
      </div>
      </div>
    </Col>
    )
  }

  const arcadeMode =() => {
    return(
      <Col className="home_option option_game" xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>

      <video autoPlay loop muted="muted" id="video_game">
          <source src={"www.bzenth.de/static/arcade.mp4"} type="video/mp4"/> 
      </video>
        <h2 className="home_game_name">{getText("home.arcade.heading")}</h2>
      <p className="home_text">{getText("home.arcade.info")}</p>
      <div className="home_button">
        <Button onClick={() => window.location.href=`/arcade?lang=${language}`} type="primary">{getText("home.arcade.button")}</Button>
      </div>
    </Col>
    )
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  const renderLanguageOptions = () => {
    return locales.map(localeOption => {
      return(
        <Select.Option  value={localeOption} key={keyGenerator()}>
            <div><FontAwesomeIcon icon={faLanguage} /><span className="localeText">{getText("locales."+localeOption)}</span></div>
        </Select.Option>
      )
    })

  }

  const languageSelect = () => {
    return(
      <div className="header-element homeLanguageSelect">
    <Select defaultValue={language} style={{ fontSize: "20px" }} onChange={handleLanguageChange}>
      {renderLanguageOptions()}
    </Select>
      </div>
    )
  }

    if(redirect){
      return(
        <Redirect push   to={{
          pathname: "/privat",
          search: `?lang=${language}`,
        }}/>
      )
    }
    return (
      <div className="home">
        <div className="home-content">
        <h1 className="home_name">Benjamin Zenth</h1>
        <div className="home-welcome">
            <span
              className="home-rotating-text"
              period="1000"
              text='[ "Welcome", "Willkommen", "Benvenuto", "欢迎", "Bienvenue", "Velkominn"]'
            ></span>
          </div>
        <Row className="home_options">
          {classicMode()}
          {arcadeMode()}
        </Row>
        {languageSelect()}
        </div>
      </div>
    );
  }

export default Home;
