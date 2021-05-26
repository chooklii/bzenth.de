import React from "react"
import { Footer, Header } from "../../Components"
import { cv_content, description, hobbies } from "./content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUser
} from "@fortawesome/free-solid-svg-icons"
import { Row, Col, Steps } from "antd"


const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
class AboutMe extends React.Component {

    create_steps(cv_content) {
        return cv_content.map(single => {
            return (
                <Steps.Step key={keyGenerator()} title={single.time} description={single.text} />
            )
        })
    }

    renderSkills() {
        return (
            <div className="content_aboutme">
                <h2 className="heading_classic">
                    <FontAwesomeIcon icon={faUserGraduate} className="icon" />
                Werdegang
            </h2>
                <Steps progressDot current={7} direction="vertical">
                    {this.create_steps(cv_content)}
                </Steps>
            </div>
        )

    }

    renderPrivate() {
        return (
            <div className="content_aboutme">
                <h2 className="heading_classic">
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    Privat
                </h2>

                <div className="privat">
                    <p className="classic_text">{description}</p>
                    <p className="classic_text">{hobbies}</p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header />
                <div className="page_classic">

                    <Row>
                        <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                            <div>
                                {this.renderSkills()}
                                <div className="image_classic es"></div>
                            </div>
                        </Col>

                        <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                            <div>
                                {this.renderPrivate()}
                                <div className="image_classic berlin"></div>
                            </div>
                        </Col>
                    </Row>

                </div>
                <Footer />
            </div>
        )
    }
}

export default AboutMe