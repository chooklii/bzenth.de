import React from "react"
import {Header} from "../Components"

class NotFound extends React.Component {


    render(){
        return(
            <div>
                <Header/>
                <div className="notFound-content">
                    Ich kann Ihnen bei ihrer eigenen Internetseite oder ihrem IT-Projekt helfen, aber diese Seite finden kann ich leider nicht.
                    Am besten nutzen Sie die Links im Header um auf eine gültige Adresse zu gelangen.
                </div>
                <div className="notFound-image"></div>
            </div>
        )
    }
}

export default NotFound