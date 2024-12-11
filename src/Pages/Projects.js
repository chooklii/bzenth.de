import React, { useContext } from "react";
import { Footer, Header } from "../Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button, Tabs  } from "antd";
import { TranslationContext, keyGenerator } from "../helper";
import {
  faArchive,
  faBus,
  faChessPawn,
  faDumbbell,
  faFlask,
  faGraduationCap,
  faUser,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { faNpm } from "@fortawesome/free-brands-svg-icons";

const projects = [
  {
    name: "bzenth.de",
    additionalLink: "https://github.com/chooklii/bzenth.de",
    additionalLink_name: "projects.code",
    info: "projects.bzenth.info",
    tech: "projects.bzenth.tech",
    icon: faUser,
    img: "bzenth",
  },
  {
    name: "Gradulator",
    link: "https://gradulator.de/",
    link_name: "projects.site",
    additionalLink: "https://github.com/malik-zenth/gradulator",
    additionalLink_name: "projects.code",
    info: "projects.gradulator.info",
    tech: "projects.gradulator.tech",
    icon: faGraduationCap,
    img: "gradulator",
  },
  {
    name: "ÖPNV-Transparenzregister",
    link: "https://www.oepnv-transparenzregister.de/",
    link_name: "projects.site",
    additionalLink: "https://background.tagesspiegel.de/verkehr-und-smart-mobility/briefing/oepnv-transparenzregister-geht-online",
    additionalLink_name: "projects.opnv.press",
    info: "projects.opnv.info",
    tech: "projects.opnv.tech",
    icon: faBus,
    img: "opnv",
  },
  {
    name: "hart-work.de",
    link: "https://hart-work.de/",
    link_name: "projects.site",
    info: "projects.hartwork.info",
    icon: faDumbbell,
    img: "hartwork",
  },
  {
    name: "simulationmodel",
    additionalLink: "https://github.com/chooklii/simulationmodel",
    additionalLink_name: "projects.code",
    info: "projects.simulation.info",
    tech: "projects.simulation.tech",
    icon: faFlask
  },
  {
    name: "Storagable",
    additionalLink: "https://github.com/chooklii/RouterRestarter",
    additionalLink_name: "projects.code",
    info: "projects.storagable.info",
    tech: "projects.storagable.tech",
    icon: faArchive
  },
  {
    name: "num-words-de",
    link: "https://www.npmjs.com/package/num-words-de",
    link_name: "projects.npm",
    additionalLink: "https://github.com/chooklii/num-words-de",
    additionalLink_name: "projects.code",
    info: "projects.numwords.info",
    tech: "projects.numwords.tech",
    icon: faNpm
  },
  {
    name: "Lichess Hide Ratings Chrome Extension",
    additionalLink: "https://github.com/chooklii/lichess-hide-rating-extension",
    additionalLink_name: "projects.code",
    info: "projects.lichess.info",
    tech: "projects.lichess.tech",
    icon: faChessPawn
  },
  {
    name: "Router Restarter",
    additionalLink: "https://github.com/chooklii/RouterRestarter",
    additionalLink_name: "projects.code",
    info: "projects.router.info",
    tech: "projects.router.tech",
    icon: faWifi
  },
  {
    name: "bool-to-yes-no",
    link: "https://www.npmjs.com/package/bool-to-yesno",
    link_name: "projects.npm",
    additionalLink: "https://github.com/chooklii/bool-to-yesno",
    additionalLink_name: "projects.code",
    info: "projects.bool.info",
    tech: "projects.bool.tech",
    icon: faNpm
  },
];

const Projects = (props) => {
  const { getText } = useContext(TranslationContext);

  const renderButton = (single) => {
    return (
      <div key={keyGenerator()} className="design_buttons">
        {single.link && (
          <Button
            key={keyGenerator()}
            className="button_public_project"
            type="primary"
            onClick={() => window.open(single.link, "_blank")}
          >
            {getText(single.link_name)}
          </Button>
        )}
        {single.additionalLink && (
          <Button
            key={keyGenerator()}
            className="button_public_project"
            type="normal"
            onClick={() => window.open(single.additionalLink, "_blank")}
          >
            {getText(single.additionalLink_name)}
          </Button>
        )}
      </div>
    );
  };

  const renderProject = (single) => {

    const tabs = [
      {
        key: "1",
        label: getText("projects.links"),
        children: renderButton(single)
      },
      single.info && {
        key: "2",
        label: getText("projects.info"),
        children: <div className="projects_text">{getText(single.info)}</div>
      },
      single.tech && {
        key: "3",
        label: getText("projects.tech"),
        children: <div className="projects_text">{getText(single.tech)}</div>
      },
      
    ]

    return (
      <Col
        key={keyGenerator()}
        xl={12}
        xxl={12}
        lg={12}
        md={24}
        sm={24}
        xs={24}
      >
        <div className="project_classic">
          <h2 className="heading_classic">
            <FontAwesomeIcon icon={single.icon} className="icon" />
            {single.name}
          </h2>
          {single.img && (
            <img
              alt={getText("projects.alt")}
              className={"image-project " + single.img}
            />
          )}
          <Tabs centered items={tabs} defaultActiveKey="2"/>
          <p className="classic_text">{single.text}</p>
        </div>
      </Col>
    );
  };

  const renderData = () => {
    return projects.map((single, index) => {
      return renderProject(single);
    });
  };

  return (
    <div>
      {!props.game && <Header />}
      <div className="projects-box page_classic">
        <Row>{renderData()}</Row>
      </div>
      {!props.game && <Footer />}
    </div>
  );
};

export default Projects;
