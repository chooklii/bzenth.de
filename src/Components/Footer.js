import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {TranslationContext} from "../helper"

const Footer = () => {
    const [imprintName, setImprintName] = useState(null)
    const {language, getData} = useContext(TranslationContext)
  
    useEffect(() => {
      const fetchHeaderData = async () => {
        try{
            const headerData = await getData("header")
            if(headerData){
                const imprintObject = headerData.filter(x => x.fields.key == "impressum")[0]
                setImprintName(imprintObject.fields.name)
            }
        }catch(e){
            console.log("Error while trying to fetch data from contentful", e)
        }

      }
      fetchHeaderData()
  
    }, [language])

    return(
        <div className="footer">
            <Link className="footer-link" to="/impressum">
                {imprintName ? imprintName : "Impressum"}
          </Link>
        </div>
    )
}

export default Footer