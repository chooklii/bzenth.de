import React, {useState, useEffect, useContext} from "react";
import {TranslationContext} from "../../content"
import { Footer, Header } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXing,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "antd";
import { link_github, link_linkedin, link_xing, mail } from "../../Pages/Contact/content";

const Contact = () => {
  const [contactText, setContactText] = useState(null)
  const [image, setImage] = useState(null)
  const {language, getData} = useContext(TranslationContext)

  useEffect(() => {
    const fetchData = async () => {
      try{
      const data = await getData("contact")
      if(data){
        setImage(data[0].fields.image.fields)
        setContactText(data[0].fields.text)
      }
    }catch(e){
      console.log(e)
    }
    }
    fetchData()

  }, [language])

    return (
      <div>
        <Header />

        <div className="contact page_classic">
        <div className="image-contact desktop">
            {image && <Avatar size={250} alt={image.description} src={image.file.url} />}
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
            {image && <Avatar size={200} alt={image.description} src={image.file.url} />}
          </div>

        </div>
        <Footer />
      </div>
    );
}

export default Contact;
