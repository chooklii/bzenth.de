import React from "react";
import { HomeHeader } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

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
  constructor(props) {
    super(props);
    this.state = {
      designOpen: false,
      devOpen: false,
      liveOpen: false,
    };
  }

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

  render() {
    return (
      <div className="HomePage">
        <HomeHeader />
        <div className="home-content">
          <div className="home-welcome">
            <span
              className="home-rotating-text"
              period="1000"
              text='[ "Welcome", "Willkommen", "Benvenuto", "欢迎", "Bienvenue", "Velkominn"]'
            ></span>
            <h1 className="home-welcome-text">auf meiner Webseite</h1>
          </div>
          <div className="home-images">
            <figure className="home-single-image">
              {!this.state.designOpen && (
                <div className="home-images-plan">
                  <FontAwesomeIcon
                    onClick={() => this.setState({ designOpen: true })}
                    className="home-icon-black"
                    size="2x"
                    icon={faInfoCircle}
                  />
                </div>
              )}
              {this.state.designOpen && (
                <div className="home-text-box">
                  <FontAwesomeIcon
                    onClick={() => this.setState({ designOpen: false })}
                    className="home-icon-black"
                    size="2x"
                    icon={faTimesCircle}
                  />
                  <p className="home-info-text">Erstellung eines Individuelles Designs Ihres Internetauftritts auf Basis Ihrer Wünsche und Anforderungen. <br></br>
                      Entweder nach bereits vorhandenen Vorstellungen oder gemeinsame Findung im persönlichen Gespräch.
                  </p>
                </div>
              )}
              <figcaption className="home-underline">Design</figcaption>
            </figure>

            <figure className="home-single-image">
              {!this.state.devOpen && (
                <div className="home-images-code">
                  <FontAwesomeIcon
                    onClick={() => this.setState({ devOpen: true })}
                    className="home-icon-white"
                    size="2x"
                    icon={faInfoCircle}
                  />
                </div>
              )}
              {this.state.devOpen && (
                <div className="home-text-box">
                  <FontAwesomeIcon
                    onClick={() => this.setState({ devOpen: false })}
                    className="home-icon-black"
                    size="2x"
                    icon={faTimesCircle}
                  />
                  <p className="home-info-text">Realisierung des besprochenen Designs in einem iterativen Prozess, bis die Webseite den entsprechenden Wünschen entspricht. <br></br>
                      Typischerweise regelmäßige Statuscalls um aktuellen Stand zu besprechen und Änderungswünsche zu realisieren. </p>
                </div>
              )}

              <figcaption className="home-underline">Entwicklung</figcaption>
            </figure>

            <figure className="home-single-image">
              {!this.state.liveOpen && (
                <div className="home-images-page">
                  <FontAwesomeIcon
                    onClick={() => this.setState({ liveOpen: true })}
                    className="home-icon-black"
                    size="2x"
                    icon={faInfoCircle}
                  />
                </div>
              )}
              {this.state.liveOpen && (
                <div className="home-text-box">
                  <FontAwesomeIcon
                    onClick={() => this.setState({ liveOpen: false })}
                    className="home-icon-black"
                    size="2x"
                    icon={faTimesCircle}
                  />
                    <p className="home-info-text">Nach abgeschlossener Entwicklung Veröffentlichung der gemeinsam entwickelten Internetseite unter Ihrer Wunschdomain. <br></br>
                        Anschließend bei Bedarf Anpassung des auf der Seite dargestellten Inhalts.
                     </p>
                </div>
              )}
              <figcaption className="home-underline">Going Live</figcaption>
            </figure>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
