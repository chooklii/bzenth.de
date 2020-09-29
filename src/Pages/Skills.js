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
              <div className="single-skill">
                <div className="skill-name">React</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Java</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Scala</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Javascript</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Python</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faServer} /> weitere Technologien:
            </h2>
            <div className="skills-one-category">
              <div className="single-skill">
                <div className="skill-name">MySQL</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={5}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">HTML</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={5}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">CSS</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Webpack</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={3}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Express</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={3}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Dropwizard</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={2}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Wordpress</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={2}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Kafka</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={2}
                  size="small"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faGraduationCap} /> sonstige Skills:
            </h2>
            <div className="skills-one-category">
              <div className="single-skill">
                <div className="skill-name">Scurm</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={5}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Git / Git Flow</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">SEO</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={3}
                  size="small"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="skills-heading">
              <FontAwesomeIcon icon={faLanguage} /> Sprachen:
            </h2>
            <div className="skills-one-category">
              <div className="single-skill">
                <div className="skill-name">Deutsch (Muttersprache)</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={5}
                  size="small"
                  readOnly
                />
              </div>
              <div className="single-skill">
                <div className="skill-name">Englisch</div>
                <Rating
                  className="rating-element"
                  name="read-only"
                  value={4}
                  size="small"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
