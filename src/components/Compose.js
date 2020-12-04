import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import UIfx from 'uifx';
import alertAudio from '../sounds/wake.wav';

const Compose = (props) => {
    const alert = new UIfx(alertAudio);
    const wake = [
      "okay diary", "ok diary", "dear diary", "hey diary", "hello diary", "hi diary", "sup diary"
    ];
  
    const [woke, setWoke] = useState(false);
    // configure commands
    const commands = wake.map(w => ({
      command: w,
      callback: ({ resetTranscript }) => { alert.play(); setWoke(true); resetTranscript() },
    }));

    const { transcript, finalTranscript, resetTranscript } = useSpeechRecognition({commands});
    return(
        <div className="h-100 w-100 border fixed-top" hidden={props.hidden}>
            {transcript}
        </div>
    );
}

export default Compose;