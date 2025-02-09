import React, {useContext } from "react";
import { Footer, Header } from "../Components";
import {
  faLanguage,
  faLaptopCode,
  faServer,
  faGraduationCap,
  faDatabase,
  faCrop
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rate, Col, Row } from "antd";
import { TranslationContext } from "../helper";

const programmingLanguages = [
  {name: "Java", rating: 5},
  {name: "Javascript", rating: 4},
  {name: "Typescript", rating: 3},
  {name: "Python", rating: 3},
  {name: "Rust", rating: 3},
  {name: "Scala", rating: 2}
]

const frameworks = [
  {name: "React", rating: 4},
  {name: "Dropwizard", rating: 4},
  {name: "Express", rating: 3},
  {name: "Django", rating: 2},
  {name: "Flask", rating: 2},
  {name: "Spring Boot", rating: 2}
]

const databases = [
  {name: "MySQL", rating: 5},
  {name: "Redis", rating: 3},
  {name: "ArangoDB", rating: 2},
  {name: "Grakn", rating: 2}
]

const technologies = [
  {name: "Sentry", rating: 5},
  {name: "Apache Kafka", rating: 4},
  {name: "HTML", rating: 4},
  {name: "JUnit", rating: 4},
  {name: "Splunk",rating: 4},
  {name: "Pytest", rating: 3},
  {name: "CSS", rating: 3},
  {name: "Webpack", rating: 3},
  {name: "Redux", rating: 2},
  {name: "Kubernetes", rating: 2},
  {name: "Docker", rating: 2},
  {name: "Contentful", rating: 2}
]

const other = [
  {name: "Git/Gitflow",rating: 5},
  {name: "Scrum",rating: 5},
  {name: "Jira/Bamboo",rating: 4},
  {name: "Data Science",rating: 3},
  {name: "Unit Tests",rating: 3},
  {name: "SEO",rating: 3}
]

const languages = [
  {name: "Deutsch", rating: 5},
  {name: "Englisch", rating: 5},
  {name: "Portugisisch", rating: 2}
]



const Skills = (props) => {
  const { getText } = useContext(TranslationContext);

  const renderSingleSkill = (name, rating) => {
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    return (
      <div key={name} className="single-skill">
        <p className="skill-name">{name}</p>
        {!isIE11 && (
          <Rate
            className="rating-element"
            disabled
            defaultValue={rating}
            size="small"
            readOnly
          />
        )}
        {isIE11 && <div>{rating} / 5</div>}
      </div>
    );
  };

  return (
    <div>
      {!props.game && <Header />}
      <Row className="page_classic">
        <Col xl={8} xxl={8} lg={12} md={24} sm={24} xs={24}>
          <h2 className="skills-heading">
            <FontAwesomeIcon icon={faLaptopCode} />{" "}
            {getText("skills.programming")}:
          </h2>
          <div className="skills-one-category">
            {programmingLanguages
              .map((single) => renderSingleSkill(single.name, single.rating))}
          </div>
        </Col>
        
        <Col xl={8} xxl={8} lg={12} md={24} sm={24} xs={24}>
          <h2 className="skills-heading">
            <FontAwesomeIcon icon={faCrop} />{" "}
            {getText("skills.frameworks")}:
          </h2>
          <div className="skills-one-category">
            {frameworks
              .map((single) => renderSingleSkill(single.name, single.rating))}
          </div>
        </Col>


        <Col xl={8} xxl={8} lg={12} md={24} sm={24} xs={24}>
          <h2 className="skills-heading">
            <FontAwesomeIcon icon={faDatabase} />{" "}
            {getText("skills.databases")}:
          </h2>
          <div className="skills-one-category">
            {databases
              .map((single) => renderSingleSkill(single.name, single.rating))}
          </div>
        </Col>

        <Col xl={8} xxl={8} lg={12} md={24} sm={24} xs={24}>
          <h2 className="skills-heading">
            <FontAwesomeIcon icon={faServer} />{" "}
            {getText("skills.technology")}:
          </h2>
          <div className="skills-one-category">
            {technologies
              .map((single) => renderSingleSkill(single.name, single.rating))}
          </div>
        </Col>

        <Col xl={8} xxl={8} lg={12} md={24} sm={24} xs={24}>
          <h2 className="skills-heading">
            <FontAwesomeIcon icon={faGraduationCap} />{" "}
            {getText("skills.other")}:
          </h2>
          <div className="skills-one-category">
            {other
              .map((single) => renderSingleSkill(single.name, single.rating))}
          </div>
        </Col>

        <Col xl={8} xxl={8} lg={12} md={24} sm={24} xs={24}>
          <h2 className="skills-heading">
            <FontAwesomeIcon icon={faLanguage} />{" "}
            {getText("skills.language")}:
          </h2>
          <div className="skills-one-category">
            {languages
              .map((single) => renderSingleSkill(single.name, single.rating))}
          </div>
        </Col>
      </Row>
      {!props.game && <Footer />}
    </div>
  );
};

export default Skills;
