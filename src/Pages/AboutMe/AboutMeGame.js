import React from "react"
import {cv_content, description, hobbies, certificates, publication} from "./content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUser,
    faJournalWhills,
    faMicroscope,
    faCertificate,
  } from "@fortawesome/free-solid-svg-icons";
import {Row, Col, List} from "antd"

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

    const publications = () => {
        return (
          <div className="content_aboutme_short">
            <h2 className="heading_game">
              <FontAwesomeIcon icon={faMicroscope} className="icon" />
              Wissenschaftliche Publikationen
            </h2>
            <List
              itemLayout="horizontal"
              dataSource={publication}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<FontAwesomeIcon icon={faJournalWhills} size={"2x"} />}
                    title={item.name}
                    description={item.authors + " - " + item.conference}
                  />
                </List.Item>
              )}
            ></List>
          </div>
        );
      }
    
    const renderCertificate = () => {
        return (
          <div className="content_aboutme_short">
            <h2 className="heading_game">
              <FontAwesomeIcon icon={faCertificate} className="icon" />
              Zertifikate
            </h2>
            <List
              itemLayout="horizontal"
              dataSource={certificates}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<FontAwesomeIcon icon={item.icon} size={"2x"} />}
                    title={item.name}
                    description={<p><a className="link-certificate" target="_blank" href={item.link}>Verifikationslink</a>{item.id && "  ID: "}{item.id} </p>}
                  />
                </List.Item>
              )}
            ></List>
          </div>
        );
      }

    return(
        <div>
            <h1 className="heading_game">About Me</h1>

            <Row>
                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                <div>
                    {skills()}
                    {publications()}
                </div>
                </Col>

                <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
                <div>
                    {privat()}
                    {renderCertificate()}
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default AboutMeGame