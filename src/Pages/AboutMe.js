import React, { useEffect, useContext } from "react";
import { Footer, Header } from "../Components";
import { TranslationContext } from "../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Steps, List } from "antd";
import {
  faCertificate,
  faChild,
  faGamepad,
  faHouseUser,
  faJournalWhills,
  faMicroscope,
  faRunning,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { faGitlab, faGoogle } from "@fortawesome/free-brands-svg-icons";

const path = [
  { key: "aboutme.path.01", from: "09/2013", to: "07/2016" },
  { key: "aboutme.path.02", from: "09/2013", to: "07/2015" },
  { key: "aboutme.path.03", from: "09/2016", to: "03/2020" },
  { key: "aboutme.path.04", from: "09/2018", to: "12/2019" },
  { key: "aboutme.path.05", from: "12/2019", to: "03/2020" },
  { key: "aboutme.path.06", from: "04/2020", to: "09/2020" },
  { key: "aboutme.path.07", from: "09/2020", to: "03/2022" },
  { key: "aboutme.path.11", from: "09/2020", to: "03/2022"},
  { key: "aboutme.path.08", from: "09/2021", to: "03/2022" },
  { key: "aboutme.path.09", from: "04/2022", to: "12/2023" },
  { key: "aboutme.path.10", from: "01/2024", to: "now" },
];

const paper = [
  {
    key: "aboutme.paper.01",
    author: "Benjamin Zenth",
    conf: "Masterarbeit",
    link: "https://opus-hshn.bsz-bw.de/frontdoor/index/index/searchtype/latest/docId/206/start/0/rows/10",
  },
  {
    key: "aboutme.paper.02",
    author: "Benjamin Zenth & Helmut Beckmann",
    conf: "17. Internationale Tagung Wirtschaftsinformatik",
  },
  {
    key: "aboutme.paper.03",
    author: "Benjamin Zenth & Majeed Malik",
    conf: "SKILL 2021",
    link: "https://dl.gi.de/server/api/core/bitstreams/855e03bb-6a98-46c8-a003-9c507d088b9b/content",
  },
];

const privato = [
  {
    heading: "aboutme.private.headings.age",
    content: "aboutme.private.content.age",
    icon: faChild,
  },
  {
    heading: "aboutme.private.headings.location",
    content: "aboutme.private.content.location",
    icon: faHouseUser,
  },
  {
    heading: "aboutme.private.headings.sport_hobbies",
    content: "aboutme.private.content.sport_hobbies",
    icon: faRunning,
  },
  {
    heading: "aboutme.private.headings.other_hobbies",
    content: "aboutme.private.content.other_hobbies",
    icon: faGamepad,
  },
];

const certificates = [
  {
    key: "aboutme.certificates.01",
    icon: faGitlab,
    link: "https://www.credly.com/badges/494363a8-f79c-4e22-a74d-7cdc072ce01d/public_url",
  },
  { key: "aboutme.certificates.02", icon: faGoogle },
];

const AboutMe = (props) => {
  const { getText, setLanguage } = useContext(TranslationContext);
  const isDesktop = window.innerWidth >= 1200;

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const langQueryParm = searchParams.get("lang");
    if (langQueryParm) {
      window.history.pushState({}, document.title, window.location.pathname);
      setLanguage(langQueryParm);
    }
  }, []);

  const create_steps = () => {
    const size = path.length;
    return path.map((single, index) => {
      return (
        <Steps.Step
          key={index}
          title={single.from + "- " + single.to}
          status={single.position == size ? "process" : "wait"}
          description={getText(single.key)}
        />
      );
    });
  };

  const renderSkills = () => {
    return (
      <div className="content_aboutme">
        <h2 className="heading_classic">
          <FontAwesomeIcon icon={faUserGraduate} className="icon" />
          {getText("aboutme.headings.path")}
        </h2>
        <Steps progressDot current={7} direction="vertical">
          {create_steps()}
        </Steps>
      </div>
    );
  };

  const renderPublications = () => {
    return (
      <div>
        <div className="content_aboutme">
          <h2 className="heading_classic">
            <FontAwesomeIcon icon={faMicroscope} className="icon" />
            {getText("aboutme.headings.papers")}
          </h2>
          <List
            itemLayout="horizontal"
            dataSource={paper}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <FontAwesomeIcon icon={faJournalWhills} size={"2x"} />
                  }
                  title={getText(item.key)}
                  description={
                    <p>
                      {item.author} - {item.conf} {item.link && "- "}
                      {item.link && (
                        <a
                          className="link-certificate"
                          target="_blank"
                          href={item.link}
                        >
                          Link
                        </a>
                      )}
                    </p>
                  }
                />
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    );
  };

  const renderCertificate = () => {
    return (
      <div>
        <div className="content_aboutme">
          <h2 className="heading_classic">
            <FontAwesomeIcon icon={faCertificate} className="icon" />
            {getText("aboutme.headings.certificates")}
          </h2>
          <List
            itemLayout="horizontal"
            dataSource={certificates}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<FontAwesomeIcon icon={item.icon} size={"2x"} />}
                  title={getText(item.key)}
                  description={
                    item.link && (
                      <p>
                        <a
                          className="link-certificate"
                          target="_blank"
                          href={item.link}
                        >
                          {getText("aboutme.certificates.link")}
                        </a>
                      </p>
                    )
                  }
                />
              </List.Item>
            )}
          ></List>
        </div>
      </div>
    );
  };

  const renderPrivate = () => {
    return (
      <div className="content_aboutme">
        <h2 className="heading_classic">
          <FontAwesomeIcon icon={faUser} className="icon" />
          {getText("aboutme.headings.private")}
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={privato}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<div className="iconWrapper"><FontAwesomeIcon icon={item.icon} size={"2x"} /></div>}
                title={getText(item.heading)}
                description={getText(item.content)}
              />
            </List.Item>
          )}
        ></List>
      </div>
    );
  };

  return (
    <div>
      {!props.game && <Header />}
      <div className="page_classic">
        <Row>
          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            {renderSkills()}
          </Col>
          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            {renderPrivate()}
          </Col>
          {!isDesktop && (
            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
              {!props.game && (
                <img
                  alt={getText("aboutme.alt_img_one")}
                  className="image_classic classic_first"
                />
              )}
            </Col>
          )}
          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            {renderPublications()}
          </Col>
          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            {renderCertificate()}
          </Col>
          {isDesktop && (
            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
              {!props.game && (
                <img
                  alt={getText("aboutme.alt_img_one")}
                  className="image_classic classic_first"
                />
              )}
            </Col>
          )}
          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            {!props.game && (
              <img
                alt={getText("aboutme.alt_img_two")}
                className="image_classic classic_second"
              />
            )}
          </Col>
        </Row>
      </div>
      {!props.game && <Footer />}
    </div>
  );
};

export default AboutMe;
