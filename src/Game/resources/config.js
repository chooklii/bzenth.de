const itemsToUnlock = {
  de: {
    1: "Über mich",
    2: "Credits",
    3: "Skills",
    6: "Projekte",
    8: "Kontakt",
  },
  en: {
    1: "About Me",
    2: "Credits",
    3: "Skills",
    6: "Projects",
    8: "Contact",
  },
};

const sawTexts = {
  de: [
    "Durch Säge zweigeteilt",
    "Sicherheitsabstand nicht eingehalten",
    "Zersägt",
  ],
  en: [
    "Broken in half",
    "Split in two by saw",
    "Safety distance not maintained",
  ],
};

const spikeTexts = {
  de: [
    "Aufgespießt und serviert",
    "Aufpassen vor spitzen Gegenständen!",
    "Schrumpfkopfsammlung erweitert",
  ],
  en: [
    "Impaled and served",
    "Beware of sharp objects!",
    "Shrunken head collection expanded",
  ],
};

const rockheadTexts = {
  de: [
    "Vom Stein begraben",
    "Vom Stein erschlagen",
    "Nicht nach oben geschaut",
  ],
  en: ["Buried by the stone", "Struck by the stone", "Not looked up"],
};

const minHeight = 650;
const minWidth = 1250;


const translation = {
  de: {
    reset: "Fortschritt zurücksetzen",
    backMenu: "Zurück zur Startseite",
    back: "Zurück",
    name: "Arcade-Modus",
    explaination:
      "Beende Level um einzelne Seiten freizuschalten. Erreiche mit deiner Spielfigur den Pokal, um ein Level anzuschließen.",
    controlls: "Bewegung",
    arrow: "Pfeiltasten",
    jump: "Springen",
    space: "Leertaste",
    record: "Stelle persönliche Bestzeiten für jedes Level auf oder beende alle Level mit möglichst wenig Toden!",
    screenSize: "Level unterscheiden sich minimal jenach Bildschirmgröße (s,m,l,xl), weswegen die Info mit der Bestzeit angezeigt wird",
    toolTipRecord: "Bisherige Bestzeit, die Bildschirmgröße der Bestzeit und die Anzahl der Tode in diesem Level",
    restart: "Neu Starten",
    start: "Spielen",
    mainMenu: "Hauptmenü",
    restartText: "R zum Neustarten oder hick klicken",
    screenToSmall: "Bildschirm zu klein",
    startNotUnlocked: "Beende das vorherige Level, um dieses zu spielen.",
    startUnlocked: "Klicke hier, um das Level zu starten",
    pageNotUnlocked: "Beende dieses Level, um diese Seite anzuzeigen.",
    pageUnlocked: "Klicke hier, um diese Seite anzuzeigen",
    screenToSmallText: `Der genutzte Bildschirm ist leider zu klein, um den Arcade-Modus
        optimal zu nutzen. Bitte nutze einen Bildschirm, der breiter 
        als ${minWidth}px und höher als ${minHeight}px ist und besuche die Seite
        anschließend erneut.`,
    finish: `Glückwunsch - Level erfolgreich beendet!`,
    finish_time: "Der Lauf dauerte: ",
    finish_deaths: "Gesamtzahl Tode: ",
    finish_screen:  "Bildschirmgröße: ",
    finish_menu: "Zum Hauptmenü",
    finish_replay: "Erneut spielen",
    finish_record: "Thats a new Record!",
    finish_oldRecord: "Die bisherige Rekordzeit war: ",
    finish_newRecord_faster_01: "Die neue Bestzeit ist ",
    finish_newRecord_faster_02: " schneller",
    finish_oldRecord_screen: "Die Bildschirmgröße der alten Bestzeit war:",
    finish_best_time: "Die Bestzeit ist",
    finish_best_time_screen: "Die Bildschirmgröße der alten Bestzeit ist:",
    wasKilled: "Gestorben!",
    changeLevelPage: "Seite der Level ändern",
    nextPage: "Nächste Seite",
    lastPage: "Letzte Seite"
  },
  en: {
    reset: "Reset",
    backMenu: "GO back to Home",
    name: "Arcade-Mode",
    explaination:
      "Finish Level to unlock single pages. Reach the cup to finish a level.",
    controlls: "Controlls",
    arrow: "Arrow keys",
    jump: "Jump",
    space: "Space",
    restart: "Restart",
    record: "Set record times for each level and finish all level with the least amount of deaths!",
    screenSize: "Levels differ on different screen Sizes (s, m, l, xl) thus the information is provided with the record",
    toolTipRecord: "Current Record, Screen Size of the Record and total amount of deaths within this level",
    back: "Back",
    start: "Start level",
    mainMenu: "Main Menu",
    restartText: "R to restart or click here",
    screenToSmall: "Screen to small",
    startNotUnlocked: "Finish the prior level before playing this.",
    pageNotUnlocked: "Finish this level to display this page",
    pageUnlocked: "Click here to show the page",
    startUnlocked: "Click here to start the level",
    screenToSmallText: `Unfortunately, the screen used is too small to make the best use of the arcade mode.
        to use the arcade mode optimally. Please use a screen that is wider 
        than ${minWidth}px and higher than ${minHeight}px and then visit the page
        page again.`,
    finish: `Congrats - You finished the level!`,
    finish_time: "Your run took: ",
    finish_deaths: "Total Deaths: ",
    finish_screen:  "Screen Size: ",
    finish_menu: "Main Menu",
    finish_replay: "Play again",
    finish_record: "Thats a new Record!",
    finish_oldRecord: "The old record was: ",
    finish_newRecord_faster_01: `The new record is `,
    finish_newRecord_faster_02: "faster",
    finish_oldRecord_screen: "The Screen Size of the old record was: ",
    finish_best_time: "The record is: ",
    finish_best_time_screen: "The Screen Size of the record is: ",
    wasKilled: "Dead!",
    changeLevelPage: "Change current Site of Levels",
    nextPage: "Next Page",
    lastPage: "Last Page"
  },
};

export {
  itemsToUnlock,
  minHeight,
  minWidth,
  sawTexts,
  spikeTexts,
  rockheadTexts,
  translation,
};
