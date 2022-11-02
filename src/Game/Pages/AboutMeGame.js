import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, List } from "antd";
import { TranslationContext, findIcon, keyGenerator } from "../../helper";

const AboutMeGame = () => {
  const [skills, setSkills] = useState(null);
  const [aboutMe, setAboutMe] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [publications, setPublications] = useState(null);
  const [headings, setHeadings] = useState(null);
  const { language, getData } = useContext(TranslationContext);

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

  const renderSkills = () => {
    return skills.map((single) => {
      return (
        <div key={keyGenerator()} className="skills_game">
          <p className="skill_key">{single.startDate + "- " + single.endDate}</p>
          <p className="skill_value">{single.content}</p>
        </div>
      );
    });
  };

  const skillsBlock = () => {
    if(!skills){
      return <div/>
    }
    return (
      <div className="content_aboutme">
        <h2 className="heading_game">
          <FontAwesomeIcon
            icon={
              headings
                ? findIcon(headings.career.icon)
                : findIcon("faUserGraduate")
            }
            className="icon_game"
          />
          {headings ? headings.career.titel : "Werdegang"}
        </h2>
        {renderSkills()}
      </div>
    );
  };

  const privat = () => {
    return (
      <div className="content_aboutme">
        <h2 className="heading_game">
          <FontAwesomeIcon
            icon={
              headings ? findIcon(headings.private.icon) : findIcon("faUser")
            }
            className="icon_game"
          />
          {headings ? headings.private.titel : "Privat"}
        </h2>

        <div className="privat_game">
          <p className="game_text">{description}</p>
          <p className="game_text">{hobbies}</p>
        </div>
      </div>
    );
  };

  const renderPublications = () => {
    if(!publications){
      return <div/>
    }
    return (
      <div className="content_aboutme_short">
        <h2 className="heading_game">
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
          dataSource={publication}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<FontAwesomeIcon icon={findIcon("faJournalWhills")} size={"2x"} />}
                title={item.name}
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
    );
  };

  const renderCertificate = () => {
    return (
      <div className="content_aboutme_short">
        <h2 className="heading_game">
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
                avatar={<FontAwesomeIcon icon={item.icon} size={"2x"} />}
                title={item.name}
                description={
                  <p>
                    <a
                      className="link-certificate"
                      target="_blank"
                      href={item.link}
                    >
                      Verifikationslink
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
    );
  };

  return (
    <div>
      <h1 className="heading_game">About Me</h1>

      <Row>
        <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
          <div>
            {skillsBlock()}
            {renderPublications()}
          </div>
        </Col>

        <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
          <div>
            {privat()}
            {renderCertificate()}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutMeGame;
