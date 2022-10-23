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

const description = "Ich bin ein 25-jähriger aus dem Raum Öhringen und aktuell als Softwareingenieur bei Bechtle in Neckarsulm angestellt. Zuvor habe ich an der HHN meinen Bachelor und Master abgeschlossen. In diesem Studium hatte ich meine ersten Kontakte mit der Entwicklung, welche ich seitdem durch Praxissemester, Werkstudententätigkeit, Vollanstellung und private Projekte breitgefächert vertieft habe."
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
    },
    {
        name: "Modelling and simulating the scalability of e-commerce web application architectures",
        authors: "Benjamin Zenth",
        conference: "Masterarbeit",
        link: "https://opus-hshn.bsz-bw.de/frontdoor/index/index/searchtype/latest/docId/206/start/0/rows/10"
    },
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
        link: "https://www.credly.com/badges/494363a8-f79c-4e22-a74d-7cdc072ce01d/public_url",
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