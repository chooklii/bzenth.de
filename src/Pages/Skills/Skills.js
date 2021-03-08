import React from "react";
import {Footer, Header} from "../../Components"
import {
  faLanguage,
  faLaptopCode,
  faServer,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Rate, Col, Row} from "antd"
import {languages, technologySkills, otherSkills, programmingLanguage} from "./content"
class Skills extends React.Component {

  renderSingleSkill(name, rating) {
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    
    return (
      <div key={name} className="single-skill">
        <p className="skill-name">{name}</p>
        {!isIE11 && <Rate
          className="rating-element"
          disabled
          defaultValue={rating}
          size="small"
          readOnly
        />
        }
        {isIE11 &&
          <div>
            {rating} / 5
          </div>
        }
      </div>
    );
  }

  render() {


    return (
      <div>
        <Header />
        <Row className="page_classic">          
        <Col  xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLaptopCode} /> Programmiersprachen:
            </h2>
            <div className="skills-one-category">
              {programmingLanguage.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </Col>

          <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faServer} /> weitere Technologien:
            </h2>
            <div className="skills-one-category">
              {technologySkills.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
            </Col>

            <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faGraduationCap} /> sonstige Skills:
            </h2>
            <div className="skills-one-category">
              {otherSkills.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </Col>

          <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLanguage} /> Sprachen:
            </h2>
            <div className="skills-one-category">
              {languages.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </Col>
        </Row>
        <Footer/>
      </div>
    );
  }
}

export default Skills;
