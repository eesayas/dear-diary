import history from "./history";

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = window.SpeechRecognition
const Speech = SpeechRecognition || webkitSpeechRecognition
const recognition = new Speech()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

let finalTranscript = "";
let data = {
    title: "",
    body: ""
}

recognition.addEventListener('result', event => transcribe(event));
recognition.addEventListener('end', recognition.start)
recognition.start();

function transcribe(event) {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")

    if (event.results[0].isFinal) {
        finalTranscript += transcript + " ";
        console.log(finalTranscript)
    }

    if (history.location.pathname === "/") {
        if (finalTranscript.includes("dear diary get started")) {
            finalTranscript = "";
            history.push("/gallery");
        }
    } else if (history.location.pathname === "/gallery") {
        if (finalTranscript.includes("dear diary start")) {
            finalTranscript = "";
            history.push("/compose");
        }
    } else if (history.location.pathname === "/compose") {
        let tempTitle = "";
        let tempBody = "";
        if (finalTranscript.includes("dear diary cancel")) {
            finalTranscript = "";
            history.push("/gallery");
        } else if (finalTranscript.includes("dear diary title")) {
            document.getElementById('title').innerHTML = finalTranscript;
            tempTitle = finalTranscript;
        } else if (finalTranscript.includes("dear diary body")) {
            document.getElementById('body').innerHTML = finalTranscript;
            tempBody = finalTranscript;
        } else if (finalTranscript.includes("dear diary publish")) {
            finalTranscript = "";
            data.title = tempTitle;
            data.body = tempBody;
            console.log(data)
            history.push("/gallery");
        }
    }
}