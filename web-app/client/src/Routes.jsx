import React, { Component } from 'react';
import history from "./history";
import App from "./screens/App";
import Gallery from "./screens/Gallery";
import Compose from "./screens/Compose";
import {
    Router,
    Switch,
    Route
} from "react-router-dom";

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={App} />
                    <Route path="/gallery" component={Gallery} />
                    <Route path="/compose" component={Compose} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;