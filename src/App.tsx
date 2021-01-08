import * as React from "react";
import firebase from "firebase";
import db from "./utils/firebaseUtils";
import { MessageTypes } from "./types";
import "./App.css";

const App = () => {
  const [showIframe, setShowIframe] = React.useState(true);
  const [uriMeet, setUriMeet] = React.useState("");
  const [uriForms, setUriForms] = React.useState("");
  let currentTab : any;

  React.useEffect(() => {
    chrome.runtime.sendMessage({ type: "REQ_IFRAME_STATUS" });

    chrome.runtime.onMessage.addListener((message: MessageTypes) => {
      switch (message.type) {
        case "IFRAME_STATUS":
          setShowIframe(message.showIframe);
          break;
        default:
          break;
      }
    });
  }, []);

  // Validação pra url correta
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0];
    if (currentTab.url.includes("https://meet.google.com/")) {
      setUriMeet(currentTab.url);
    }else {
      setUriMeet("");
    }
  });

  const addForm = (event: any) => {
    event.preventDefault();

    db.collection("Forms").add({
      uriMeet: uriMeet,
      uriForms: uriForms,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setUriMeet("");
    setUriForms("");
  };

  const toggleIframe = () => {
    chrome.runtime.sendMessage({
      type: "TOGGLE_IFRAME",
      showIframe: !showIframe,
    });
  };

  return (
    <main>
      {uriMeet ? (
        <div>
          <h1>Orizonbrasil Forms</h1>
          <form>
            <input
              type="text"
              placeholder="Insirá o link do GoogleMeet"
              value={uriMeet}
              onChange={(event) => setUriMeet(event.target.value)}
            />
            <input
              type="text"
              placeholder="Insirá o link do GoogleForms"
              value={uriForms}
              onChange={(event) => setUriForms(event.target.value)}
            />

            <div className="buttonContainer">
              <button className="buttonAdd" disabled={!uriForms} type="submit" onClick={addForm}>
                Adicionar
              </button>
              <button className="buttonToggle" onClick={toggleIframe}>
                {showIframe ? "Desabilitar Iframe!" : "Ativar Iframe!"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1>Google Meet não encontrado!</h1>
      )}
    </main>
  );
};

export default App;
