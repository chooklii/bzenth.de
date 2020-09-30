import React from "react"
import {Header} from "../Components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGraduate,
    faUser
} from "@fortawesome/free-solid-svg-icons"

class Private extends React.Component {

    create_cv_element(time, text){
        return(
            <div className="private-single-cv">
            <div className="cv-time">{time}</div>
        <div className="cv-text">{text}</div>
        </div>
        )
    }

    render(){

        const cv_content = [
            {time: "09/2013 - 07/2016", text: "Ausbildung zum Industriekaufmann"},
            {time: "09/2013 - 07/2015", text: "Abendschule Fachhochschulreife"},
            {time: "09/2016 - 03/2020", text: "Studium Wirtschaftsinformatik"},
            {time: "09/2018 - 12/2019", text: "Werksstudent Anwendungsentwickler Bechtle AG"},
            {time: "12/2019 - 03/2020", text: "Bachelorthesis: Selektion und Einführung einer Front-End Error Reporting Anwendung - bei: Bechtle AG"},
            {time: "04/2020 - 09/2020", text: "Vollzeit Anwendungsentwickler Bechtle AG"},
            {time: "09/2020 - heute", text: "Master Wirtschaftsinformatik - Informationsmanagement und Data Science"}
        ]

        return(
            <div>
                <Header/>

                <div className="private-content">

                    <div className="private-history">
                        <h2 className="private-cv-title"><FontAwesomeIcon icon={faUserGraduate}/>  Werdegang</h2>
                        <div className="private-cv">
                            {cv_content.map(single => this.create_cv_element(single.time, single.text))}

                        </div>
                    </div>

                    <div className="private-hobbys">
                        <h2 className="private-private-title"><FontAwesomeIcon icon={faUser}/>  Privat</h2>
                        <div className="private-private">
                            Ich bin ein 23-jähriger aus dem Raum Öhringen und aktuell im 1. Semester meines Masterstudiums an der Hochschule Heilbronn.
                            <br></br>
                            Neben meinem Studium und aktuellen Projekten verbringe ich meine Zeit mit Ausdauersport (5km - Marathon), Büchern, Videospielen und
                            einem allgemeinen Interesse an fast jeder Sportart.
                        </div>
                            <figure className="private-image">
                                <div className="private-image-trollinger"></div>
                                <figcaption>Trollinger Marathon 2018 </figcaption>
                            </figure>


                    </div>

                </div>

            </div>
        )
    }
}

export default Private