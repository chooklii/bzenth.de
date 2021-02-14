import React from "react"
import {Header} from "../Components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub
} from "@fortawesome/free-brands-svg-icons";
import {
    faBus,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons"

class Projects extends React.Component {

    oepnv_project(){
        return(
            <div className="projects-picture-left">

            <div className="project-oepnv-image"></div>
            <div className="project-left-content">
                <div className="project-heading">ÖPNV-Transparenzregister</div>

                <div className="project-description-one">
                    Im Rahmen des Studiums im 7. Semester in einem Gruppenprojekt entscheidend
                    weiterentwickelt und zum 12.11.2019 im Rahmen einer Pressekonferenz veröffentlicht.

                    Die Seite kann von der Bevölkerung genutzt werden, um an einer zentralen Stelle
                    z.B. gefahrene Buskilometer oder damit verbundene Kosten abzufragen
                </div>
                <div className="project-description-two">
                    Presseartikel und weitere Informationen zum Projekt:
                    <a className="project-press-link" target="_blank" href="https://background.tagesspiegel.de/mobilitaet/oepnv-transparenzregister-geht-online">Background Tagesspiegel</a>
                    <a className="project-press-link" target="_blank" href="https://www.busnetz.de/oepnv-transparenzregister-geht-online/">Busnetz</a>
                </div>

                <div className="project-description-three">
                    Personliches Aufgabengebiet: Komplettes Backend, welches die Datenabfragen auswertet und die entsprechenden Daten liefert.
                </div>

                <div className="project-link">
                <a target="_blank" href="https://www.oepnv-transparenzregister.de/" className="project-link"><FontAwesomeIcon icon={faBus}/> Link zur Internetseite</a>
                </div>
            </div>

        </div>
        )
    }

    hartwork_project(){
        return(
            <div className="projects-picture-right">
            <div className="project-right-content">
            <div className="project-heading">#HARTWORK</div>
            <div className="project-description-one">
                    Coming soon
                </div>
            </div>
            <div className="project-hartwork-image"></div>
            </div>
        )
    }

    bzenth_project(){
        return(
            <div className="projects-picture-right">
            <div className="project-right-content">
            <div className="project-heading">Diese Internetseite</div>
            <div className="project-description-one">
                Aktuell angezeigte Internetseite über meine Person.
                    Mit dem Javascript Framework React.js entwickelt und durch Webpack gebundelt. Dabei wurde bewusst keine Design-Bibiothek wie z.B. antd oder material-ui verwendet.
                </div>
                <div className="project-description-two">
                    Die Seite wird über Github Pages gehostet.
                </div>
                <div className="project-description-three">
                    Der Source Code der Seite ist bei Interesse öffentlich auf meinem GitHub Account einsehbar.
                </div>
                <div className="project-link">
                <a target="_blank" href="https://github.com/chooklii/bzenth.de" className="project-link"><FontAwesomeIcon icon={faGithub}/> Link zu GitHub</a>
                </div>
            </div>
            <div className="project-bzenth-image"></div>
            </div>
        )
    }

    gradulator_project(){
        return(
            <div className="projects-picture-left">

            <div className="project-gradulator-image"></div>
            <div className="project-left-content">
                <div className="project-heading">Gradulator</div>

                <div className="project-description-one">
                    In vielen Studiengängen der Hochschule Heilbronn herrscht Unklarheit darüber, wie der eigene Notenschnitt berechnet wird. Die 
                    Prüfungsordnung ist komplex und unverständlich, eine händische Berechnung aufwendig und Fehleranfällig. <br/>
                    Kein Problem mit dem Gradulator. Über einen simplen Upload des eigenen Notenspiegels kann der Durchschnitt innerhalb von einer Minute berechnet werden. 
                    Dabei wird der Datenschutz großgeschrieben, das PDF wird im eigenen Browserfenster ausgelesen. <br/>
                    Noch nicht alle Noten? Kein Problem! Entweder kann eine Schätzung eingegeben werden und der Gradulator zeigt entsprechend eine best- oder schlechtestmögliche
                    Note an, oder die Note kann komplett weggelassen werden.
                </div>

                <div className="project-link">
                <a target="_blank" href="https://www.gradulator.de" className="project-link"><FontAwesomeIcon icon={faGraduationCap}/> Link zur Internetseite</a>
                </div>
            </div>

        </div>
        )
    }

    render(){

        return(
            <div>
                <Header/>

                <div className="projects-box">
                    <div className="projects-heading">
                        Referenzen:
                    </div>
                    <div className="projects-heading-underline">
                        Auswahl bisher realisierter Projekte
                    </div>

                    <div className="projects">
                    {this.oepnv_project()}
                    {this.bzenth_project()}
                    {this.gradulator_project()}
                    </div>

                </div>
            </div>
        )
    }
}

export default Projects