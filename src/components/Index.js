import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import UIfx from 'uifx';
import alertAudio from '../sounds/wake.wav';
import MicIcon from '@material-ui/icons/Mic';
import axios from 'axios';
import moment from 'moment';

const Index = (props) => {
  const alert = new UIfx(alertAudio);
  const wake = [
    "okay diary", "ok diary", "dear diary", "hey diary", "hello diary", "hi diary", "sup diary"
  ];

  // configure commands
  const commands = wake.map(w => ({
    command: `${w} *`,
    callback: (query) => { 
      alert.play();
      sendQuery(query);
    },
  }));

  const { transcript, finalTranscript, resetTranscript, listening } = useSpeechRecognition({commands});
  const [result, setResult] = useState("");
  const [mic, setMic] = useState(false);

  // this function will send query to witai
  const sendQuery = ( query ) => {
    // assemble url
    const url = `https://api.wit.ai/message?v=${moment().format("YYYYMMDD")}&q=${query.split(" ").join("%20")}`;
    
    // make GET request
    axios.get(url, { headers: { 'Authorization': 'Bearer H2VXHIZES4DBHZCDWUXB6BKOINMHC66Z' } })
      .then(res => {  

        // if there are intents
        if(res.data.intents.length){
          let intent_name = res.data.intents[0].name;

          switch(intent_name){
            case "new_entry":
                props.history.push("/compose");
                break;
            default:
              console.log("no match");
              break;
          }
        }
        
      })
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    setResult(transcript);
    
    if(!listening && mic){
      SpeechRecognition.startListening();
    }
  }, [transcript, listening, mic]);

  return (
    <div className="h-100 d-flex align-items-center user-select-none">
      <div className="d-table mx-auto">
        <h1 style={{color: "#0d9ca4", fontFamily: "BlackJack", fontSize: "6rem"}} className="mx-auto">Dear Diary</h1>
        <p className="lead text-center">Say it. I write it.</p>
        <div className="bg-light d-table p-3 rounded-circle mx-auto" role="button" onClick={() => {alert.play(); setMic(true);}}>
          <MicIcon fontSize="large"/>
        </div>
        <br></br>
        <p className="lead text-center">Click <MicIcon/> to turn on your microphone.</p>
        <br></br>
        <div className="alert alert-secondary border" role="alert" style={{width: "25rem"}} hidden={!result.length}>
          {result}
        </div>
      </div>
    </div>
  );
}

export default Index;