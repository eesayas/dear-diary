// import "./App.css";
import diary from "./assets/diary.png";
import Editor from "./Editor";

const App = () => {
  return (
    <div id="container">
      <img src={diary} width={220} id="logo" />
      <h1>Dear Diary</h1>
      <h3>A speech-to-text web app. Say it, I write it.</h3>
      <br />
      <Editor />
      <br />
      <div id="footer">
        Created by&nbsp;
        <a href="https://isaiasbriones.com/" target="_blank">
          Isaias Briones
        </a>
      </div>
    </div>
  );
};

export default App;
