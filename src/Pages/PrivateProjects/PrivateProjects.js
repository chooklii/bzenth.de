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
import { Footer, Header } from "../../Components";
const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
const PrivateProjects = () => {

    const bodyProject = (description) => {
        return (
            <div>
                <div>
                    {description.map(_ => {
                        return (
                            <div key={keyGenerator()}>
                                <p className="classic_text bold">
                                    {_.problem}
                                </p>
                                <p className="classic_text">
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
            <Header/>
            <div className="page_classic">
            <p className="classic_text padding">{description}</p>
            <Divider/>
            <Row className="projects-box" >
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faArchive} className="icon" />
                            Storagable
                        </h2>
                        <div className="storagable" />
                        {bodyProject(storagable)}
                    </div>
                    {buttonProject("https://github.com/chooklii/storagable")}
                </Col>
                <Divider className="mobile_divider"/>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faCookieBite} className="icon" />
                            Mealtracker
                        </h2>
                        <div className="mealtracker" />
                        {bodyProject(mealtracker)}
                    </div>
                    {buttonProject("https://github.com/chooklii/mealTracker")}
                </Col>
                <Divider />
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faGamepad} className="icon" />
                            Bootlii
                        </h2>
                        <div className="bootlii" />
                        <p className="classic_text">{bootlii}</p>
                    </div>
                    {buttonProject("https://github.com/chooklii/Bootlii")}
                </Col>
                <Divider className="mobile_divider"/>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faBrain} className="icon" />
                            Big Brain
                        </h2>
                        <div className="bigbrain" />
                        {bodyProject(bigBrain)}
                    </div>
                    {buttonProject("https://github.com/chooklii/BigBrain")}
                </Col>
            </Row>
            </div>
            <Footer/>
        </div>
    )
}

export default PrivateProjects