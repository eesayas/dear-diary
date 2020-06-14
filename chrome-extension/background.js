chrome.runtime.onConnect.addListener((port) => {
    console.assert(port.name == "Dear Diary");
    port.onMessage.addListener(function(msg){
        console.log(msg.message);
        if(msg.message === 'go to website'){
            chrome.tabs.create({'url': 'http://localhost:8000/'}); //temp
        }
    });
});