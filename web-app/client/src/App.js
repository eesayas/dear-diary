import React, { Component } from 'react';
import Gallery from "./components/Gallery";
import history from "./history";

class App extends Component {
  render() {
    return (
      <div>
        <p>Dear Diary</p>
        <p>Dear Diary is a text-to-speech web application for hands free writing.</p>
        <p>*Make sure to enable your microphone</p>
        <p>Get Started</p>
        <p>Say 'Dear Diary, Get Started’ to well...get started</p>
        <button type="button" onClick={() => history.push("/gallery")}>Get Started</button>
        <div id="finalTranscript"></div>
      </div >
    );
  }
}

export default App;