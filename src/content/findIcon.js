import { faGoogle, faGitlab, faNpm } from "@fortawesome/free-brands-svg-icons";
import {
  faUserGraduate,
  faUser,
  faJournalWhills,
  faMicroscope,
  faCertificate,
  faChild,
  faUserCircle,
  faGraduationCap,
  faBus,
  faDumbbell,
  faWifi
} from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle, faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faHouseUser, faRunning, faGamepad } from "@fortawesome/free-solid-svg-icons";
export const findIcon = (key) => {
  switch (key) {
    case "faGoogle":
      return faGoogle;
    case "faGitLab":
      return faGitlab;
    case "faUserGraduate":
      return faUserGraduate;
    case "faUser":
      return faUser;
    case "faJournalWhills":
      return faJournalWhills;
    case "faMicroscope":
      return faMicroscope;
    case "faCertificate":
      return faCertificate;
    case "faChild":
      return faChild;
    case "faHouse":
      return faHouseUser;
    case "faRunning":
      return faRunning;
    case "faGamepad":
      return faGamepad;
    case "faAddressBook":
      return faAddressBook;
    case "faUser":
    return faUser
    case "faGraduationCap": 
    return faGraduationCap
    case "faBus":
    return faBus
    case "faDumbbell":
    return faDumbbell
    case "faWifi": 
    return faWifi
    case "faNpm":
      return faNpm
    default:
      return faXmarkCircle;
  }
};
