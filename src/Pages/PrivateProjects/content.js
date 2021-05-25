const description = "Unter Privaten Projekten werden solche Entwicklungsprojekte verstanden, welche nicht frei über das Internet erreichbar sind, sondern ausschließlich über ein öffentliches GitHub Repository einseh und downloadbar sind. Typischerweise entsteht ein solches Projekt aus einem Problem oder einer Unannehmlichkeit aus meinem Alltag, weswegen alle folgend dargestellten Projekte zusammen mit derren ursprünglichen Problemen beschrieben sind"

const storagableProblemOne = "Problem: Als iPhone Besitzer ist das Speichern und Absichern von Fotos auf eigenen Festplatten komplex, nicht lohnenswert für einzelne Bilder und kann nicht spontan durchgeführt werden"
const storagableSolutionOne = "Lösung: Entwicklung einer Anwendung, welche im lokalen Netzwerk läuft und über deren UI Fotos vom Smartphone hochgeladen und automatisiert auf der Festplatte gespeichert werden können."

const storagableProblemTwo = "Problem: Wenn auf einzelne ältere Fotos / Dateien zurückgegriffen werden will müssen diese über die Festplatte am Computer aufgerufen werden und können nicht 'auf die schnelle' am Smartphone abgerufen werden."
const storagableSolutionTwo = "Lösung: Erweiterung der Anwendung, sodass nicht nur Fotos hochgeladen, sondern sämtliche auf der Festplatte vorhandenen Fotos und Dateien über diese abgerufen, angezeigt und runtergeladen werden können."

const storagableProblemThree = "Problem: Die Fotos werden so auch nur an einer Stelle gespeichert"
const storagableSolutionThree = "Lösung: Doppelte Backups durchführen. Upload auf einen FTP-Server im lokalen Netzwerk."

const mealtrackerProblemOne = "Problem: Fehlende Inspiration, um ein Essen zu finden, welches an diesem Tag oder zu einem beliebigen Zeitpunkt gekocht werden soll. Tendenz dazu einzelne Essen häufiger zu kochen, als andere"
const mealtrackerSolutionOne = "Lösung: Webanwendung, welche über das Smartphone aufgerufen werden kann. Es wird das gekochte Essen eingetragen und die Anwendung gibt Empfehlungen für Essen, welche zuletzt vor längerer Zeit gekocht wurden. Dabei wird saisional nicht passendes Essen ignoriert."

const storagable = [
    {
    problem: storagableProblemOne,
    solution: storagableSolutionOne
    },
    {
    problem: storagableProblemTwo,
    solution: storagableSolutionTwo
    },
    {
    problem: storagableProblemThree,
    solution: storagableSolutionThree
    }
]

const mealtracker = [
    {
        problem: mealtrackerProblemOne,
        solution: mealtrackerSolutionOne
    }]

export {
    description,
    storagable,
    mealtracker
}