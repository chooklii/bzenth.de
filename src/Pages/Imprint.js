import React from "react";
import { Footer, Header } from "../Components";

class Imprint extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="imprint page_classic">
          <div className="imprint-person">
            <p className="imprint-person-contact">
              Benjamin Zenth
            </p>
            <p className="imprint-person-contact">
              <a href="mailto:kontakt@bzenth.de">
                kontakt@bzenth.de
              </a>
            </p>
          </div>
          <div className="imprint-body">

          <div className="imprint-subheading">Warnhinweis zu Inhalten</div>

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

          <div className="imprint-subheading">Externe Links</div>

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

          <div className="imprint-subheading">Urheber- und Leistungsschutzrechte</div>

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

          <div className="imprint-subheading">Datenschutz</div>

          Diese Webseite speichert oder verarbeitet keine der von dem Nutzer eingegebenen oder hochgeladenen Daten.
          Gehostet wird diese Webseite
          über <a href="https://pages.github.com/" target="_blank">Github Pages</a>, bereitgestellt von Github Inc., 88 Colin P Kerry Jr St, San Francisco, CA 94107, United States.
          Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in
          der <a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" target="_blank">Datenschutzerklärung</a> von Github

          <br></br><br></br>

          <p>Diese Webseite verwendet zur Verarbeitung der Nutzungsstatistiken <a href="https://getinsights.io/" target="_blank">Insights</a>. Durch diese Anwendung werden keine personenbezogene Daten verarbeitet und von der Nutzung von Cookies zur Identifikation von Benutzern wird abgesehen.
                    Weitere Informationen zum Umgang mit diesen Daten finden Sie in der <a href="https://getinsights.io/privacy" target="_blank">Datenschutzerklärung</a> von Insights.
          </p>

          <p className="imprint_source">
            Quelle:
            <a className="imprint-link" target="_blank" href="https://www.juraforum.de/impressum-generator/">
              Impressum Generator von JuraForum.de
            </a>
          </p>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Imprint;
