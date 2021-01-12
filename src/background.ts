import { MessageTypes } from "./types";
import db from "./utils/firebaseUtils";

let actualIframe: any;
let showIframe = false;

const sendIframeStatus = (showIframe: boolean) => {
  const message = { type: "IFRAME_STATUS", showIframe };

  chrome.runtime.sendMessage(message);

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message);
      }
    });
  });
};

const sendActualIframe = () => {
  db.collection("Forms")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      const result = snapshot.docs.map((doc) => ({
        id: doc.id,
        uriMeet: doc.data().uriMeet,
        uriFirstForm: doc.data().uriFirstForm,
        uriSecondForm: doc.data().uriSecondForm,
      }));

      actualIframe = result;
    });

  const response = { type: "HOOK_IFRAME", getHook: actualIframe };

  chrome.runtime.sendMessage(response);

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, response);
      }
    });
  });
};

chrome.storage.local.get("showIframe", (res) => {
  if (res["showIframe"]) {
    showIframe = true;
  } else {
    showIframe = false;
  }
});

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  switch (message.type) {
    case "REQ_IFRAME_STATUS":
      sendIframeStatus(showIframe);
      break;
    case "REQ_HOOK_IFRAME_STATUS":
      sendActualIframe();
      break;
    case "TOGGLE_IFRAME":
      showIframe = message.showIframe;
      chrome.storage.local.set({ showIframe: showIframe });
      sendIframeStatus(showIframe);
      break;
    case "HOOK_IFRAME":
      actualIframe = message.getHook;
      chrome.storage.local.set({ actualIframe: actualIframe });
      sendActualIframe();
      break;
    default:
      break;
  }
});
