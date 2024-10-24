import React from "react";
import { Footer, Header } from "../../Components";
import { Helmet } from "react-helmet";
import { Avatar } from "antd";

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

        <ol class="toc" role="list">
          <li>
            <a href="#anreise">
              <span class="title">Anreise</span>
            </a>
          </li>
          <li>
            <a href="#essen">
              <span class="title">Essen</span>
            </a>
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
        <p className="blog_text">
          Die 'Locals' in Aveiro sind sich absolut einig, dass egal wo man in
          Aveiro Essen geht das Essen gut ist. Was sich in Aveiro bei quasi
          allem, besonders aber beim Essen konstant durchzieht ist, dass die
          Stadt zwar durchaus Touristisch erschlossen ist, aber lange nicht
          komplett Aveiro und auch deutlich weniger, als die großen Städte des
          Landes.
          <figure className="blog_figure_left">
            <img className="blog_tripas blog_img" />
            <figcaption className="blog_img_text">Tripas de Aveiro</figcaption>
          </figure>
          <br />
          Das hat zur Folge, dass die Preise in der Regel im Bereich, welcher
          von vielen Touristen besucht wird (besonders die Tagesreisen mit dem
          Bus, welche nur im alten Stadtzentrum unterwegs sind) etwas höher sind
          und wenn man diese Bereiche verlässt die Preise wieder fallen.
          <br />
          <br />
          Wie überall in Portugal ist auch in Aveiro die 'Süßwarenabteilung'
          absolut genial. Aveiro selber ist bekannt für seine 'Ovos Moles de
          Aveiro', welche du auf jeden Fall probieren solltest. Auch 'Tripas de
          Aveiro' sind eine Crépe ähnliche Spezialität aus Aveiro. Es gibt zwei
          'Buden' in Aveiro, welche beide nur 'Tripas de Aveiro' verkaufen (Grün
          markiert auf der unteren Karte). Ich selber konnte keinen Favoriten
          unter den beiden ausmachen.
        </p>
        <iframe
          className="blog_googleMaps"
          src="https://www.google.com/maps/d/embed?mid=19H697wyrPopZl4UaST9b_nh4ab1CCac&ehbc=2E312F"
        />
        <br />
        <p className="blog_text">
          Wo sich alle Leute, mit denen ich gesprochen habe einig waren ist,
          dass 'Ramos' (rot markiert) die beste Bäckerei für Süßwaren jeder Art
          in Aveiro ist. Ich habe mich dort durch die große Auswahl an Süßwaren
          gegessen und es war wirklich durch die Bank alles hervorragend.
          Absolute Empfehlung!
          <br/>
          Was Restaurants (blau markiert) angeht habe ich bei Madrigal auf
          Empfehlung einer Kollegin einen leckeren (aber mit Gräten
          durchzogenen) Bacalhau mit Kartoffeln gegessen. Aber auch mit 'O
          Bairro', welche sich auf Risotto spezialisiert haben habe ich gute
          Erfahrung gemacht.
          
          <figure className="blog_figure_center">
            <img className="blog_fish blog_img" />
            <figcaption className="blog_img_text">Bacalhau</figcaption>
          </figure>

          Keine Portugisische Küche, aber wirklich einheimliche Restaurants von
          Aveiro sind 'La Mamaroma', eine hervorragende Pizzaria und auch
          'Ramona'. Ramona ist ein Fast-Food ähnliches Burgerrestaurant, bei
          welchem sich trotz sehr vieler Sitzplätze zu den Stoßzeiten oder am
          Wochenende häufig eine Schlange vor der Tür bildet. Die Burger sind
          sehr gut und besonders bei den Studenten der Stadt sehr beliebt.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Aveiro;
