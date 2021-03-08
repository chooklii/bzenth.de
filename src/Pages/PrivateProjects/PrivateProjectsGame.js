import React from "react"
import { description, storagable, mealtracker, bootlii, bigBrain } from "./content"
import { Row, Col, Button, Divider } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArchive,
    faCookieBite,
    faGamepad,
    faBrain
} from "@fortawesome/free-solid-svg-icons"
const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
const PrivateProjectsGame = () => {

    const bodyProject = (description) => {
        return (
            <div>
                <div>
                    {description.map(_ => {
                        return (
                            <div key={keyGenerator()}>
                                <p className="game_text bold">
                                    {_.problem}
                                </p>
                                <p className="game_text">
                                    {_.solution}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const buttonProject = (link) => {
        return (
            <div className="design_buttons private_projects">
                <Button type="primary" onClick={() => window.open(link, '_blank')}>Zum Projekt</Button>
            </div>
        )
    }

    return (
        <div>
            <h1 className="heading_game">Private Projekte</h1>
            <p className="game_text">
                {description}
            </p>
            <Row>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faArchive} className="icon_game" />
                            Storagable
                        </h2>
                        <div className="storagable" />
                        {bodyProject(storagable)}
                    </div>
                    {buttonProject("https://github.com/chooklii/storagable")}
                </Col>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faCookieBite} className="icon_game" />
                            Mealtracker
                        </h2>
                        <div className="mealtracker" />
                        {bodyProject(mealtracker)}
                    </div>
                    {buttonProject("https://github.com/chooklii/mealTracker")}
                </Col>
                <Divider />
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faGamepad} className="icon_game" />
                            Bootlii
                        </h2>
                        <div className="bootlii" />
                        <p className="game_text">{bootlii}</p>
                    </div>
                    {buttonProject("https://github.com/chooklii/Bootlii")}
                </Col>

                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faBrain} className="icon_game" />
                            Big Brain
                        </h2>
                        <div className="bigbrain" />
                        {bodyProject(bigBrain)}
                    </div>
                    {buttonProject("https://github.com/chooklii/BigBrain")}
                </Col>
            </Row>
        </div>
    )
}

export default PrivateProjectsGame