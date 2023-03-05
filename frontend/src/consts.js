import metaWasm from "./wasm/designer_state.meta.wasm";

const CONFIG_INFO = {
  NODE: window.configInfo.NODE_ADDRESS ,
  programId: window.configInfo.PROGRAM_ID,
  apiKey:"U2FsdGVkX18ZoTNYLwInHNSDq7BQ3oYS1vjNC5XKJIFAJEV1unA9k+gFrXp/RHVl",
  apiSecret:"U2FsdGVkX18P6lQYlnFBVRobAj4AZ+KFfQ10VVnA/wpdGL4WNy0JPPVAx42uyvCcaYO0cWP4bLwEKIwojWIFiQ==",
  metaWasm:metaWasm,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

export { CONFIG_INFO, LOCAL_STORAGE };
