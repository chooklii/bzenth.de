import React from "react"
import {description, bzenth, openv, gradulator, numWordsDe, vodafone, hartwork} from "./content"
import { Row, Col, Button, Divider } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faGraduationCap,
    faBus,
    faWifi,
    faDumbbell
} from "@fortawesome/free-solid-svg-icons"
import { faNpm } from "@fortawesome/free-brands-svg-icons";

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);

const PublicProjectsGame = () => {

    const buttonProject = (links) => {
        return (
            <div className="design_buttons private_projects">
                {links.map(_ => {
                return(
                    <Button key={keyGenerator()} className="button_public_project" type={_.type} onClick={() => window.open(_.link, '_blank')}>{_.name}</Button>
                )})}
            </div>
        )
    }

    return(
        <div>
            <h1 className="heading_game">Öffentliche Projekte</h1>
            <p className="game_text">{description}</p>

            <Row>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faUserCircle} className="icon_game" />
                            bzenth
                        </h2>
                        <div className="bzenth" />
                        <p className="game_text">{bzenth.desc}</p>
                        <p className="game_text">{bzenth.tech}</p>
                    </div>
                    {buttonProject(bzenth.urls)}
                </Col>

                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faGraduationCap} className="icon_game" />
                            Gradulator
                        </h2>
                        <div className="gradulator" />
                        <p className="game_text">{gradulator.desc}</p>
                        <p className="game_text">{gradulator.tech}</p>
                    </div>
                    {buttonProject(gradulator.urls)}
                </Col>
                <Divider/>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faBus} className="icon_game" />
                            ÖPNV-Transparenzregister
                        </h2>
                        <div className="oepnv" />
                        <p className="game_text">{openv.desc}</p>
                        <p className="game_text">{openv.tech}</p>
                    </div>
                    {buttonProject(openv.urls)}
                </Col>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faDumbbell} className="icon_game" />
                            #HARTWORK
                        </h2>
                        <div className="hartwork" />
                        <p className="game_text">{hartwork.desc}</p>
                        <p className="game_text">{hartwork.tech}</p>
                    </div>
                    {buttonProject(hartwork.urls)}
                </Col>
                <Divider/>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faNpm} className="icon_game" />
                            num-words-de
                        </h2>
                        <p className="game_text">{numWordsDe.desc}</p>
                        <p className="game_text">{numWordsDe.tech}</p>
                    </div>
                    {buttonProject(numWordsDe.urls)}
                </Col>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_game">
                        <h2 className="heading_game">
                            <FontAwesomeIcon icon={faWifi} className="icon_game" />
                            Router Restarter
                        </h2>
                        <p className="game_text">{vodafone.desc}</p>
                        <p className="game_text">{vodafone.tech}</p>
                    </div>
                    {buttonProject(vodafone.urls)}
                </Col>
            </Row>
        </div>
    )
}

export default PublicProjectsGame