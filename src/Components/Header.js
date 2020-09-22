import React from "react";
import {Link} from "react-router-dom"

class Header extends React.Component {

  componentDidMount(){
    const {effect} = this.props
    if(effect){
      document.getElementsByClassName("header-image")[0].style.height = "1000px"
      window.addEventListener("scroll", this.handleScroll)
    }
  }

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll(){
    const scrollValue = 3*window.pageYOffset
    if(scrollValue >= 800){
      document.getElementsByClassName("header-image")[0].style.height = "200px"
    }else{
      document.getElementsByClassName("header-image")[0].style.height = 1000 - scrollValue + "px"
    }

  }

  render() {
    return (
      <div className="header">
        <div className="header-nav">
        <div className="header-element"><Link className="header-link" to="/">Home</Link></div>
        <div className="header-element"><Link className="header-link" to="/projekte">Projekte</Link></div>
        <div className="header-element"><Link className="header-link" to="/skills">Skills</Link></div>
        <div className="header-element"><Link className="header-link" to="/privat">About me</Link></div>
        <div className="header-element"><Link className="header-link" to="/kontakt">Kontakt</Link></div>
        </div>

        <div className="header-image"></div>
      </div>
    );
  }
}

export default Header;
