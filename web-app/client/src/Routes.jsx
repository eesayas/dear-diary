import React, { Component } from 'react';
import history from "./history";
import App from "./App";
import Gallery from "./components/Gallery";
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
                </Switch>
            </Router>
        );
    }
}

export default Routes;