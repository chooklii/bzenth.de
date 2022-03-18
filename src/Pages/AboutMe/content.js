import { faGoogle, faGitlab } from "@fortawesome/free-brands-svg-icons"
const cv_content = [
    {time: "09/2013 - 07/2016", text: "Ausbildung zum Industriekaufmann", active: false},
    {time: "09/2013 - 07/2015", text: "Abendschule Fachhochschulreife", active: false},
    {time: "09/2016 - 03/2020", text: "Studium Wirtschaftsinformatik", active: false},
    {time: "09/2018 - 12/2019", text: "Werksstudent Anwendungsentwickler Bechtle AG", active: false},
    {time: "12/2019 - 03/2020", text: "Bachelorthesis: Selektion und Einführung einer Front-End Error Reporting Anwendung - bei: Bechtle AG", active: false},
    {time: "04/2020 - 09/2020", text: "Vollzeit Softwareingenieur Bechtle AG", active: false},
    {time: "09/2020 - 03/2022", text: "Master Wirtschaftsinformatik - Informationsmanagement und Data Science", active: false},
    {time: "09/2021 - 03/2022", text: "Masterarbeit: Modelling and Simulating the scalability of web application architectures", active: false},
    {time: "04/2022 - ", text: "Softwareingenieur Bechtle AG", active: true},
]

const description = "Ich bin ein 24-jähriger aus dem Raum Öhringen und aktuell im 3. Semester meines Masterstudiums an der Hochschule Heilbronn. Zuvor habe ich an der HHN bereits meinen Bachelor abgeschlossen. In diesem Studium hatte ich meine ersten Kontakte mit der Entwicklung, welche ich seitdem durch Praxissemester, Werkstudententätigkeit, Vollanstellung und private Projekte breitgefächert vertieft habe."
const hobbies = "Privat verbringe ich meine Zeit mit Joggen (Any Surface - Any Distance), Lesen, Privaten Entwicklungsprojekten, Videospielen und einem allgemeinem Interesse an fast jeder Sportart."

const publication = [
    {
        name: "IT-Qualitätsmanagement im Rahmen des Informationsmanagements - Eine State-of-the-Art Betrachtung",
        authors: "Benjamin Zenth und Majeed Malik",
        conference: "SKILL 2021",
        link: "https://dl.gi.de/bitstream/handle/20.500.12116/37781/A2-2.pdf"
    },
    {
        name: "Identifikation und Klassifizierung von Datenarchitekturen",
        authors: "Benjamin Zenth und Helmut Beckmann",
        conference: "17. Internationale Tagung Wirtschaftsinformatik"
    }
]

const certificates = [
    {
        name: "Grundlagen des Onlinemarketings",
        id: "HU6HNCTGM",
        link: "https://learndigital.withgoogle.com/zukunftswerkstatt/validate-certificate-code",
        icon: faGoogle
    },
    {
        name: "Gitlab Certified Associate",
        id: "",
        link: "https://eu.badgr.com/public/assertions/Am9EN643SZ-r9SaA90pssg?identity__email=benjaminzenth@icloud.com",
        icon: faGitlab
    }
]

export{
    cv_content,
    description,
    hobbies,
    publication,
    certificates
}