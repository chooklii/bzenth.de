import React, { useState, useEffect, useContext } from "react";
import { Footer, Header } from "../Components";
import { TranslationContext } from "../content";

const Imprint = () => {
  const [imprint, setImprint] = useState(null);
  const { language, getData } = useContext(TranslationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("imprint");
        if (data) {
          setImprint(data[0].fields);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [language]);

  if (!imprint) {
    return (
      <div>
        <Header />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="imprint page_classic">
        <div className="imprint-person">
          <p className="imprint-person-contact">
            {imprint.creator} <br></br>
            <a href={"mailto:" + imprint.mail}>{imprint.mail}</a>
          </p>
        </div>
        <div className="imprint-body">
          <div className="imprint-subheading">{imprint.firstHeading}</div>

          {imprint.firstText}

          <div className="imprint-subheading">{imprint.secondHeading}</div>

          {imprint.secondText}
          <div className="imprint-subheading">{imprint.thirdHeading}</div>
          {imprint.thirdText}

          <div className="imprint-subheading">{imprint.forthHeading}</div>

          {imprint.forthText}

          <p className="imprint_source">
            {imprint.sourceKey}
            <a className="imprint-link" target="_blank" href={imprint.source}>
              {imprint.sourceText}
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Imprint;
