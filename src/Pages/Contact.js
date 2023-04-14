import React, { useState, useEffect, useContext } from "react";
import { TranslationContext } from "../helper";
import { Footer, Header } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXing,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";

const link_xing = "https://www.xing.com/profile/Benjamin_Zenth/cv";
const link_linkedin = "https://www.linkedin.com/in/benjamin-zenth-6290681ba/";
const link_github = "https://github.com/chooklii";
const mail = "kontakt@bzenth.de";

const Contact = (props) => {
  const [contactText, setContactText] = useState(null);
  const [image, setImage] = useState(null);
  const [gameImage, setGameImage] = useState(null)
  const { language, getData } = useContext(TranslationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("contact");
        if (data) {
          setGameImage(data[0].fields.gameImage.fields);
          setImage(data[0].fields.image.fields);
          setContactText(data[0].fields);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [language]);

  if (!contactText) {
    return <div>{!props.game && <Header />}</div>;
  }
  if (props.game) {
    return (
      <div>
        <p className="game_text">
          {contactText.game}
        </p>

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
        <img
            src={gameImage.file.url}
            alt={gameImage.description}
            className="game_contact_image"
          />
      </div>
    );
  } else
    return (
      <div>
        {!props.game && <Header />}

        <div className="contact page_classic">
          <div className="image-contact desktop">
            {image && (
              <Avatar size={250} alt={image.description} src={image.file.url} />
            )}
          </div>

          <div className="contact-first-line">
            {contactText ? contactText.text : <div />}
          </div>

          <div className="contact-options">
            <a className="contact_link" href={"mailto:" + mail}>
              <FontAwesomeIcon className="icon" icon={faAt} />
              {mail}
            </a>
            <a className="contact_link" href={link_linkedin} target="_blank">
              <FontAwesomeIcon className="icon" icon={faLinkedin} />
              LinkedIn
            </a>
            <a className="contact_link" href={link_xing} target="_blank">
              <FontAwesomeIcon className="icon" icon={faXing} />
              Xing
            </a>
            <a className="contact_link" href={link_github} target="_blank">
              <FontAwesomeIcon className="icon" icon={faGithub} />
              GitHub
            </a>
          </div>
          <div className="image-contact mobile">
            {image && (
              <Avatar size={200} alt={image.description} src={image.file.url} />
            )}
          </div>
        </div>
        {!props.game && <Footer />}
      </div>
    );
};

export default Contact;
