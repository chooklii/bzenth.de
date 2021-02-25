import React from "react"
import {Header} from "../../Components"
import {cv_content, description, hobbies} from "./content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUser
} from "@fortawesome/free-solid-svg-icons"

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
class AboutMe extends React.Component {

    create_cv_element(time, text) {
        return (
            <div key={keyGenerator()} className="private-single-cv">
                <div className="cv-time">{time}</div>
                <div className="cv-text">{text}</div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Header/>

                <div className="private-content">

                    <div className="private-history">
                        <h2 className="private-cv-title"><FontAwesomeIcon icon={faUserGraduate} />Werdegang</h2>
                        <div className="private-cv">
                            {cv_content.map(single => this.create_cv_element(single.time, single.text))}

                        </div>
                    </div>

                    <div className="private-hobbys">
                        <h2 className="private-private-title"><FontAwesomeIcon icon={faUser} />Privat</h2>
                        <div className="private-private">
                        {description}
                            <br></br>
                        {hobbies}
                        </div>
                        <figure className="private-image">
                            <div className="private-image-berlin"></div>
                            <figcaption>Berlin Marathon 2019 </figcaption>
                        </figure>


                    </div>

                </div>

            </div>
        )
    }
}

export default AboutMe