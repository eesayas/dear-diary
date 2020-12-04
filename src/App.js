import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Index from './components/Index';
import Compose from './components/Compose';
import history from './history';

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index}/>
        <Route path="/compose" exact component={Compose}/>
      </Switch>
    </Router>
  );
}

export default App;
