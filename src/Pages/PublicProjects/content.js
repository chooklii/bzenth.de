const description = "Öffentliche Projekte sind solche, welche über eine Domain im Internet verfügbar sind. Folgend sind alle aufgelistet, an welchen ich außerhalb meiner Arbeitstätigkeit beteiligt war."

const desc_bzenth = "Aktuell angezeigte Internetseite über meine Person. Zweigeteilt in einen klassische Internetseite und einen Arcade-Modus, in welchem die einzelnen Seiten über erfolgreich abgeschlossene Jump and Run Level freigeschalten werden. (Arcade Modus nur auf Bildschirmen größer als 1250px verfügbar)"
const tech_bzenth = "Die Seite ist mit dem Javascript Framework React.js entwickelt und wird durch Webpack gebundelt. Dabei wird durch Code Splitting zwischen den zwei Modi der Seite unterschieden. Gehosted wird die Seite über Github Pages."
const bzenth = {
    desc: desc_bzenth,
    tech: tech_bzenth,
    urls: [{
        link: "https://github.com/chooklii/bzenth.de",
        name: "Source Code",
        type: "normal"
    }]
}

const desc_oepnv = "Im Rahmen einer Projektstudie im 7. Semester meines Bachelors wurde diese Seite von uns entscheidend weiterentwickelt und anschließend zum 12.11.2019 im Rahmen einer Pressekonferenz veröffentlicht. Mittlerweile wurde die Seite von anderen Studentengruppen der Hochschule Heilbronn in Teilen weiterentwickelt. Mein Persönlicher Teilbereich am Projekt war das Backend der Abfrage. Die Seite verfolgt das Ziel, die sämtlichen Gesellschaftsgruppen die tatsächliche Entwicklung des Marktes des ÖPNV sichtbar zu machen."
const tech_openv = "Die Seite ist mit dem Python Framework Flask entwickelt."

const openv = {
    desc: desc_oepnv,
    tech: tech_openv,
    urls: [
    {
        link: "https://www.oepnv-transparenzregister.de/",
        name: "Webseite",
        type: "primary"
    },
    {
        link: "https://background.tagesspiegel.de/mobilitaet/oepnv-transparenzregister-geht-online",
        name: "Pressemitteilung",
        type: "normal"
    }]
}
const desc_gradulator = "In vielen Studiengängen der Hochschule Heilbronn herrscht Unklarheit darüber, wie der eigene Notenschnitt berechnet wird. Die Prüfungsordnung ist komplex und unverständlich, eine händische Berechnung aufwendig und Fehleranfällig. Kein Problem mit dem Gradulator. Über einen simplen Upload des eigenen Notenspiegels kann der Durchschnitt innerhalb von einer Minute berechnet werden. Dabei wird der Datenschutz großgeschrieben, das PDF wird im eigenen Browserfenster ausgelesen. Entwickelt wurde der Gradulator von einem Kommilitone und mir in unserer Vorlesungsfreien Zeit zwischen dem 1. und 2. Semester unseres Masters."
const tech_gradulator = "Die Seite ist mit dem Framework React.js in der Sprache Typescript entwickelt und wird durch Webpack gebundelt. Gehosted wird die Seite über Github Pages."

const gradulator = {
    desc: desc_gradulator,
    tech: tech_gradulator,
    urls: [
        {
            link: "https://gradulator.de/",
            name: "Webseite",
            type: "primary"
        },
        {
            link: "https://github.com/malik-zenth/gradulator",
            name: "Source Code",
            type: "normal"
        }
    ]
}

const desc_hw = "Internetauftritt von #HARTWORK - Physiotherapie und Personaltraining von Madeleine Perner und Stefan Kramer in Neuenstein."
const tech_hw = ""

const hartwork = {
    desc: desc_hw,
    tech: tech_hw,
    urls: [
        {
            link: "https://hart-work.de",
            name: "Webseite",
            type: "primary"
        }
    ]
}

const desc_numwordsde = "Wenn über eine API eine Zahl zurückgegeben wird, welche anschließend in einem Text verwendet werden soll, ist von Vorteil, wenn nicht `1 der folgenden`, sondern `Eine der folgenden` als Text angezeigt wird. Hierfür kann dieses NPM-Paket genutzt werden, welches eine Zahl in das entsprechende Wort der Deutschen Sprache umwandelt. Hierbei werden bis zu 12-Zeichen lange Zahlen, sowie Indefinitivpronomen unterstützt."
const tech_numwordsde = "Das Paket wird über NPM bereitgestellt und unterstützt Typescript."

const numWordsDe = {
    desc: desc_numwordsde,
    tech: tech_numwordsde,
    urls: [
        {
            link: "https://www.npmjs.com/package/num-words-de",
            name: "NPM",
            type: "primary"
        },
        {
            link: "https://github.com/chooklii/num-words-de",
            name: "Source Code",
            type: "normal"
        }
    ]
}

export {
    description,
    bzenth,
    openv,
    gradulator,
    hartwork,
    numWordsDe
}