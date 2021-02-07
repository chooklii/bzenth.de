import React from "react";
import { Header } from "../Components";

class Imprint extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="imprint">
          <h1 className="imprint-heading">Impressum</h1>
          <div className="imprint-person">
            <p className="imprint-person-contact">
              Benjamin Zenth <br></br>
              Baierbacher Straße 41 <br></br>
              74629 Pfedelbach
            </p>
            <p className="imprint-person-contact">
              Telefon: 0151/12612194 <br></br>
              <a href="mailto:benjaminzenth@icloud.com">
                benjaminzenth@icloud.com
              </a>
            </p>
          </div>
          <div className="imprint-body">
          <h2 className="imprint-h2">Disclaimer – rechtliche Hinweise</h2>

          <div className="imprint-subheading">§ 1 Warnhinweis zu Inhalten</div>

          Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden
          mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite
          übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der
          bereitgestellten kostenlosen und frei zugänglichen journalistischen
          Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben
          die Meinung des jeweiligen Autors und nicht immer die Meinung des
          Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei
          zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem
          Nutzer und dem Anbieter zustande, insoweit fehlt es am
          Rechtsbindungswillen des Anbieters.

          <div className="imprint-subheading">§ 2 Externe Links</div>

            Diese Website enthält Verknüpfungen zu Websites
          Dritter ("externe Links"). Diese Websites unterliegen der Haftung der
          jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung
          der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
          Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße
          ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und
          zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das
          Setzen von externen Links bedeutet nicht, dass sich der Anbieter die
          hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine
          ständige Kontrolle der externen Links ist für den Anbieter ohne
          konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von
          Rechtsverstößen werden jedoch derartige externe Links unverzüglich
          gelöscht.

          <div className="imprint-subheading">§ 3 Urheber- und Leistungsschutzrechte</div>

          Die auf dieser Website
          veröffentlichten Inhalte unterliegen dem deutschen Urheber- und
          Leistungsschutzrecht. Jede vom deutschen Urheber- und
          Leistungsschutzrecht nicht zugelassene Verwertung bedarf der
          vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen
          Rechteinhabers. Dies gilt insbesondere für Vervielfältigung,
          Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe
          von Inhalten in Datenbanken oder anderen elektronischen Medien und
          Systemen. Inhalte und Rechte Dritter sind dabei als solche
          gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe
          einzelner Inhalte oder kompletter Seiten ist nicht gestattet und
          strafbar. Lediglich die Herstellung von Kopien und Downloads für den
          persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
          Die Darstellung dieser Website in fremden Frames ist nur mit
          schriftlicher Erlaubnis zulässig.

          <div className="imprint-subheading">§ 4 Besondere Nutzungsbedingungen</div>

          Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von
          den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle
          ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen
          Einzelfall die besonderen Nutzungsbedingungen.



          <div className="imprint-subheading">Datenschutz</div>

          Diese Webseite speichert oder verarbeitet keine der von dem Nutzer eingegebenen oder hochgeladenen Daten.
          Gehostet wird diese Webseite
          über <a href="https://pages.github.com/" target="_blank">Github Pages</a>, bereitgestellt von Github Inc., 88 Colin P Kerry Jr St, San Francisco, CA 94107, United States.
          Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in
          der <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank">Datenschutzerklärung</a> von Github

          <p>
            Quelle:
            <a className="imprint-link" target="_blank" href="https://www.juraforum.de/impressum-generator/">
              Impressum Generator von JuraForum.de
            </a>
          </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Imprint;
