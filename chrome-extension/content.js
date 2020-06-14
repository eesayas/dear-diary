window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognize = new SpeechRecognition();
recognize.interimResults = true
recognize.lang = 'en-US'

const port = chrome.runtime.connect({name: "Dear Diary"});

recognize.addEventListener('result', e => {
    let transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("");
    
    if(event.results[0].isFinal && transcript.toLowerCase() === 'dear diary'){
        console.log('gotcha');
        port.postMessage({
            message: 'go to website'
        });
    }
}); 

recognize.start();

console.log('hello');