import React, { Component } from 'react';
import history from "../history";
import "../styling/App.css"
import '../assets/semantic/buttons.css'

class App extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="logo">Dear Diary</div>
        <div className="banner-cont">
          <p className="banner-title">Dear Diary is a text-to-speech web application for hands free writing.</p>
          <p className="banner-subtitle">*Make sure to enable your microphone</p>
        </div>
        <div className="footer">
          <button className="get-started-btn ui button" type="button" onClick={() => history.push("/gallery")}>Get Started</button>
          <p className="note">Say 'Dear Diary, Get Started’ to well...get started</p>
        </div>
      </div>
    );
  }
}

export default App;