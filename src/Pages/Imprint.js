import React, { useContext } from "react";
import { Footer, Header } from "../Components";
import { TranslationContext } from "../helper";

const Imprint = () => {
  const { getText } = useContext(TranslationContext);

  return (
    <div>
      <Header />
      <div className="imprint page_classic">
        <div className="imprint-person">
          <p className="imprint-person-contact">
            Benjamin Zenth<br></br>
            <a href="mailto:kontakt@bzenth.de">kontakt@bzenth.de</a>
          </p>
        </div>
        <div className="imprint-body">
          <div className="imprint-subheading">{getText("imprint.01_heading")}</div>
          {getText("imprint.01")}
          <div className="imprint-subheading">{getText("imprint.02_heading")}</div>
          {getText("imprint.02")}
          <div className="imprint-subheading">{getText("imprint.03_heading")}</div>
          {getText("imprint.03")}
          <div className="imprint-subheading">{getText("imprint.04_heading")}</div>
          {getText("imprint.04")}

          <p className="imprint_source">
            {getText("imprint.source")}
            <a className="imprint-link" target="_blank" href={"https://www.juraforum.de/impressum-generator/"}>
            Impressum Generator von JuraForum.de
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Imprint;
