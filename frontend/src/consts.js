import metaWasm from "./wasm/designer_state.meta.wasm";

const ADDRESS = {
  NODE: process.env.REACT_APP_NODE_ADDRESS ,
  programId: process.env.REACT_APP_PROGRAM_ID,
  metaWasm:metaWasm,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

export { ADDRESS, LOCAL_STORAGE };
