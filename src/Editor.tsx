import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const Editor = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(true);

  const debounceListen = useCallback(
    debounce(() => {
      setListening(true);
    }, 1000),
    []
  );

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      setListening(false);
      const results: SpeechRecognitionResultList = event.results;

      let data = "";

      for (const result of results) {
        data += result[0].transcript;
      }

      setTranscript(data);

      debounceListen();
    };

    recognition.start();
  }, []);

  return (
    <div id="editor">
      <div>{transcript}</div>
      {listening && <i>Listening...</i>}
    </div>
  );
};

export default Editor;
