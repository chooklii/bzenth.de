import React from "react"
import { Link } from "react-router-dom";
const Footer = () => {

    return(
        <div className="footer">
            <Link className="footer-link" to="/impressum">
                Impressum
          </Link>
        </div>
    )
}

export default Footer