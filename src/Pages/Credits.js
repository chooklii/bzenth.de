import React from "react"
import {Row, Col, Button} from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faImage,
    faQuoteRight,
    faMusic,
    faHeadphones
} from "@fortawesome/free-solid-svg-icons"

const Credits = () => {

    const music = () => {
        return(
            <div>
                <h2 className="heading_game">
                    <FontAwesomeIcon icon={faMusic} className="icon_game"/>
                    Sounds
                </h2>
                <p className="game_text">Sämtliche im Arcade Mode genutzte Musik und Sounds stammt aus dem RPG Music Pack musiziert von SVL.</p>

                <div className="design_buttons">
                <Button onClick={() => window.open("https://svl.itch.io/rpg-music-pack-svl", '_blank')}>RPG Music Pack</Button>
                </div>

                <h2 className="heading_game headingMargin">
                    <FontAwesomeIcon icon={faHeadphones} className="icon_game"/>
                    Namen der Lieder
                </h2>

                <p className="game_text">Im Menü werden die Tracks #1 bis Track #6 abgespielt. In den einzelnen Level folgende Musik:</p>
                <div className="credits_music">
                    <div className="credits_music_half">
                    <p className="game_text">Level 1: Field Theme</p>
                    <p className="game_text">Level 3: Cave Theme</p>
                    <p className="game_text">Level 5: Cave Theme</p>
                    <p className="game_text">Level 7: Night Theme</p>
                </div>
                <div className="credits_music_half">
                    <p className="game_text">Level 2: Sea Theme</p>
                    <p className="game_text">Level 4: Sea Theme</p>
                    <p className="game_text">Level 6: Dungeon Theme</p>
                    <p className="game_text">Level 8: Night Theme</p>
                </div>
                </div>
            </div>
        )
    }

    const design = () => {
        return(
            <div>
                <h2 className="heading_game">
                    <FontAwesomeIcon icon={faImage} className="icon_game"/>
                    Grafiken
                </h2>
                <p className="game_text">Sämtliche genutzten Grafiken stammen aus dem Pixel Adventure Grafikpaket, welches von "Pixel Frog" entwickelt wurde.
                Weitere Informationen und Game Assets können auf der Webseite von "Pixel Frog" gefunden werden.</p>
                <div className="design_buttons">
                <Button onClick={() => window.open("https://pixelfrog-assets.itch.io/", '_blank')}>Pixel Frog</Button>
                <Button style={{marginLeft: "10px"}} onClick={() => window.open("https://pixelfrog-assets.itch.io/pixel-adventure-1", '_blank')}>Grafikpaket</Button>
                </div>

                <h2 className="heading_game headingMargin">
                    <FontAwesomeIcon icon={faQuoteRight} className="icon_game"/>
                    Textarten
                </h2>

                <p className="game_text">Des weiteren wurden die drei Schriftarten "Green Fuz", "JosefinSans" und "Lobster" genutzt. Bei "Green Fuz" handelt es sich um die Schrift, 
                welche im Game Over Screen genutzt ist, Josefin Sans ist die auf den Seiten genutzt Schrift. "Lobster" wird für die Überschriften genutzt. </p>
                <div className="design_buttons">
                <Button onClick={() => window.open("https://www.fontsquirrel.com/fonts/Green-Fuz", '_blank')}>Green Fuz</Button>
                <Button style={{marginLeft: "10px"}} onClick={() => window.open("https://www.fontsquirrel.com/fonts/josefin-sans", '_blank')}>JosefinSans</Button>
                <Button style={{marginLeft: "10px"}} onClick={() => window.open("https://www.fontsquirrel.com/fonts/Lobster", '_blank')}>Lobster</Button>
                </div>
            </div>
        )
    }

    return(
        <div>
            <h1 className="heading_game">Credits</h1>
            <p className="game_text">Dieses Spiel wurde mit dem Game-Framework Phaser.io entwickelt. Grafiken, Schriftarten und Sounds wurden dabei nicht selbst designed, sondern
            die folgend aufgelisteten, kostenlos im Internet zur Verfügung gestellten genutzt. Ohne die Bereitstellung zur freien Nutzung wäre dieses Spiel nicht entstanden.
             </p>
            <Row>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                <div className="box_credits">
                    {design()}
                </div>
                </Col>

                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                <div className="box_credits">
                    {music()}
                </div>
                </Col>
            </Row>


        </div>
    )

}

export default Credits