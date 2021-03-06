import React from "react";
import { Link } from "react-router-dom";
import {Row, Col, Button} from "antd"

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

class Home extends React.Component {

  componentDidMount() {
    this.renderRotation();
  }

  renderRotation() {
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

  classicMode(){
    return(
      <Col className="home_option option_classic" xl={12} xxl={12} lg={12} md={12} sm={24} xs={24}>
        <Link className="classic_content" to="/skills">
        <div className="home_classic_image"></div>
        <h2 className="home_classic_name">Klassische Webseite</h2>

        <div className="home_button">
        <Button type="primary">
          Zur klassischen Webseite
        </Button>
      </div>
      </Link>
    </Col>
    )
  }

  arcadeMode(){
    return(
      <Col className="home_option option_game" xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
      <video loop muted="muted" id="video_game" onMouseOut={() => this.stopVideo()} onMouseOver={() => this.hoverVideo()}>
          <source src="../static/game.mp4" type="video/mp4"/>
          Der genutzte Browser unterstützt die Video-Funktionalität leider nicht. 
      </video>
        <h2 className="home_game_name">Arcade Modus</h2>
      <p className="home_text">Spiele einzelne Seiten frei, indem Jump and Run Level abgeschlossen werden.</p>
      <div className="home_button">
        <Button onClick={() => window.location.href="/game"} type="primary">Zum Arcade-Modus</Button>
      </div>
    </Col>
    )
  }

  hoverVideo(){
    document.getElementById("video_game").play()
  }

  stopVideo(){
    document.getElementById("video_game").pause()
  }

  render() {
    return (
      <div className="HomePage">
        <div className="home-content">
        <h1 className="home_name">Benjamin Zenth</h1>
        <Row className="home_options">
          {this.classicMode()}
          {this.arcadeMode()}
        </Row>
        </div>
      </div>
    );
  }
}

export default Home;
