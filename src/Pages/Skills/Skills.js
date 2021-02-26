import React from "react";
import {Header} from "../../Components"
import {
  faLanguage,
  faLaptopCode,
  faServer,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@material-ui/lab/Rating";
import {languages, technologySkills, otherSkills, programmingLanguage} from "./content"
class Skills extends React.Component {
  renderSingleSkill(name, rating) {
    const isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    
    return (
      <div key={name} className="single-skill">
        <div className="skill-name">{name}</div>
        {!isIE11 && <Rating
          className="rating-element"
          name="read-only"
          value={rating}
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

        <div className="skills">
          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLaptopCode} /> Programmiersprachen:
            </h2>
            <div className="skills-one-category">
              {programmingLanguage.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </div>

          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faServer} /> weitere Technologien:
            </h2>
            <div className="skills-one-category">
              {technologySkills.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </div>

          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faGraduationCap} /> sonstige Skills:
            </h2>
            <div className="skills-one-category">
              {otherSkills.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </div>

          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLanguage} /> Sprachen:
            </h2>
            <div className="skills-one-category">
              {languages.map((single) =>
                this.renderSingleSkill(single.name, single.rating)
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
