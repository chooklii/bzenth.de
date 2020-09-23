import React from "react"
import {HomeHeader, Header} from "../Components"
class Home extends React.Component {


    render(){
        const callFromThisPage = document.referrer.includes(window.location.hostname)
        return(
            <div className="HomePage">
                {callFromThisPage ? <Header/> : <HomeHeader/>}
            </div>
        )
    }
}

export default Home