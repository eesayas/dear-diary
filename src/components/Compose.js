import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import UIfx from 'uifx';
import alertAudio from '../sounds/wake.wav';
import axios from 'axios';
import moment from 'moment';

const Compose = (props) => {
    const alert = new UIfx(alertAudio);
    const wake = [
      "okay diary", "ok diary", "dear diary", "hey diary", "hello diary", "hi diary", "sup diary"
    ];
  
    const [paras, setParas] = useState([]);

    /**
    @desc This function will only sendQuery to witai
    */
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
                case "delete_words":
                    let copyParas = paras;
                    let edited = copyParas[copyParas.length - 1].split(" ");
                    edited.pop();

                    if(edited.length){
                        copyParas[copyParas.length - 1] = edited.join(" ");
                    } else{
                        copyParas.pop();
                    }

                    console.log(copyParas);
                    setParas(copyParas);
                    
                    
                    break;
                case "save_entry":
                    break;
                default:
                    console.log("no match");
                    break;
                }
            }            
        })
        .catch(err => console.log(err));
    }

    // configure commands
    const commands = wake.map(w => ({
        command: `${w} *`,
        callback: (query, {resetTranscript}) => { 
            
            resetTranscript(); // delete command phrase
            sendQuery(query);
            alert.play();
        }
    }));

    var { transcript, listening } = useSpeechRecognition({commands});
    const [result, setResult] = useState("");

    useEffect(() => {
        setResult(transcript);

        if(!listening){
            if(transcript.length){
                let copyParas = paras;
                copyParas.push(transcript);
                console.log(copyParas);
                setParas(copyParas);
            }
    
            SpeechRecognition.startListening();
        }
    }, [transcript, listening]);
    
    return(
        <div className="h-100 w-100 border fixed-top" hidden={props.hidden}>
            <div className="alert alert-secondary border w-75 mx-auto mt-5" role="alert">
                {paras.map((p, index) => (<p key={index}>{p}</p>))}
                {result}
            </div>
        </div>
    );
}

export default Compose;