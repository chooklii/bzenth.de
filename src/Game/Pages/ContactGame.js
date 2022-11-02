import React from "react"
import {mail, link_github, link_linkedin, link_xing} from "../../Pages/Contact/content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXing, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons"
const ContactGame = () => {

    return(
        <div>
            <h1 className="heading_game">Kontakt</h1>
            <p className="game_text">
                Glückwunsch! Alle Level wurden erfolgreich abgeschlossen. 
                Lasse mich gerne davon wissen, dann wird dein Name evtl. in einer zukünftigen Version dieser Seite in irgendeiner Form von Hall of Fame erwähnt.
                Sollte dir die Seite gefallen haben, oder aus sonstigen Gründen Interesse an einer Kontaktaufnahme besteht sind findest du unterhalb entsprechende Möglichkeiten dazu.
            </p>

            <a className="game_contact_link" href={"mailto:" + mail}>
                <FontAwesomeIcon className="icon_game" icon={faAt}/>
                {mail}
            </a>
            <a className="game_contact_link" href={link_linkedin} target="_blank">
                <FontAwesomeIcon className="icon_game" icon={faLinkedin}/>
                LinkedIn
            </a>
            <a className="game_contact_link" href={link_xing} target="_blank">
                <FontAwesomeIcon className="icon_game" icon={faXing}/>
                Xing
            </a>
            <a className="game_contact_link" href={link_github} target="_blank">
                <FontAwesomeIcon className="icon_game" icon={faGithub}/>
                GitHub
            </a>

            <div className="game_contact_image"/>
        </div>
    )
}

export default ContactGame