import history from "./history";

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = window.SpeechRecognition
const Speech = SpeechRecognition || webkitSpeechRecognition
const recognition = new Speech()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

//this will hold the value of the current command
let currentCommand;

//these are the list of commands 
const commands = {
    TITLE: 'dear diary title',
    BODY: 'dear diary body',
    PUBLISH: 'dear diary publish',
    CANCEL: 'dear diary cancel',
    GETSTARTED: 'dear diary get started',
    COMPOSE: 'dear diary compose'
}

//this will hold the title and body of a post
let title = '';
let body = '';

recognition.addEventListener('result', event => transcribe(event));
recognition.addEventListener('end', recognition.start)
recognition.start();

//when DOM is loaded check if the following elements exists
document.addEventListener("DOMContentLoaded", function (event) {

    //if exists
    if (document.getElementById('title')) {

        //listen for 'typed' input change and change value
        document.getElementById('title').addEventListener('input', (e) => {
            title = e.target.value;
        })
    }

    if (document.getElementById('body')) {
        document.getElementById('body').addEventListener('input', (e) => {
            body = e.target.value;
        });
    }
});

//this will transcribe speech events
function transcribe(event) {

    // transcript <- what the user just said
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join("")

    // if word is final
    if (event.results[0].isFinal) {

        if (history.location.pathname === '/compose') {

            //switcher of current command
            if (transcript.includes(commands.TITLE)) {
                currentCommand = commands.TITLE;
            } else if (transcript.includes(commands.BODY)) {
                currentCommand = commands.BODY;
            }

            //process words
            if (currentCommand === commands.TITLE) {
                title += (transcript + ' ');
                title = title.replace(/dear diary title/g, ""); //replace all instances of 'dear diary title
                document.getElementById('title').value = title; //change the value

            } else if (currentCommand === commands.BODY) {
                body += (transcript + ' ');
                body = body.replace(/dear diary body/g, "");
                document.getElementById('body').value = body;
            }

        } else if (history.location.pathname === "/") {
            if (transcript.includes(commands.GETSTARTED)) {
                history.push("/gallery");
            }
        } else if (history.location.pathname === "/gallery") {
            if (transcript.includes(commands.COMPOSE)) {
                history.push("/compose");
            }
        }
    }
}