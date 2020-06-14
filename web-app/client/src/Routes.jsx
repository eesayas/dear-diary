import React, { Component } from 'react';
import history from "./history";
import App from "./screens/App";
import Gallery from "./screens/Gallery";
import Compose from "./screens/Compose";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { ProtectedRoute } from './protected.route';

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
                    <ProtectedRoute path="/gallery" component={Gallery} />
                    <Route path="/compose" component={Compose} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
        );
    }
}

export default Routes;