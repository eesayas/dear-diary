import React, { Component } from 'react';

// const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// const recognition = new SpeechRecognition()

// recognition.continous = true
// recognition.interimResults = true
// recognition.lang = 'en-US'

// recognition.addEventListener('result', e => {
//     console.log(e.results);
// });
// recognition.start();

class Main extends Component {
    render() {
        return (
            <div>
                <p>Dear Diary</p>
                <p>Dear Diary is a text-to-speech web application for handsfree writing.</p>
                <p>*Make sure to enable your microphone</p>
                <button>Get Started</button>
                <p>Say ‘Hey Diary, Get Started’ to well...get started</p>
            </div>
        );
    }
}

export default Main;