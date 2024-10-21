import React, { useState, useEffect, useContext } from "react";
import { TranslationContext } from "../helper";
import { Footer, Header } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";

const link_linkedin = "https://www.linkedin.com/in/benjamin-zenth-6290681ba/";
const link_github = "https://github.com/chooklii";
const mail = "kontakt@bzenth.de";

const Contact = (props) => {
  const { getText } = useContext(TranslationContext);

  if (props.game) {
    return (
      <div>
        <p className="game_text">{getText("contact.text_game")}</p>

        <a className="game_contact_link" href={"mailto:" + mail}>
          <FontAwesomeIcon className="icon_game" icon={faAt} />
          {mail}
        </a>
        <a className="game_contact_link" href={link_linkedin} target="_blank">
          <FontAwesomeIcon className="icon_game" icon={faLinkedin} />
          LinkedIn
        </a>
        <a className="game_contact_link" href={link_github} target="_blank">
          <FontAwesomeIcon className="icon_game" icon={faGithub} />
          GitHub
        </a>
        <img alt={getText("contact.alt_game")} className="game_contact_image" />
      </div>
    );
  } else
    return (
      <div>
        <Header />
        <div className="contact page_classic">
          <img alt={getText("contact.alt")} className="image-contact desktop" />
          <div className="contact-first-line">{getText("contact.text")}</div>

          <div className="contact-options">
            <a className="contact_link" href={"mailto:" + mail}>
              <FontAwesomeIcon className="icon" icon={faAt} />
              {mail}
            </a>
            <a className="contact_link" href={link_linkedin} target="_blank">
              <FontAwesomeIcon className="icon" icon={faLinkedin} />
              LinkedIn
            </a>
            <a className="contact_link" href={link_github} target="_blank">
              <FontAwesomeIcon className="icon" icon={faGithub} />
              GitHub
            </a>
          </div>
          <img alt={getText("contact.alt")} className="image-contact mobile" />
        </div>
        <Footer />
      </div>
    );
};

export default Contact;
