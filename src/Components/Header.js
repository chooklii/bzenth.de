import React from "react";
import {Link} from "react-router-dom"

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="header-nav">
        <div className="header-element"><Link className="header-link" to="/">Home</Link></div>
        <div className="header-element"><Link className="header-link" to="/projekte">Projekte</Link></div>
        <div className="header-element"><Link className="header-link" to="/werdegang">Werdegang</Link></div>
        <div className="header-element"><Link className="header-link" to="/privat">Privat</Link></div>
        <div className="header-element"><Link className="header-link" to="/kontakt">Kontakt</Link></div>
        </div>

        <div className="header-image"></div>
      </div>
    );
  }
}

export default Header;
