import React, {useEffect, useState, useContext} from "react";
import {Footer, Header} from "../Components"
import {
  faLanguage,
  faLaptopCode,
  faServer,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Rate, Col, Row} from "antd"
import {skillsHeadings, TranslationContext} from "../helper"

const Skills = (props) => {

  const [skills, setSkills] = useState(null)
  const {language, getData} = useContext(TranslationContext)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getData("skills")
        if(data){
          setSkills(data.map(x => x.fields).sort(function(a, b) {
            return b.raiting - a.raiting
          })) 
        }
      }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
      }
    }
    fetchData()

  }, [language])

  const renderSingleSkill = (name, rating) => {
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

  if(!skills){
    return(
      <div>
      {!props.game && <Header/>}
      </div>
    )
  }
    return (
      <div>
      {!props.game && <Header/>}
        <Row className="page_classic">          
        <Col  xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLaptopCode} /> {skillsHeadings[language].programming}:
            </h2>
            <div className="skills-one-category">
              {skills.filter(x => x.group=="programming").map((single) =>
                renderSingleSkill(single.name, single.raiting)
              )}
            </div>
          </Col>

          <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faServer} /> {skillsHeadings[language].technology}:
            </h2>
            <div className="skills-one-category">
              {skills.filter(x => x.group=="technology").map((single) =>
                renderSingleSkill(single.name, single.raiting)
              )}
            </div>
            </Col>

            <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faGraduationCap} /> {skillsHeadings[language].other}:
            </h2>
            <div className="skills-one-category">
              {skills.filter(x => x.group=="other").map((single) =>
                renderSingleSkill(single.name, single.raiting)
              )}
            </div>
          </Col>

          <Col xl={12} xxl={12} lg={12} md={24} sm={24} xs={24}>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLanguage} /> {skillsHeadings[language].language}:
            </h2>
            <div className="skills-one-category">
              {skills.filter(x => x.group=="language").map((single) =>
                renderSingleSkill(single.name, single.raiting)
              )}
            </div>
          </Col>
        </Row>
        {!props.game && <Footer/>}
      </div>
    );
}

export default Skills;
