import React from "react";
import {Footer, Header} from "../../Components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXing, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons"
import { link_github, link_linkedin, link_xing, mail} from "./content"
class Contact extends React.Component {

  render() {
    return (
      <div>
        <Header />

        <div className="contact page_classic">
          <div className="contact-image"></div>

          <div className="contact-first-line">
            Bei Interesse, Fragen, unverbindlichen Anfragen oder sonstigen Anliegen bitte einen
            der folgenden Kommunikationskanäle verwenden:
          </div>

          <div className="contact-options">
          <a className="contact_link" href={"mailto:" + mail}>
                <FontAwesomeIcon className="icon" icon={faAt}/>
                {mail}
            </a>
            <a className="contact_link" href={link_linkedin} target="_blank">
                <FontAwesomeIcon className="icon" icon={faLinkedin}/>
                LinkedIn
            </a>
            <a className="contact_link" href={link_xing} target="_blank">
                <FontAwesomeIcon className="icon" icon={faXing}/>
                Xing
            </a>
            <a className="contact_link" href={link_github} target="_blank">
                <FontAwesomeIcon className="icon" icon={faGithub}/>
                GitHub
            </a>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Contact;
