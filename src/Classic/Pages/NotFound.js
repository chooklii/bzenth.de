import React from "react"
import {Footer, Header} from "../Components"

class NotFound extends React.Component {


    render(){
        return(
            <div>
                <Header/>
                <div className="page_classic">
                    Page not Found :(
                </div>
                <div className="notFound-image"></div>
                <Footer/>
            </div>
        )
    }
}

export default NotFound