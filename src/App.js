import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <div>
                                Seite in Arbeit
                    </div>
                        </Route>

                        <Route exact path="/private">
                            <div>
                                About me in Arbeit :)
                    </div>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default App;
