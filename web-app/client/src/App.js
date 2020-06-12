import React, { Component } from 'react';
import Gallery from "./components/Gallery";
import history from "./history";

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = window.SpeechRecognition
const Speech = SpeechRecognition || webkitSpeechRecognition
const recognition = new Speech()
/*
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

recognition.addEventListener('result', event => {
  const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join("")

  console.log(transcript);
  if (transcript.includes("hey")) {
    redirect();
  }
});

recognition.addEventListener('end', recognition.start)
recognition.start();
*/
class App extends Component {
  state = {
    transcript: ""
  }

  componentDidMount() {
    this.recognizeSpeech();
  }

  redirect = () => {
    history.push("/gallery");
  }


  recognizeSpeech = () => {
    recognition.addEventListener('result', event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")

      console.log(transcript);
      if (transcript.includes("hey")) {
        this.redirect();
      }
    });

    recognition.addEventListener('end', recognition.start)
    recognition.start();
  }

  render() {
    return (
      <div>
        <p>Dear Diary</p>
        <p>Dear Diary is a text-to-speech web application
for handsfree writing.</p>
        <p>*Make sure to enable your microphone</p>
        <p>Get Started</p>
        <p>Say ‘Hey Diary, Get Started’ to well...get started</p>
        <button type="button" onClick={this.redirect}>Get Started</button>
      </div >
    );
  }
}

export default App;