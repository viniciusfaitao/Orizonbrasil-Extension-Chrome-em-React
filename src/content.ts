import "./content.css";
import { MessageTypes } from "./types";
import * as $ from "jquery";
import "jqueryui"

let actualIframe: any;
let actualTab: any;
let showIframe = false;

$(() => {
  $( "#draggable" ).draggable();
});

// const toggle = document.getElementById().style.display

const toggleIframe = () => {
  const x = document.getElementById("iframe")!;

  if (x.style.display === "none") {
    x.style.display = "block";
    toggle.innerText = "X";
    toggle.style.fontSize = "20px";
    handle.style.right = "26px";
    handle.style.top = "-35px";
  } else {
    x.style.display = "none";
    toggle.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='32' height='32' viewBox='0 0 226 226' style='fill:#000000;'><defs><linearGradient x1='58.25621' y1='1.75621' x2='162.96012' y2='106.46012' gradientUnits='userSpaceOnUse' id='color-1_eofQ1g5BaAx6_gr1'><stop offset='0' stop-color='#cccccc'></stop><stop offset='1' stop-color='#ffffff'></stop></linearGradient><linearGradient x1='58.25621' y1='58.25621' x2='162.96012' y2='162.96012' gradientUnits='userSpaceOnUse' id='color-2_eofQ1g5BaAx6_gr2'><stop offset='0' stop-color='#cccccc'></stop><stop offset='1' stop-color='#ffffff'></stop></linearGradient><linearGradient x1='58.25621' y1='114.75621' x2='162.96012' y2='219.46012' gradientUnits='userSpaceOnUse' id='color-3_eofQ1g5BaAx6_gr3'><stop offset='0' stop-color='#cccccc'></stop><stop offset='1' stop-color='#ffffff'></stop></linearGradient></defs><g fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='10' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><path d='M0,226v-226h226v226z' fill='none'></path><g><path d='M197.75,70.625h-169.5c-7.76875,0 -14.125,-6.35625 -14.125,-14.125v0c0,-7.76875 6.35625,-14.125 14.125,-14.125h169.5c7.76875,0 14.125,6.35625 14.125,14.125v0c0,7.76875 -6.35625,14.125 -14.125,14.125z' fill='url(#color-1_eofQ1g5BaAx6_gr1)'></path><path d='M197.75,127.125h-169.5c-7.76875,0 -14.125,-6.35625 -14.125,-14.125v0c0,-7.76875 6.35625,-14.125 14.125,-14.125h169.5c7.76875,0 14.125,6.35625 14.125,14.125v0c0,7.76875 -6.35625,14.125 -14.125,14.125z' fill='url(#color-2_eofQ1g5BaAx6_gr2)'></path><path d='M197.75,183.625h-169.5c-7.76875,0 -14.125,-6.35625 -14.125,-14.125v0c0,-7.76875 6.35625,-14.125 14.125,-14.125h169.5c7.76875,0 14.125,6.35625 14.125,14.125v0c0,7.76875 -6.35625,14.125 -14.125,14.125z' fill='url(#color-3_eofQ1g5BaAx6_gr3)'></path></g></g></svg>";
    handle.style.right = "-6px";
    handle.style.top = "-72px";
  }
}

const body = document.getElementsByTagName("body");

const container = document.createElement("div");
container.setAttribute("id","draggable");
container.className = "custom-wiget";

const toggle = document.createElement("div");
toggle.className = "toggle";
toggle.innerText = "X";
toggle.setAttribute("onclick","toggleIframe()")
toggle.onclick = function() {toggleIframe()};

const handle = document.createElement("div");
handle.className = "handle";
handle.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='32' height='32' viewBox='0 0 226 226' style='fill:#000000;'><g fill='none' fill-rule='nonzero' stroke='none' stroke-width='1' stroke-linecap='butt' stroke-linejoin='miter' stroke-miterlimit='0' stroke-dasharray='' stroke-dashoffset='0' font-family='none' font-weight='none' font-size='none' text-anchor='none' style='mix-blend-mode: normal'><path d='M0,226v-226h226v226z' fill='none'></path><g fill='#ffffff'><path d='M14.125,49.4375v56.5h56.5v-56.5zM84.75,49.4375v56.5h56.5v-56.5zM155.375,49.4375v56.5h56.5v-56.5zM28.25,63.5625h28.25v28.25h-28.25zM98.875,63.5625h28.25v28.25h-28.25zM169.5,63.5625h28.25v28.25h-28.25zM14.125,120.0625v56.5h56.5v-56.5zM84.75,120.0625v56.5h56.5v-56.5zM155.375,120.0625v56.5h56.5v-56.5zM28.25,134.1875h28.25v28.25h-28.25zM98.875,134.1875h28.25v28.25h-28.25zM169.5,134.1875h28.25v28.25h-28.25z'></path></g></g></svg>";

const iframe = document.createElement("iframe");
iframe.className="chromeextensionpopup";
iframe.setAttribute("id","iframe");

container.appendChild(toggle);
container.appendChild(handle);
container.appendChild(iframe);


chrome.runtime.sendMessage({ type: "REQ_IFRAME_STATUS" });
chrome.runtime.sendMessage({ type: "REQ_HOOK_IFRAME_STATUS" });

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  switch (message.type) {
    case "IFRAME_STATUS":
      if (message.showIframe) {
        if (!showIframe) {
          body[0]?.prepend(container);
        }
      } else {
        container.parentNode?.removeChild(container);
      }
      showIframe = message.showIframe;
      break;
    case "HOOK_IFRAME":
      actualIframe = message.getHook;
      actualTab = window.location.href; 
      let result = actualIframe.filter((value: { uriMeet: any; }) => value.uriMeet === actualTab)

      console.log("acertou", result ? result.map((value: { uriForms: any; }) => value.uriForms ) : "nada");
      iframe.setAttribute("src",  result ? result.map((value: { uriForms: any; }) => value.uriForms ) : "nada");
  
      break;
    default:
      break;
  }
});