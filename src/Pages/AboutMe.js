import React, { useState, useEffect, useContext } from "react";
import { Footer, Header } from "../Components"
import { TranslationContext, findIcon } from "../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Steps, List } from "antd";

const AboutMe = (props) => {
  const [skills, setSkills] = useState(null);
  const [aboutMe, setAboutMe] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [publications, setPublications] = useState(null);
  const [headings, setHeadings] = useState(null);
  const {language, getData, setLanguage } = useContext(TranslationContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const langQueryParm = searchParams.get('lang')
    if(langQueryParm){
      setLanguage(langQueryParm)
    }
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await getData("aboutMe", true);
        if (data) {
          const aboutMeHeader = data.filter(
            (x) => x.sys.contentType.sys.id == "aboutMeHeader"
          );
          const certificates = data.filter(
            (x) => x.sys.contentType.sys.id == "certificates"
          );
          const aboutMe = data.filter(
            (x) => x.sys.contentType.sys.id == "aboutme"
          );
          const publications = data.filter(
            (x) => x.sys.contentType.sys.id == "publications"
          );
          const career = data.filter(
            (x) => x.sys.contentType.sys.id == "career"
          );
          setCertificates(certificates.map((x) => x.fields));
          setAboutMe(
            aboutMe
              .map((x) => x.fields)
              .sort(function (a, b) {
                return a.position - b.position;
              })
          );
          setPublications(publications.map((x) => x.fields));
          setSkills(
            career
              .map((x) => x.fields)
              .sort(function (a, b) {
                return a.position - b.position;
              })
          );
          setHeadings(
            aboutMeHeader
              .map((x) => x.fields)
              .reduce(
                (obj, item) => Object.assign(obj, { [item.key]: item }),
                {}
              )
          );
        }
      } catch (e) {
        console.log("Error while trying to fetch data from contentful", e);
      }
    };
    fetchData();
  }, [language]);

  const create_steps = () => {
    const size = skills.length;
    return skills.map((single, index) => {
      return (
        <Steps.Step
          key={index}
          title={single.startDate + "- " + single.endDate}
          status={single.position == size ? "process" : "wait"}
          description={single.content}
        />
      );
    });
  };

  const renderSkills = () => {
    if (!skills) {
      return <div />;
    }
    return (
      <div className="content_aboutme">
        <h2 className="heading_classic">
          <FontAwesomeIcon
            icon={
              headings
                ? findIcon(headings.career.icon)
                : findIcon("faUserGraduate")
            }
            className="icon"
          />
          {headings ? headings.career.titel : "Werdegang"}
        </h2>
        <Steps progressDot current={7} direction="vertical">
          {create_steps()}
        </Steps>
      </div>
    );
  };

  const renderPublications = () => {
    if (!publications) {
      return <div />;
    }
    return (
      <div>
      <div className="content_aboutme_short">
        <h2 className="heading_classic">
          <FontAwesomeIcon
            icon={
              headings
                ? findIcon(headings.publications.icon)
                : findIcon("faMicroscope")
            }
            className="icon"
          />
          {headings
            ? headings.publications.titel
            : "Wissenschaftliche Publikationen"}
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={publications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon
                    icon={findIcon("faJournalWhills")}
                    size={"2x"}
                  />
                }
                title={item.title}
                description={
                  <p>
                    {item.author} - {item.conference} {item.link ? "- " : null}
                    {item.link ? (
                      <a
                        className="link-certificate"
                        target="_blank"
                        href={item.link}
                      >
                        Link
                      </a>
                    ) : null}
                  </p>
                }
              />
            </List.Item>
          )}
        ></List>
        </div>
        {(headings && !props.game) && (
          <img
            src={headings.publications.image.fields.file.url}
            alt={headings.publications.image.fields.description}
            className="image_classic"
          />
        )}
      </div>
    );
  };

  const renderCertificate = () => {
    if (!certificates) {
      return <div />;
    }
    return (
      <div>
      <div className="content_aboutme_short">
        <h2 className="heading_classic">
          <FontAwesomeIcon
            icon={
              headings
                ? findIcon(headings.certificates.icon)
                : findIcon("faCertificate")
            }
            className="icon"
          />
          {headings ? headings.certificates.titel : "Zertifikate"}
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={certificates}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon icon={findIcon(item.icon)} size={"2x"} />
                }
                title={item.name}
                description={
                  <p>
                    <a
                      className="link-certificate"
                      target="_blank"
                      href={item.link}
                    >
                      {item.linkText}
                    </a>
                    {item.id && "  ID: "}
                    {item.id}{" "}
                  </p>
                }
              />
            </List.Item>
          )}
        ></List>
        </div>
        {(headings && !props.game) && 
          <img
            src={headings.certificates.image.fields.file.url}
            alt={headings.certificates.image.fields.description}
            className="image_classic"
          />
        }
      </div>
    );
  };

  const renderPrivate = () => {
    if (!aboutMe) {
      return <div />;
    }
    return (
      <div className="content_aboutme">
        <h2 className="heading_classic">
          <FontAwesomeIcon
            icon={
              headings ? findIcon(headings.private.icon) : findIcon("faUser")
            }
            className="icon"
          />
          {headings ? headings.private.titel : "Privat"}
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={aboutMe}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <FontAwesomeIcon icon={findIcon(item.icon)} size={"2x"} />
                }
                title={item.key}
                description={item.text}
              />
            </List.Item>
          )}
        ></List>
      </div>
    );
  };

  if (!aboutMe && !certificates && !publications && !skills) {
    return (
      <div>
        {!props.game && <Header />}
      </div>
    );
  }
  else return (
    <div>
      {!props.game && <Header />}
      <div className="page_classic">
        <Row>
          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <div>
              {renderSkills()}
              {renderPublications()}
            </div>
          </Col>

          <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <div>
              {renderPrivate()}
              {renderCertificate()}
            </div>
          </Col>
        </Row>
      </div>
      {!props.game && <Footer />}
    </div>
  );
};

export default AboutMe;
