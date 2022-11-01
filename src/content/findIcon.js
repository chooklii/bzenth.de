import { faGoogle, faGitlab } from "@fortawesome/free-brands-svg-icons"
import {
    faUserGraduate,
    faUser,
    faJournalWhills,
    faMicroscope,
    faCertificate,
    ,
    faChild,
    faHouse
  } from "@fortawesome/free-solid-svg-icons";

export const findIcon = (key) => {
    switch(key){
        case "faGoogle": return faGoogle
        case "faGitLab": return faGitlab
        case "faUserGraduate": return faUserGraduate
        case "faUser": return faUser
        case "faJournalWhills": return faJournalWhills
        case "faMicroscope": return faMicroscope
        case "faCertificate": return faCertificate
        case "faChild": return faChild
        case "faHouse": return faHouse
        default:
            return faExMark
    }
}