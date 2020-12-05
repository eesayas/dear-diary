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
  
    const [filters, setFilters] = useState([]);
    const [copy, setCopy] = useState("");

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
                case "new_entry":
                    props.history.push("/compose");
                    break;
                case "save_entry":
                    break;
                default:
                    console.log("no match");
                    break;
                }
            }

            setResult(filterTranscript(copy));
            
        })
        .catch(err => console.log(err));
    }

    /**
     * @desc This function will add filter query to filter array
     * @param command - what the user said
     */
    const addToFilter = (command, transcript) => {
        let index = transcript.indexOf(command);

        while(filters.map(f => f.index).includes(index)){
            index = transcript.indexOf(command, index + 1);
        }

        let tempFilters = filters;
        
        tempFilters.push({
            index, length: command.length
        });

        setFilters(tempFilters);
    }

    // configure commands
    const commands = wake.map(w => ({
      command: `${w} *`,
      callback: (query) => { 
          alert.play(); 
          sendQuery(query);
          addToFilter(`${w} ${query}`, copy);
        },
    }));

    var { transcript } = useSpeechRecognition({commands});
    const [result, setResult] = useState("");

    /**
     * @desc This function will remove all command phrases from transcript
     */
    const filterTranscript = (transcript) => {
        let tempFilters = filters;
        let tempTranscript = "";

        if(!tempFilters.length) return transcript;

        // for all filter in filters filter out filter
        tempFilters.forEach( (filter, index) => {

            // iif first and only
            if(index === 0 && tempFilters.length === 1){

                tempTranscript += transcript.substring(0, filter.index - 1) + " " + transcript.substring(filter.index + filter.length + 1, transcript.length);

            // if first    
            } else if(index === 0 && tempFilters.length > 1){
                
                let chunk = transcript.substring(0, filter.index - 1) + " ";
                console.log(`first ${chunk}`);

                tempTranscript += chunk;
            
            // if last
            } else if(index === tempFilters.length - 1){

                let chunk = transcript.substring(tempFilters[index - 1].index + tempFilters[index - 1].length + 1, filter.index - 1) + " "
                    + transcript.substring(filter.index + filter.length + 1, transcript.length);

                tempTranscript += chunk;

            // if mid
            } else{
                tempTranscript += transcript.substring(tempFilters[index - 1].index + tempFilters[index - 1].length + 1, filter.index - 1) + " ";
            }

        });

        return tempTranscript;
    }

    useEffect(() => {
        setCopy(transcript);
        setResult(filterTranscript(transcript));
    }, [transcript]);
    
    return(
        <div className="h-100 w-100 border fixed-top" hidden={props.hidden}>
            <div className="alert alert-secondary border w-75 mx-auto mt-5" role="alert">
                {result}
            </div>
        </div>
    );
}

export default Compose;