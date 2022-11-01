import React, {useState, useEffect, useContext} from "react";
import {TranslationContext} from "../../content"
import { Footer, Header } from "../../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXing,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";
import { link_github, link_linkedin, link_xing, mail } from "./content";

const Contact = () => {
  const [contactText, setContactText] = useState(null)
  const {language, getData} = useContext(TranslationContext)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("contact")
      if(data){
        setContactText(data[0].fields.text)
      }
    }
    fetchData()

  }, [language])

    return (
      <div>
        <Header />

        <div className="contact page_classic">
        <div className="image-contact desktop">
            <Avatar size={250} src={"/static/images/me.jpg"} />
          </div>

          <div className="contact-first-line">
            {contactText ? contactText : <div/>}
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
            <Avatar size={200} src={"/static/images/me.jpg"} />
          </div>

        </div>
        <Footer />
      </div>
    );
}

export default Contact;
