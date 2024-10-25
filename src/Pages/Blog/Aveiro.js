import React from "react";
import { Footer, Header } from "../../Components";
import { Helmet } from "react-helmet";
import { Avatar, Divider } from "antd";
import { Link } from "react-router-dom";

const Aveiro = () => {
  return (
    <div>
      <Helmet>
        <title>4 Wochen in Aveiro</title>
        <meta
          name="description"
          content="Reisebericht über 4 Wochen in Aveiro, Portugal"
        />
        <meta
          name="keywords"
          content="Aveiro, Reisebericht, Blog, Portugal, Reisetipps"
        />
        <meta property="og:title" content="4 Wochen in Aveiro" />
        <meta
          property="og:description"
          content="Reisebericht über 4 Wochen in Aveiro, Portugal"
        />
      </Helmet>
      <Header />
      <div className="page_classic blog_page">
        <div className="blog_intro">
          <Avatar className="avatar_blog" />
          <p className="blog_whoami">
            Ich, Benjamin hatte die Möglichkeit im September 2024 4 Wochen in
            Aveiro zu arbeiten. In diesem Blogbeitrag/Reisebericht möchte ich
            meine subjektiven Tipps, Tricks, Erfahrungen und Eindrücke, sowie
            erhaltene Empfehlungen von Einwohnern Aveiros mit dir teilen, um dir
            ein Bild zu vermitteln, worauf du dich im 'Venedig Portugals' freuen
            kannst.
            <br />
            Dieser Beitrag wurde im Oktober 2024 geschrieben.
          </p>
        </div>

        <ol className="blog_content" role="list">
          <li>
            <a href="#anreise">
              <span className="title">Anreise</span>
            </a>
          </li>
          <li>
            <a href="#essen">
              <span className="title">Essen</span>
            </a>
          </li>
          <li>
            <a href="#sehenswurdigkeiten">
              <span className="title">Sehenswürdigkeiten in Aveiro</span>
            </a>
            <ul>
              <li>
                <a href="#boote">
                  <span className="title">Moliceiro-Boote</span>
                </a>
              </li>
              <li>
                <a href="#passadicos">
                  <span className="title">Passadiços de Aveiro</span>
                </a>
              </li>
              <li>
                <a href="#scbeiramar">
                  <span className="title">
                    Estádio Municipal de Aveiro - SC Beira-Mar
                  </span>
                </a>
              </li>
              <li>
                <a href="#salt">
                  <span className="title">Salinas de Aveiro</span>
                </a>
              </li>
              <li>
                <a href="#uni">
                  <span className="title">Universität</span>
                </a>
              </li>
              <li>
                <a href="#park">
                  <span className="title">Infante Dom Pedro City Park</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#costanova">
              <span className="title">Costa Nova</span>
            </a>
            <ul>
              <li>
                <a href="#tocostanova">
                  <span className="title">Anreise</span>
                </a>
              </li>

              <li>
                <a href="#incostanova">
                  <span className="title">in Costa Nova</span>
                </a>
              </li>
            </ul>
          </li>
        </ol>

        <h2 className="blog_heading" id="anreise">
          Anreise
        </h2>
        <p className="blog_text">
          Die typische Tagesreise nach Aveiro findet von Porto statt. In Porto
          finden sich regelmäßig Angebote für Tagestripps nach Aveiro und Costa
          Nova. Bei eigener Reise zwischen Porto und Aveiro habe ich immer den
          Zug verwendet. Es gibt theoretisch noch die Möglichkeit einen
          günstigen Flixbus (auch direkt vom Flughafen in Porto) zu bekommen.
          <br />
          Es gibt auf dieser Strecke unterschiedliche Züge unterschiedlichster
          Unternehmen. Sie fahren alle von den Stationen Campanha oder Sao Bento
          (alle halten in Campanha, manche fahren von dort noch weiter nach Sao
          Bento).
          <br />
          Die normale und mit Abstand günstigste Option hierbei ist der
          'normale' Zug betrieben von CP, welcher 3,80€ kostet. Die Karte für
          diesen Zug funktioniert ähnlich, wie die Metro in Porto. Initial 50ct
          Pfand für eine wiederaufladbare Karte. Das Ticket gibt es an Automaten
          oder auch am Schalter.
          <br />
          Das Ticket muss vor der Fahrt validiert werden (Ticket am Gleis auf
          die dafür vorgesehen Geräte halten). Schwarzfahren ist keine gute
          Idee, ich wurde auf 90% meiner Zugfahrten kontrolliert!
          <br />
          Die anderen Züge sind alles Schnellzüge, oder auch Stops des Zuges
          zwischen Porto und Lissabon, welche jedoch bedeutend mehr Geld kosten.
          (Schnellzug 17€ für 40min Fahrt, während der normale Zug knapp über 1h
          fährt)
          <br />
          <br />
          Tipp: Je nachdem, wie früh du am Gleis bist kann es sein, dass initial
          dein Zug für z.B. Gleis 2 angekündigt wurde, sich jedoch das Gleis auf
          Gleis 6 geändert hat. Dies wird durch eine Durchsage (welche nur auf
          Portugisisch ist) verkündet. Sollte also plötzlich viel Bewegung auf
          deinem Bahnsteig sein und alle auf einen anderen wechseln könnte es
          daran liegen. Dies wird auch ersichtlich, weil der Zug nach der
          Durchsage nicht mehr auf der Anzeige auf deinem Gleis zu sehen ist.
        </p>

        <h2 className="blog_heading" id="essen">
          Essen
        </h2>
        <div className="blog_text">
          Die 'Locals' in Aveiro sind sich absolut einig, dass egal wo man in
          Aveiro Essen geht das Essen gut ist.
          <figure className="blog_figure_left">
            <img
              className="blog_tripas blog_img"
              aria-label="Tripas de Aveiro in meiner Hand"
            />
            <figcaption className="blog_img_text">Tripas de Aveiro</figcaption>
          </figure>
          Was sich in Aveiro bei quasi allem, besonders aber beim Essen konstant
          durchzieht ist, dass die Stadt zwar durchaus Touristisch erschlossen
          ist, aber lange nicht komplett Aveiro und auch deutlich weniger, als
          die großen Städte des Landes.
          <br />
          Das hat zur Folge, dass die Preise in der Regel im Bereich, welcher
          von vielen Touristen besucht wird (besonders die Tagesreisen mit dem
          Bus, welche nur im alten Stadtzentrum unterwegs sind) etwas höher sind
          und wenn man diese Bereiche verlässt die Preise wieder fallen.
          <br />
          Wie überall in Portugal ist auch in Aveiro die 'Süßwarenabteilung'
          absolut genial. Aveiro selber ist bekannt für seine 'Ovos Moles de
          Aveiro', welche du auf jeden Fall probieren solltest. Auch 'Tripas de
          Aveiro' sind eine Crépe ähnliche Spezialität aus Aveiro. Es gibt zwei
          'Buden' in Aveiro, welche beide nur 'Tripas de Aveiro' verkaufen (Grün
          markiert auf der unteren Karte). Ich selber konnte keinen Favoriten
          unter den beiden ausmachen.
          <br />
          <br />
        </div>
        <iframe
          title="Karte aller meiner Essensoptionen in Aveiro"
          className="blog_googleMaps"
          src="https://www.google.com/maps/d/embed?mid=19H697wyrPopZl4UaST9b_nh4ab1CCac&ehbc=2E312F"
        />
        <br />
        <div className="blog_text">
          Wo sich alle Leute, mit denen ich gesprochen habe einig waren ist,
          dass 'Ramos' (rot markiert) die beste Bäckerei für Süßwaren jeder Art
          in Aveiro ist. Ich habe mich dort durch die große Auswahl an Süßwaren
          gegessen und es war wirklich durch die Bank alles hervorragend.
          Absolute Empfehlung!
          <br />
          Was Restaurants (blau markiert) angeht habe ich bei Madrigal auf
          Empfehlung einer Kollegin einen leckeren (aber mit Gräten
          durchzogenen) Bacalhau mit Kartoffeln gegessen. Aber auch mit 'O
          Bairro', welche sich auf Risotto spezialisiert haben habe ich gute
          Erfahrung gemacht.
          <figure className="blog_figure_center">
            <img
              className="blog_fish blog_img"
              aria-label="Bild von Bacalhau in einer Auflaufform mit Kartoffeln"
            />
            <figcaption className="blog_img_text">Bacalhau</figcaption>
          </figure>
          Keine Portugisische Küche, aber wirklich einheimliche Restaurants von
          Aveiro sind 'La Mamaroma', eine hervorragende Pizzaria und auch
          'Ramona'. Ramona ist ein Fast-Food ähnliches Burgerrestaurant, bei
          welchem sich trotz sehr vieler Sitzplätze zu den Stoßzeiten oder am
          Wochenende häufig eine Schlange vor der Tür bildet. Die Burger sind
          sehr gut und besonders bei den Studenten der Stadt sehr beliebt.
        </div>

        <h2 className="blog_heading" id="sehenswurdigkeiten">
          Sehenswürdigkeiten in Aveiro
        </h2>

        <h3 className="blog_heading" id="boote">
          Moliceiro-Boote
        </h3>

        <div className="blog_text">
          Die wohl bekannteste Atraktion in Aveiro selber sind die bunten
          Moliceiro-Boote. Die Boote wurden früher zum Transport von Salz und
          von Gütern verwendet. Heute sind die Boote die mit Abstand
          frequentierteste Atraktion in Aveiro. An Tagen mit gutem Wetter kann
          man am Kanal in Aveiro alle paar Minuten ein Boot voller Menschen
          beobachten.
          <br />
          Ich muss zugeben, dass ich trotz meiner langen Aufenthaltszeit in
          Aveiro nie selber mit den Booten gefahren bin, sondern sie lediglich
          nur von außen beobachtet habe. Das liegt primär daran, dass mich
          persönlich die Boote nicht wirklich angesprochen haben. Trotzdem
          möchte ich meine Beobachtungen teilen, sodass sich jeder selber eine
          Meinung bilden kann, ob man eine Bootsfahrt machen möchte.
          <br />
          <br />
          <iframe
            title="Route der Boote in Aveiro"
            src="https://www.google.com/maps/d/embed?mid=1BcaSGF_CYHusIe5Bn1xWz_zIWQVz7Ys&ehbc=2E312F"
            className="blog_googleMaps"
          />
          Die Boote fahren alle ungefähr an der gleichen Stelle in Aveiro los
          (roter Marker) und fahren von dort unabhängig vom Anbieter die auf der
          Karte eingezeichnete Route. Einzelne fahren links nach der Abbiegung
          noch gerade aus zu den Salzfeldern von Aveiro, jedoch sieht man diese
          nicht wirklich vom Boot. Die Fahrt selber dauert ca. 45min und kostet
          15€ pro Person.
          <br />
          Auf jedem Boot ist ein Steuermann und eine weitere Person. Auf manchen
          Booten erklärt diese Person ausführlich die Region und die Umgebung,
          durch welche das Boot gerade fährt. Andere wurden durch ihn und sein
          Gesang oder seine Interaktion mit Menschen am Fluss eher zu
          Party-Booten. Auf dritten saß diese Person nur mit im Boot ohne etwas
          zu sagen. Wie man beim Kauf der Fahrt erfährt für welche Art von Boot
          man sich eine Fahrt kauft kann ich leider nicht sagen, nur das dieser
          deutliche Unterschied zwischen den Anbietern besteht.
          <br />
          Mein primärer Grund, weswegen ich mich gegen eine Bootsfahrt
          entschieden habe ist, dass die Boote auch nur die Wege befahren,
          welche man sich auch zu Fuß anschauen kann.
        </div>

        <h3 className="blog_heading" id="passadicos">
          Passadiços de Aveiro
        </h3>

        <div className="blog_text">
          Die 'Passadicios de Aveiro' sind ein 5km (one-way) langer Weg, welcher
          durch die wunderbare Natur Portugals führt. Sie befinden sich nördlich
          von Aveiro. Ich habe meinen Besuch der Passadicios mit einem der
          'BUGA'-Fahrräder aus Aveiro durchgeführt. Über die gleichnamige App
          kann man sich Fahrräder in der Stadt ausleihen.
          <figure className="blog_figure_center">
            <img
              className="blog_passadicios_01 blog_img"
              aria-label="Bild von Bacalhau in einer Auflaufform mit Kartoffeln"
            />
            <figcaption className="blog_img_text">
              Typischer Weg der Passadicios
            </figcaption>
          </figure>
          Anschließend bin ich über den unterhalb auf der Karte eingezeichneten
          Weg am Kanal entlang zu den Passadicios gefahren. Die Route dorthin,
          sowie auch die Passadicios ist flach und mehrheitlich einfach zu
          befahren (ein oder andere Sand- oder Engstelle vorhanden). Für die
          Passadicios empfehlt sich die Nutzung eines Fahrrads, da sonst wenn
          der komplette Weg gelaufen wird die exakt gleiche Strecke wieder
          zurück gelaufen werden muss (was am Ende mehr als 10km wären).
          <br />
          <br />
          <figure className="blog_figure_center">
            <img
              className="blog_passadicios_02 blog_img"
              aria-label="Bild von Bacalhau in einer Auflaufform mit Kartoffeln"
            />
            <figcaption className="blog_img_text">
              See und Weg der Passadicios
            </figcaption>
          </figure>
          Aus genau diesem Grund laufen viele Leute auch nur ein Stück und
          drehen anschließend um. Am Ende der Route sind dann fast nur noch
          Fahrradfahrer unterwegs (Fahrräder kann man auch vor Ort ausleihen,
          Preis mir unbekannt). In manchen Guides wird auch der Weg zu den
          Passadicios als Teil dieser angegeben, dieser ist jedoch deutlich
          unattraktiver, als die tatsächlichen Wege, weswegen ich davon abraten
          würde diesen Weg aus dem Zentrum Aveiros zu gehen.
          <br />
          <iframe
            title="Route zu und der Passadicios de Aveiro"
            src="https://www.google.com/maps/d/embed?mid=1NdQCEhSdKMRO1im0vRZk6yzdUK3qjq8&ehbc=2E312F"
            className="blog_googleMaps"
          />
        </div>
        <h3 className="blog_heading" id="scbeiramar">
          Estádio Municipal de Aveiro - SC Beira-Mar
        </h3>

        <div className="blog_text">
          Der lokale Fußballverein aus Aveiro ist der SC Beira-Mar. Früher noch
          in der ersten Liga spielt der Verein nun in der 3. Portugisischen
          Liga. Nach Problemen mit dem eigenen Stadion ist der Verein umgezogen
          in das ursprünglich für die EM 2004 gebaute 'Estadio Municipal de
          Aveiro'.
          <figure className="blog_figure_center">
            <img
              className="blog_stadion blog_img"
              aria-label="Estádio Municipal de Aveiro von vorne in der Sonne"
            />
            <figcaption className="blog_img_text">
              Estádio Municipal de Aveiro
            </figcaption>
          </figure>
          Zu Ligaspielen des SC Beira-Mar kommen ~1000 Zuschauer, weswegen
          Tickets für jedes Spiel problemlos an der Tageskasse mit freier
          Platzwahl erhältlich sind. Das Stadion liegt etwas außerhalb von
          Aveiro, weswegen die Anreise zum Spiel abenteuerlich werden kann. Mit
          dem Auto absolut kein Problem, es gibt mehr als genug Parkplätze
          direkt am Stadion und das ist auch das Verkehrsmittel, welches 99%
          aller anwesenden Zuschauer nutzen. <br />
          <figure className="blog_figure_center">
            <img
              className="blog_wald blog_img"
              aria-label="Bild vom Wald auf dem Weg zum Stadion in Aveiro"
            />
            <figcaption className="blog_img_text">
              Waldweg zum Stadion
            </figcaption>
          </figure>
          Es fährt kein Bus und auch keine BUGA-Station ist in der direkten
          Umgebung des Stadions. Das einzige öffentliche Verkehrsmittel, welches
          in die Nähe des Stadions fährt ist ein Zug (Tickets gibts nicht am
          Automaten, sondern nur Online oder am Schalter, da er nicht von CP
          betrieben wird), welcher ca. 1x alle 90 min fährt (über Google Maps zu
          finden).
          <br />
          Diesen Zug kann man 2 Stationen bis 'Azurva' nehmen und anschließend
          knapp 2km durch den Wald zum Stadion laufen. Das Wohngebiet, in
          welchem die Bahnstation ist ist schon sehr verlassen mit nur hohen
          Mauern und Zäunen, der Wald zum Stadion ist komplett verlassen und
          sieht so aus, als wäre es nicht wirklich ein üblicher Weg, welchen die
          Menschen regelmäßig nutzen. (kommt auf dem Bild nicht so rüber)
          <br />
          Nach 2 Kilometern, bei denen ich auch irgendwie froh war, dass mir
          keine wilden Hunde begegnet sind kommt man dann zum Stadion
          (Groundhopper würden diese Anreise lieben), bei welchem keiner, egal
          ob an der Kasse, Einlass oder Essensstand auch nur ein Wort Englisch
          spricht. Basic-Portugisisch absolut notwendig.
          <figure className="blog_figure_center">
            <img
              className="blog_stadion_nah blog_img"
              aria-label="Bild aus der Nähe vom Stadion, welches kaputt ist"
            />
            <figcaption className="blog_img_text">Kaputtes Stadion</figcaption>
          </figure>
          Das Stadion selber befindet sich, wie man auf oberem Bild sieht in
          einem katastrophalen Zustand. Bei meinem nächsten Besuch im Stadion
          werde ich entweder mit dem BUGA-Fahrrad (mit eigenem Schloss) anreisen
          oder Uber/Bolt nutzen.
        </div>

        <h3 className="blog_heading" id="uni">
          Universität
        </h3>

        <p className="blog_text">
          Die Universität von Aveiro wird ab und an als Sehenswürdigkeit
          aufgelistet. Nachdem ich die 'Passadiços de Aveiro' besucht hatte
          nutzt ich mein ausgeliehenes Fahrrad (es gibt einen Tageshöchstsatz
          für alles mehr als 2h) um die ebenfalls etwas außerhalb, jedoch
          südlich befindliche Universität von Aveiro zu besuchen.
          <br />
          Wenn man ein Fahrrad (oder Zeit) hat kann man kurz über das Gelände
          fahren, die Universität ist relativ groß und geht in die Richtung, wie
          sie sonst nur in Kinofilmen dargestellt ist, jedoch nichts, was man
          zwingend gesehen haben muss. Am Ende des Tages ist es eine Universität
          und nicht mehr.
        </p>

        <h3 className="blog_heading" id="salt">
          Salinas de Aveiro
        </h3>

        <p className="blog_text">
          Die Salzfelder von Aveiro befinden sich etwas abseits der Stadt. Ich
          habe dort nie eine Führung gemacht, sondern lediglich fast täglich
          beim Sport an ihnen vorbeigelaufen. <br />
          Die Salzfelder können frei durchlaufen werden. Es befinden sich immer
          wieder Infotafeln zum Salzanbau. Je nach Wetter der letzten Tage
          können die Wege wegen ihren kleinen Dreckwegen sehr schnell schlammig
          werden. Außerdem sieht man dann natürlich auch kaum Salz, da die
          Becken vom Regen aufgefüllt wurden.
          <br />
          Neben den Salzfeldern sind einzelne Seen, wo man häufig Pelikane sehen
          kann.
        </p>

        <h3 className="blog_heading" id="park">
          Infante Dom Pedro City Park
        </h3>

        <div className="blog_text">
          Nicht in jedem Reiseführer findet sich der im Süden befindliche
          Stadtpark von Aveiro. Ein kleiner, aber schöner und ruhiger Stadtpark,
          in welchem eine entspannte Runde gegangen werden kann. Im westlichen
          Teil befinden sich einige Tennisplätze, in der Mitte des Parkes ist
          ein See.
          <figure className="blog_figure_center">
            <img
              className="blog_park blog_img"
              aria-label="Bild eines kleinen Sees mit Vögeln vor einer Brücke im Stadtpark von Aveiro"
            />
            <figcaption className="blog_img_text">Stadtpark</figcaption>
          </figure>
          Im östlichen Teil des Parkes sind weitere Sportanlagen. Ein
          entspannter Ort für Leute, die länger in Aveiro sind und eine ruhigere
          Runde durchs Grüne laufen wollen oder auch auf einer der Bänke des
          Parkes abschalten wollen.
        </div>

        <h2 className="blog_heading" id="costanova">
          Costa Nova
        </h2>

        <p className="blog_text">
          Costa Nova ist der Strandort von Aveiro. Bekannt für seine bunten
          Häuser sieht man häufig Bilder aus Costa Nova, wenn Leute von Aveiro
          reden.
        </p>

        <h3 className="blog_heading" id="tocostanova">
          Anreise
        </h3>
        <p className="blog_text">
          Wenn man kein Mietwagen besitzt ist der Bus von Aveiro das am
          häufigsten genutzte Verkehrsmittel, um von der Stadt nach Costa Nova
          zu gelangen. Der Bus startet am Busbahnhof (roter Marker), hält aber
          ebenfalls auch im Stadtzentrum (grüner Marker). Tickets gibt es direkt
          beim Fahrer zu kaufen und kosten 2,80€.
          <br />
          Der Bus und seine Routen sind nicht über Google Maps zu finden. Es
          gibt im Internet Fahrpläne des Busses, zum Beispiel über{" "}
          <a
            target="_blank"
            href="https://www.rome2rio.com/de/map/Aveiro/Costa-Nova-Biarritz?search=Aveiro,Costa-Nova-Biarritz#trips/transport/Aveiro/Costa-Nova-Biarritz/r/Line-36-bus/s/0"
          >
            Rome2Rio
          </a>
          . Die Endstation des Busses 'Costa Nova - Biarritz' befindet sich
          direkt vor den 'bunten Häusern von Costa Nova'.
          <br />
          <br />
          <iframe
            title="Bushaltestellen nach Costa Nova in Aveiro"          
            src="https://www.google.com/maps/d/embed?mid=1Yw_l_xwHO8sqmSAknzUfTEtgcrsn4RM&ehbc=2E312F"
            className="blog_googleMaps"
          />
        </p>

        <h3 className="blog_heading" id="incostanova">
          in Costa Nova
        </h3>

        <div className="blog_text">
          <iframe
            title="Bushaltestellen und Leuchtturm in Costa Nova"
            src="https://www.google.com/maps/d/embed?mid=13F5ruSeYmEwbOW3e7Ye1mgV_sTgQL34&ehbc=2E312F"
            className="blog_googleMaps"
          />
          <br />
          <br />
          Der Bus kommt bei unterem roten Marker in Costa Nova an. Der Ausstieg
          ist direkt bei den bunten Häusern. Die Häuser befinden sich in beide
          Richtungen vom Ausstiegspunkt, wobei die Mehrheit der Häuser in
          nördlicher Richtung sind (die, aus der der Bus gekommen ist). <br />
          <br />
          <br />
          <figure className="blog_figure_center">
            <img
              className="houses blog_img"
              aria-label="Bild der farbigen Häuser in Costa Nova"
            />
            <figcaption className="blog_img_text">
              Häuser in Costa Nova
            </figcaption>
          </figure>
          Wenn alle Häuser begutachtet (und Fotos gemacht wurden) kann man an
          den Häusern vorbei, durch die Straßen gerade aus zum Atlantik laufen.
          Hier befindet sich ein mehrere Kilometer langer Sandstrand. Der Weg
          zum Strand lohnt sich auf jeden Fall.
          <br />
          <br />
          <figure className="blog_figure_center">
            <img
              className="beach_01 blog_img"
              aria-label="großer Sandstrand mit Wellen am Atlantik"
            />
            <figcaption className="blog_img_text">
              Sandstrand in Costa Nova
            </figcaption>
          </figure>
          Es gibt die Möglichkeit (und das habe ich immer gemacht, wenn ich in
          Costa Nova war) einen ~4km langen Spaziergang auf Holzwegen parallel
          zum Atlantik zu machen. Man kann immer wieder zum Strand runter oder
          auf einer Bank die Aussicht und das Wetter genießen. <br />
          Der Weg ist in gutem Zustand, es gibt jedoch (Stand 10/2024) eine
          Stelle, welche gesperrt ist. Dies ist jedoch kein Problem, man kann
          einfach die Meter im Strand laufen und danach zurück auf den Weg
          gehen. Die Holzwege sind nicht bei Google Maps eingezeichnet, können
          jedoch nicht verfehlt werden und es ist nicht möglich sich dort zu
          verlaufen.
          <figure className="blog_figure_center">
            <img
              className="walk_costa blog_img"
              aria-label="Holzweg am Strand in Costa Nova."
            />
            <figcaption className="blog_img_text">
              Holzweg am Atlantik
            </figcaption>
          </figure>
          Am Ende des Weges befindet sich der Leuchtturm von Costa Nova (auf der
          Karte grün markiert). Er hat leider nur Mittwochs geöffnet, weswegen
          ich ihn nie von innen gesehen habe. Laut Rezessionen entsteht an
          Mittwochen dort schnell eine relativ lange Schlange. <br />
          Auf der Strecke befinden sich immer wieder Beach-Bars für kalte
          Getränke oder Snacks. Direkt beim Leuchtturm ist ebenfalls eine
          Bushaltestelle (auf der Karte rot markiert), von welcher man den Bus
          zurück nach Aveiro nehmen kann. Den Fahrplan für diese Station findest
          du auch bei{" "}
          <a
            href="https://www.rome2rio.com/de/map/Praia-da-Barra-Farol/Aveiro?search=Praia-da-Barra-Farol,Aveiro#trips/transport/Praia-da-Barra-Farol/Aveiro/r/Line-36-bus/s/0"
            target="_blank"
          >
            Rome2Rio
          </a>
          . Es ist natürlich ebenfalls möglich von jeder anderen Station zurück
          nach Aveiro zu gelangen, die genauen Abfahrpunkte herauszufinden ist
          etwas aufwendig, geht jedoch über die Rome2Rio Webseite, indem man
          sich die Haltestellen anzeigen lässt und dann eine neue Suche auf
          Basis dieser durchführt.
          <figure className="blog_figure_center">
            <img
              className="beach_02 blog_img"
              aria-label="Strand und Leuchtturm von Costa Nova"
            />
            <figcaption className="blog_img_text">
              Leuchtturm von Costa Nova
            </figcaption>
          </figure>
          Der Bus hält in Aveiro bei den gleichen Stationen, wie auf der
          Hinfahrt. Nördlich vom Leuchtturm in Costa Nova befindet sich noch das
          'Reserva Natural das Dunas de São Jacinto'. Hierbei handelt es ähnlich wie die <a href="#passadicos">Passadiços de Aveiro</a>
          {" "} um ein Naturgebiet. Mir wurde empfohlen bei einem Besuch die Fähre zu nutzen. Ich habe jedoch von einem Besuch abgesehen, da sich 
          laut Rezessionen sowohl bei Google Maps, als auch Tripadvisor dort ein wildes Rudel von 5 Hunden befindet, welches Besucher angreift.
        </div>
        <Divider/>
        <p>Ich hoffe mein Beitrag hat dir gefallen und Hilft bei deiner Reise nach Aveiro. Schreibe mir gerne über meine <Link
          to="/kontakt"
        >
          Kontaktmöglichkeiten
        </Link> deine Meinung zu diesem 
          Bericht, Aveiro allgemein oder wenn du sonstige Fragen zu deiner Reise oder diesem Beitrag hast. 
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Aveiro;
