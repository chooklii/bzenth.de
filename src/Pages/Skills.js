import React from "react";
import { Header } from "../Components";
import {
  faLanguage,
  faLaptopCode,
  faServer,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@material-ui/lab/Rating";

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
    const programmingLanguage = [
      { name: "React", rating: 4 },
      { name: "Java", rating: 4 },
      { name: "Scala", rating: 4 },
      { name: "Javascript", rating: 4 },
      { name: "Python", rating: 4 },
    ];

    const technologySkills = [
      { name: "MySQL", rating: 5 },
      { name: "HTML", rating: 5 },
      { name: "Sentry", rating: 5 },
      { name: "CSS", rating: 4 },
      { name: "Webpack", rating: 3 },
      { name: "Redux", rating: 3 },
      { name: "Flask", rating: 3},
      { name: "Express", rating: 3 },
      { name: "Dropwizard", rating: 2 },
      { name: "Kafka", rating: 2 },
      { name: "Jest", rating: 2 },
      { name: "Wordpress", rating: 1 },
    ];

    const otherSkills = [
      { name: "Scrum", rating: 5 },
      { name: "Git / Git Flow", rating: 4 },
      { name: "SEO", rating: 3 },
    ];

    const languages = [
      { name: "Deutsch", rating: 5 },
      { name: "Englisch", rating: 4 },
    ];

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
