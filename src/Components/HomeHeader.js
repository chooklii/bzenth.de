import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

class HomeHeader extends React.Component {
  componentDidMount() {
    document.getElementsByClassName("header-image")[0].style.height =
      window.innerHeight + "px";
    document.getElementsByClassName("header-nav")[0].style.display = "none";
    document.getElementsByClassName("header-scroll-down")[0].style.display =
      "block";
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const scrollValue = 3 * window.pageYOffset;
    if (scrollValue !== 0) {
      document.getElementsByClassName("header-nav")[0].style.display = "block";
      document.getElementsByClassName("header-scroll-down")[0].style.display =
        "none";
      document.getElementsByClassName("header-name-text")[0].style.display =
        "none";
    } else {
      document.getElementsByClassName("header-nav")[0].style.display = "none";
      document.getElementsByClassName("header-scroll-down")[0].style.display =
        "block";
      document.getElementsByClassName("header-name-text")[0].style.display =
        "block";
    }
    if (scrollValue >= 800) {
      document.getElementsByClassName("header-image")[0].style.height = "200px";
    } else {
      document.getElementsByClassName("header-image")[0].style.height =
        window.innerHeight - scrollValue + "px";
    }
  }

  render() {
    return (
      <div className="header">
        <div className="header-nav">
          <Link className="header-element" to="/">
            Home
          </Link>
          <Link className="header-element" to="/projekte">
            Projekte
          </Link>
          <Link className="header-element" to="/skills">
            Skills
          </Link>
          <Link className="header-element" to="/privat">
            About me
          </Link>
          <Link className="header-element" to="/kontakt">
            Kontakt
          </Link>
        </div>

        <div className="header-image">
          <div className="header-name-text">Benjamin Zenth</div>
          <div className="header-scroll-down">
            <FontAwesomeIcon icon={faAngleDown} size="6x" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeHeader;
