import * as React from "react";
import { useEffect, useState } from "react";

import firebase from "firebase";

import db from "./utils/firebaseUtils";
import { MessageTypes } from "./types";

import "./App.css";

const App = () => {
  const [showIframe, setShowIframe] = useState(true);
  const [uriMeet, setUriMeet] = useState("");
  const [firstForm, setFirstForm] = useState("");
  const [secondForm, setSecondForm] = useState("");
  const [actualLink, setActualLink] = useState("");
  let currentTab: any;

  useEffect(() => {
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

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    currentTab = tabs[0];
    if (currentTab.url.includes("https://meet.google.com/")) {
      setActualLink(currentTab.url);
    } else {
      setActualLink("");
    }
  });

  const addForm = (event: any) => {
    console.log("entrou");
    event.preventDefault();

    db.collection("Forms").add({
      uriMeet: uriMeet,
      uriFirstForm: firstForm,
      uriSecondForm: secondForm,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setUriMeet("");
    setFirstForm("");
    setSecondForm("");
  };

  const toggleIframe = () => {
    chrome.runtime.sendMessage({
      type: "TOGGLE_IFRAME",
      showIframe: !showIframe,
    });
  };

  return (
    <main>
      {actualLink ? (
        <div>
          <img
            src="https://www.orizonbrasil.com.br/assets/img/general/logob.png"
            alt="Logo Orizon"
          />
          <form>
            <div className="form-input">
              <label>Link da meet atual</label>
              <input
                type="text"
                placeholder="Insira o link da Google Meet"
                defaultValue={uriMeet ? uriMeet : actualLink}
                onChange={(event) => setUriMeet(event.target.value)}
              />
            </div>
            <div className="form-input">
              <label>Link do formulário inicial</label>
              <input
                type="text"
                placeholder="Insira o link do Google Forms"
                value={firstForm}
                onChange={(event) => setFirstForm(event.target.value)}
              />
            </div>
            <div className="form-input">
              <label>Link do formulário final</label>
              <input
                type="text"
                placeholder="Insira o link do Google Forms"
                value={secondForm}
                onChange={(event) => setSecondForm(event.target.value)}
              />
            </div>
            <button
              className="btn-add"
              disabled={!uriMeet || !firstForm || !secondForm}
              type="submit"
              onClick={addForm}
            >
              Adicionar
            </button>
          </form>
          <div className="btn-iframe">
            <p>{showIframe ? "Iframe habilitado" : "Iframe desabilitado"}</p>
            <div id="toggle">
              <input
                type="checkbox"
                name="checkbox1"
                id="checkbox1"
                className="ios-toggle"
                checked={showIframe}
                onClick={toggleIframe}
              />
              <label htmlFor="checkbox1" className="checkbox-label"></label>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="">Google Meet não encontrado!</h1>
      )}
    </main>
  );
};

export default App;
