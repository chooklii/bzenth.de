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
    restart: "Neu Starten",
    start: "Level starten",
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
        anschließend erneut. Eine Unterstützung für kleinere Bildschirme und
        Smartphones folgt in einer zukünftigen Version.`,
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
        page again. Support for smaller screens and smartphones
        smartphones will follow in a future version.`,
  },
};

const minHeight = 650;
const minWidth = 1250;

export {
  itemsToUnlock,
  minHeight,
  minWidth,
  sawTexts,
  spikeTexts,
  rockheadTexts,
  translation,
};
