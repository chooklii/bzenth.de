import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
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

        <div className="header-image"></div>
      </div>
    );
  }
}

export default Header;
