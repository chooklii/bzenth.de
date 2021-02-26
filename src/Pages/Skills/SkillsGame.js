import React from "react"
import {
    faLanguage,
    faLaptopCode,
    faServer,
    faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { languages, technologySkills, otherSkills, programmingLanguage } from "./content"
import { Rate, Row, Col } from "antd"

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
const SkillsGame = () => {

    const singleSkill = (name, rating) => {
        return (
            <div className="single_skill_box" key={keyGenerator()}>
                <p className="skill_key">{name}</p>
                <Rate disabled defaultValue={rating} />
            </div>
        )
    }

    return (
        <div>
        <h1 className="heading_game">Skills</h1>
        <Row>
            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <h2 className="heading_game">
                <FontAwesomeIcon icon={faLaptopCode} className="icon_game" />
                    Programmiersprachen
            </h2>
            {programmingLanguage.map(_ => singleSkill(_.name, _.rating))}
            </Col>

            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <h2 className="heading_game">
                <FontAwesomeIcon icon={faServer} className="icon_game" />
                    weitere Technologien
            </h2>
            {technologySkills.map(_ => singleSkill(_.name, _.rating))}
            </Col>

            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <h2 className="heading_game">
                <FontAwesomeIcon icon={faGraduationCap} className="icon_game" />
                    sonstige Skills
            </h2>
            {otherSkills.map(_ => singleSkill(_.name, _.rating))}
            </Col>

            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <h2 className="heading_game">
                <FontAwesomeIcon icon={faLanguage} className="icon_game" />
                    Sprachen
            </h2>
            {languages.map(_ => singleSkill(_.name, _.rating))}
            </Col>
        </Row>
        </div>
    )
}

export default SkillsGame