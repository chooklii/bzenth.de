import React from "react";
import { Link } from "react-router-dom";


class Header extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      mobileMenu: false
    }
  }

  showMobileMenu(){
    const {mobileMenu} = this.state
    if(mobileMenu){
      document.getElementsByTagName("body")[0].style.marginLeft = "0px"
      document.getElementsByClassName("header-mobile-menu-wrapper")[0].style.paddingLeft ="0px"
      document.getElementsByTagName("body")[0].style.display = "block"
      document.getElementById("root").style.pointerEvents = "all"
      document.getElementsByClassName("header-nav")[0].style.display = "none"
    }else{
      document.getElementsByTagName("body")[0].style.marginLeft = "256px"
      document.getElementsByClassName("header-mobile-menu-wrapper")[0].style.paddingLeft ="256px"
      document.getElementsByTagName("body")[0].style.display = "flex"
      document.getElementById("root").style.pointerEvents = "none"
      document.getElementsByClassName("header")[0].style.pointerEvents = "all "
      document.getElementsByClassName("header-nav")[0].style.display = "block"
    }
    this.setState({mobileMenu: !mobileMenu})
  }

  hideMenu(){
    const {mobileMenu} = this.state
    if(mobileMenu){
      this.setState({mobileMenu: false})
      document.getElementsByTagName("body")[0].style.marginLeft = "0px"
      document.getElementsByClassName("header-mobile-menu-wrapper")[0].style.paddingLeft ="0px"
      document.getElementsByTagName("body")[0].style.display = "block"
      document.getElementById("root").style.pointerEvents = "all"
      document.getElementsByClassName("header-nav")[0].style.display = "none"
    }
  }

  render() {
    return(
      <div className="header">
      <div className="header-mobile-menu-wrapper">
        <span onClick={() => this.showMobileMenu()} className="header-mobile-span">
          <div className="header-mobile-menu-icon"></div>
        </span>
        <h1 className="header-mobile-heading">Benjamin Zenth</h1>

      </div>
      <h1 className="header-desktop-heading">Benjamin Zenth</h1>
      <div className="header-nav">
      <Link onClick={() => this.hideMenu()} className="header-element" to="/projekte/offentlich">
          Öffentliche Projekte
        </Link>
        <Link onClick={() => this.hideMenu()} className="header-element" to="/projekte/privat">
          Private Projekte
        </Link>
        <Link onClick={() => this.hideMenu()} className="header-element" to="/skills">
          Skills
        </Link>
        <Link onClick={() => this.hideMenu()} className="header-element" to="/privat">
          About me
        </Link>
        <Link onClick={() => this.hideMenu()} className="header-element" to="/kontakt">
          Kontakt
        </Link>
        <Link onClick={() => this.hideMenu()} className="header-element notShownDesktop" to="/impressum">
          Impressum
        </Link>
      </div>
    </div>
    )
  }
}

export default Header;
