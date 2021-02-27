const description = "Öffentliche Projekte sind solche, welche über eine Domain im Internet verfügbar sind. Folgend sind alle aufgelistet, an welchen ich außerhalb meiner Arbeitstätigkeit beteiligt war."

const desc_bzenth = "Aktuell angezeigte Internetseite über meine Person. Zweigeteilt in einen klassische Internetseite und einen Arcade-Modus, in welchem die einzelnen Seiten über erfolgreich abgeschlossene Jump and Run Level freigeschalten werden."
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


export {
    description,
    bzenth,
    openv,
    gradulator
}