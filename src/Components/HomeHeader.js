import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

class HomeHeader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      animationdone: false,
      mobileMenu: false
    }

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    document.getElementsByClassName("header-image")[0].style.height =window.innerHeight + "px";
    document.getElementsByClassName("header-mobile-menu-wrapper")[0].style.display = "none";
    document.getElementsByClassName("header-nav")[0].style.display = "none";
    document.getElementsByClassName("header-scroll-down")[0].style.display = "block";
    document.getElementsByTagName("body")[0].style.height = window.innerHeight + 1 + "px"
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const scrollValue = document.documentElement.scrollTop
    const width = window.innerWidth
    const height = window.innerHeight

    if (scrollValue !== 0 && !this.state.animationdone) {
      document.getElementsByClassName("header-scroll-down")[0].style.display ="none";
      document.getElementsByClassName("header-name-text")[0].style.display ="none";
      document.getElementsByClassName("header-name-scroll")[0].style.display ="none";
      document.getElementsByClassName("header-image")[0].style.height = "0px";
      document.getElementsByClassName("header-name-box")[0].style.paddingTop = "0px";
      document.getElementsByTagName("body")[0].style.height = "auto";
      if(width <=1025){
        document.getElementsByClassName("header-mobile-menu-wrapper")[0].style.display = "block";
      }else{
        document.getElementsByClassName("header-nav")[0].style.display = "block"
      }
      window.scrollTo(0,0)

      setTimeout(function(){
        this.setState({animationdone: true})
      }.bind(this)
      , 1000)
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
    return (
      <div className="header-wrapper">
      <div className="header">
      <div className="header-mobile-menu-wrapper">
          <span onClick={() => this.showMobileMenu()} className="header-mobile-span">
            <div className="header-mobile-menu-icon"></div>
          </span>
          <h1 className="header-mobile-heading">Benjamin Zenth</h1>

        </div>
        <div className="header-nav">
          <Link onClick={() => this.hideMenu()} className="header-element" to="/">
            Home
          </Link>
          <Link onClick={() => this.hideMenu()} className="header-element" to="/projekte">
            Projekte
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
          <Link onClick={() => this.hideMenu()} className="header-element" to="/impressum">
            Impressum
          </Link>
        </div>

        <div className="header-image">
          <div className="header-name-box">
          <div className="header-name-text">Benjamin Zenth</div>
          <div className="header-name-scroll">Scroll down</div>
          <div className="header-scroll-down">
            <FontAwesomeIcon icon={faAngleDown} size="6x" />
          </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default HomeHeader;
