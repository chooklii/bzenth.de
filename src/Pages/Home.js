import React from "react"
import {HomeHeader} from "../Components"

const rotatingText = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.element = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.text = '';
    this.tick();
    this.isDeleting = false;
  };

  rotatingText.prototype.tick = function() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    this.text = this.isDeleting ? fullTxt.substring(0, this.text.length - 1) : fullTxt.substring(0, this.text.length + 1)
    this.element.innerHTML = '<span class="home-rotating-text">'+this.text+'</span>';
    const that = this;

    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) {
         delta /= 2;
    }
    if (!this.isDeleting && this.text === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.text === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

class Home extends React.Component {

    componentDidMount(){
        this.renderRotation()
    }

    renderRotation(){
        const languageOptions = Array.prototype.slice.call(document.getElementsByClassName("home-rotating-text"))
        languageOptions.map(single => {
            const text = single.getAttribute("text")
            const period = single.getAttribute("period")
            if(text){
                new rotatingText(single, JSON.parse(text), period)
            }
        })
    }

    render(){
        return(
            <div className="HomePage">
                <HomeHeader/>
                <div className="home-content">
                    <div className="home-welcome">
                    <span
                        className="home-rotating-text"
                        period="1000"
                        text='[ "Welcome", "Willkommen", "Benvenuto", "欢迎", "Bienvenue", "Velkominn"]'></span>
                        <div className="home-welcome-text">auf meiner Webseite</div>
                    </div>
                    <div className="home-images">
                    <figure className="home-single-image">
                            <div className="home-images-plan"></div>
                            <figcaption className="home-underline">Design</figcaption>
                    </figure>

                    <figure className="home-single-image">
                    <div className="home-images-code"></div>
                            <figcaption className="home-underline">Implementation</figcaption>
                    </figure>

                    <figure className="home-single-image">
                    <div className="home-images-page"></div>
                            <figcaption className="home-underline">Launch</figcaption>
                    </figure>


                    </div>
                </div>
            </div>
        )
    }
}

export default Home