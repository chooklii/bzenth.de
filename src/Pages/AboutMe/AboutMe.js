import React, { useState, useEffect, useContext } from "react";
import { Footer, Header } from "../../Components";
import {TranslationContext, findIcon} from "../../content"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Steps, List } from "antd";


const AboutMe = () => {
  const [skills, setSkills] = useState(null)
  const [aboutMe, setAboutMe] = useState(null)
  const [certificates, setCertificates] = useState(null)
  const [publications, setPublications] = useState(null)
  const {language, getData} = useContext(TranslationContext)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getData("certificates")
        if(data){
          const formattedData = data.map(x => x.fields)
          setCertificates(formattedData)
        }
      }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
      }
    }
    fetchData()

  }, [language])


  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getData("publications")
        if(data){
          const formattedData = data.map(x => x.fields)
          setPublications(formattedData)
        }
      }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
      }
    }
    fetchData()

  }, [language])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getData("career")
        if(data){
          const formatedCareer = data.map(x => x.fields)
          formatedCareer.sort(function(a, b) {
            return a.position - b.position;
          })
          setSkills(formatedCareer)
        }
      }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
      }
    }
    fetchData()

  }, [language])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getData("aboutme")
        if(data){
          const formatted = data.map(x => x.fields)
          formatted.sort(function(a, b) {
            return a.position - b.position;
          })
          setAboutMe(formatted)
        }
      }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
      }
    }
    fetchData()

  }, [language])

  const create_steps = () => {
    const size = skills.length
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
  }

  const renderSkills = () => {
    if(!skills){
      return <div/>
    }
    return (
      <div className="content_aboutme">
        <h2 className="heading_classic">
          <FontAwesomeIcon icon={findIcon("faUserGraduate")} className="icon" />
          Werdegang
        </h2>
        <Steps progressDot current={7} direction="vertical">
          {create_steps()}
        </Steps>
      </div>
    );
  }

  const renderPublications = () => {
    if(!publications){
      return <div/>
    }
    return (
      <div className="content_aboutme_short">
        <h2 className="heading_classic">
          <FontAwesomeIcon icon={findIcon("faMicroscope")} className="icon" />
          Wissenschaftliche Publikationen
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={publications}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<FontAwesomeIcon icon={findIcon("faJournalWhills")} size={"2x"} />}
                title={item.title}
                description={<p>{item.author} - {item.conference} {item.link ? "- " : null}{item.link ? <a className="link-certificate" target="_blank" href={item.link}>Link</a>: null}</p>}
              />
            </List.Item>
          )}
        ></List>
      </div>
    );
  }

  const renderCertificate = () => {
    if(!certificates){
      return <div/>
    }
    return (
      <div className="content_aboutme_short">
        <h2 className="heading_classic">
          <FontAwesomeIcon icon={findIcon("faCertificate")} className="icon" />
          Zertifikate
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={certificates}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<FontAwesomeIcon icon={findIcon(item.icon)} size={"2x"} />}
                title={item.name}
                description={<p><a className="link-certificate" target="_blank" href={item.link}>Verifikationslink</a>{item.id && "  ID: "}{item.id} </p>}
              />
            </List.Item>
          )}
        ></List>
      </div>
    );
  }

  const renderPrivate =() => {
    if(!aboutMe){
      return <div/>
    }
    return (
      <div className="content_aboutme">
        <h2 className="heading_classic">
          <FontAwesomeIcon icon={findIcon("faUser")} className="icon" />
          Privat
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={aboutMe}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<FontAwesomeIcon icon={findIcon(item.icon)} size={"2x"} />}
                title={item.key}
                description={item.text}
              />
            </List.Item>
          )}
        ></List>
        </div>
    );
  }

    return (
      <div>
        <Header />
        <div className="page_classic">
          <Row>
            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
              <div>
                {renderSkills()}
                {renderPublications()}
                <div className="image_classic es"></div>
              </div>
            </Col>

            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
              <div>
                {renderPrivate()}
                {renderCertificate()}
                <div className="image_classic berlin"></div>
              </div>
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
}

export default AboutMe;
