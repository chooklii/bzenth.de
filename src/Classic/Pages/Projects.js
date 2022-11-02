import React, {useState, useContext, useEffect} from "react"
import {Footer, Header} from "../Components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Row, Col, Button, Divider} from "antd"
import {TranslationContext, findIcon, projectsIntro} from "../../helper"

const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);


const PublicProjects = () =>  {  
    const [data, setData] = useState(null)
    const {language, locales, getData, setLanguage} = useContext(TranslationContext)
  
    useEffect(() => {
      const fetchData = async () => {
        try{
          const data = await getData("publicProject")
          if(data){
            setData(data.map(x => x.fields).sort(function(a, b) {
              return a.position - b.position
            })) 
          }
        }catch(e){
              console.log("Error while trying to fetch data from contentful", e)
        }
      }
      fetchData()
  
    }, [language])  

    const renderButton = (single) => {
        return (
            <div className="design_buttons">
                {single.primaryLink && 
                <Button key={keyGenerator()} className="button_public_project" type="primary" onClick={() => window.open(single.primaryLink, '_blank')}>
                    {single.primaryLinkText}
                    </Button>
                }
                {single.secondaryLink && 
                <Button key={keyGenerator()} className="button_public_project" type="normal" onClick={() => window.open(single.secondaryLink, '_blank')}>
                    {single.secondaryLinkText}
                </Button>
                }

            </div>
        )
    }

    const renderProject = (single) => {
        return(
            <Col xl={12} xxl={12} lg={24} md={24} sm={24} xs={24}>
            <Divider/>
            <div className="project_classic">
                <h2 className="heading_classic">
                    <FontAwesomeIcon icon={findIcon(single.icon)} className="icon" />
                    {single.name}
                </h2>
                {single.image && 
                <img src={single.image.fields.file.url} alt={single.image.fields.description} className="image-project" />
                }
                {renderButton(single)}
                <p className="classic_text">{single.text}</p>
            </div>
        </Col>
        )
    }

    const renderData = () => {
        return data.map((single, index) => {
            return renderProject(single)
        })
    }

    if(!data){
        return(
            <div>
                <Header/>
            </div>
        )
    }
        return(
            <div>
                <Header/>
                <div className="projects-box page_classic">
                <p className="classic_text marginLeftRight">{projectsIntro[language]}</p>
                <Row>
                {renderData()}
                
            </Row>
                </div>
                <Footer/>
            </div>
        )                    
}

export default PublicProjects