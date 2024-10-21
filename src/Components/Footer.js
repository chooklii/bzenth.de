import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {TranslationContext} from "../helper"

const Footer = () => {
    const {getText} = useContext(TranslationContext)

    return(
        <div className="footer">
            <Link className="footer-link" to="/impressum">
                {getText("header.imprint")}
          </Link>
        </div>
    )
}

export default Footer