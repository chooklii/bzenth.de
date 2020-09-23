import React from "react";
import { Header } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faXing } from "@fortawesome/free-brands-svg-icons";

class Contact extends React.Component {
  render() {
    return (
      <div>
        <Header />

        <div className="contact">
          <div className="contact-heading">Kontakt:</div>

          <div className="contact-image"></div>

          <div className="contact-first-line">
            Bei Interesse, Rückfragen oder unverbindlichen Anfragen bitte einen
            der folgenden Kommunikationskanäle nutzen:
          </div>
          <div className="contact-second-line">
            Telefongespräche durch formlose Abfrage der Nummer per Nachricht
          </div>

          <div className="contact-options">
            <div className="contact-icons">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <div className="contact-xing-icon">
                <FontAwesomeIcon icon={faXing} size="2x" />
              </div>
            </div>
            <div className="contact-values">
              <div className="contact-mailadress">
                benjaminzenth(at)icloud.com
              </div>
              <div className="contact-xingname">
                <a
                  target="_blank"
                  href="https://www.xing.com/profile/Benjamin_Zenth/cv"
                >
                  Benjamin Zenth
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
