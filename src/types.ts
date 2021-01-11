interface IframeRequest {
  type: "REQ_IFRAME_STATUS";
}

interface IframeResponse {
  type: "IFRAME_STATUS";
  showIframe: boolean;
}

interface IframeToggle {
  type: "TOGGLE_IFRAME";
  showIframe: boolean;
}

interface IframeHookRequest {
  type: "REQ_HOOK_IFRAME_STATUS";
}

interface IframeHook {
  type: "HOOK_IFRAME";
  getHook: any;
}

interface NewTabRequest {
  type: "REQ_NEWTAB_STATUS";
}

interface NewTabResponse {
  type: "NEWTAB_STATUS";
  url: string;
}

export type MessageTypes = IframeRequest | IframeResponse | IframeToggle | IframeHook | IframeHookRequest| NewTabRequest | NewTabResponse;
