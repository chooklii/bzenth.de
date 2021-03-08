import React from "react"
import {Footer, Header} from "../../Components"
import {description, bzenth, openv, gradulator} from "./content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faGraduationCap,
    faBus
} from "@fortawesome/free-solid-svg-icons"
import {Row, Col, Button, Divider} from "antd"

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);


class PublicProjects extends React.Component {

    renderButton(links){
        return (
            <div className="design_buttons">
                {links.map(_ => {
                return(
                    <Button key={keyGenerator()} className="button_public_project" type={_.type} onClick={() => window.open(_.link, '_blank')}>{_.name}</Button>
                )})}
            </div>
        )
    }
    render(){

        return(
            <div>
                <Header/>
                <div className="projects-box page_classic">
                <p className="classic_text marginleft">{description}</p>
                <Divider/>
                <Row>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faUserCircle} className="icon" />
                            bzenth
                        </h2>
                        <div className="bzenth" />
                        <p className="classic_text">{bzenth.desc}</p>
                        <p className="classic_text">{bzenth.tech}</p>
                    </div>
                    {this.renderButton(bzenth.urls)}
                </Col>
                <Divider className="mobile_divider"/>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faGraduationCap} className="icon" />
                            Gradulator
                        </h2>
                        <div className="gradulator" />
                        <p className="classic_text">{gradulator.desc}</p>
                        <p className="classic_text">{gradulator.tech}</p>
                    </div>
                    {this.renderButton(gradulator.urls)}
                </Col>
                <Divider/>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                    <div className="project_classic">
                        <h2 className="heading_classic">
                            <FontAwesomeIcon icon={faBus} className="icon" />
                            ÖPNV-Transparenzregister
                        </h2>
                        <div className="oepnv" />
                        <p className="classic_text">{openv.desc}</p>
                        <p className="classic_text">{openv.tech}</p>
                    </div>
                    {this.renderButton(openv.urls)}
                </Col>
            </Row>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default PublicProjects