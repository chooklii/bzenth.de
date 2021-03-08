import React from "react"
import {cv_content, description, hobbies} from "./content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUser
} from "@fortawesome/free-solid-svg-icons"
import {Row, Col} from "antd"

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
const AboutMeGame = () => {

    const renderSkills = () => {
        return cv_content.map(single => {
            return(
                <div key={keyGenerator()} className="skills_game">
                    <p className="skill_key">{single.time}</p>
                    <p className="skill_value">{single.text}</p>

                </div>
            )
        })
    }

    const skills = () => {
        return(
            <div className="content_aboutme">
                <h2 className="heading_game">
                    <FontAwesomeIcon icon={faUserGraduate} className="icon_game"/>
                    Werdegang
                </h2>
                {renderSkills()}
            </div>
        )
    }

    const privat = () => {
        return(
            <div className="content_aboutme">
                <h2 className="heading_game">
                    <FontAwesomeIcon icon={faUser} className="icon_game"/>
                    Privat
                </h2>
                
                <div className="privat_game">
                    <p className="game_text">{description}</p>
                    <p className="game_text">{hobbies}</p>
                </div>
            </div>
        )
    }

    return(
        <div>
            <h1 className="heading_game">About Me</h1>

            <Row>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                <div>
                    {skills()}
                    <div className="image_game es"></div>
                </div>
                </Col>

                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                <div>
                    {privat()}
                    <div className="image_game berlin"></div>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default AboutMeGame