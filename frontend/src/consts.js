import metaWasm from "./wasm/designer_state.meta.wasm";

const ADDRESS = {
  NODE: window.configInfo.NODE_ADDRESS ,
  programId: window.configInfo.PROGRAM_ID,
  apiKey:process.env.REACT_APP_FLEEK_API_KEY,
  apiSecret:process.env.REACT_APP_FLEEK_API_SECRET,
  metaWasm:metaWasm,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

export { ADDRESS, LOCAL_STORAGE };
