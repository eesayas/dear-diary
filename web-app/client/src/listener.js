import history from "./history";

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = window.SpeechRecognition
const Speech = SpeechRecognition || webkitSpeechRecognition
const recognition = new Speech()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

let finalTranscript = "";
let word = "";
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
        word = transcript;
        console.log("final: " + finalTranscript)
        console.log("word: " + word)
    }

    if (history.location.pathname === "/") {
        if (finalTranscript.includes("dear diary get started")) {
            finalTranscript = "";
            history.push("/gallery");
        }
    } else if (history.location.pathname === "/gallery") {
        if (finalTranscript.includes("dear diary compose")) {
            finalTranscript = "";
            history.push("/compose");
        }
    } else if (history.location.pathname === "/compose") {
        let tempTitle = "";
        let tempBody = "";
        var titlePrompt = "dear diary title";
        var bodyPrompt = "dear diary body";
        if (finalTranscript.includes(titlePrompt)) {
            finalTranscript = finalTranscript.slice(finalTranscript.indexOf(titlePrompt))
            tempTitle += finalTranscript.slice(finalTranscript.indexOf(titlePrompt) + titlePrompt.length + 1);
            if (tempTitle.includes("dear diary")) {
                tempTitle = tempTitle.split("dear diary")[0];
                data.title = tempTitle
                finalTranscript = finalTranscript.replace(titlePrompt, "")
                finalTranscript = finalTranscript.slice(finalTranscript.indexOf("dear diary "))
            }
            document.getElementById('title').value = tempTitle;
        }
        if (finalTranscript.includes(bodyPrompt)) {
            tempBody += finalTranscript.slice(finalTranscript.lastIndexOf(bodyPrompt) + bodyPrompt.length + 1);
            if (tempBody.includes("dear diary")) {
                tempBody = tempBody.split("dear diary")[0];
                data.body = tempBody
                finalTranscript = finalTranscript.replace(bodyPrompt, "")
            }
            document.getElementById('body').value = tempBody;
        }

        if (finalTranscript.includes("dear diary publish")) {
            finalTranscript = "";
            console.log(data)
            history.push("/gallery");
        }
        if (finalTranscript.includes("dear diary cancel")) {
            finalTranscript = "";
            history.push("/gallery");
        }
    }
}