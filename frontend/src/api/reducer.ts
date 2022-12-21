import type {State,Action} from '../utils/types'
import { ActionType } from "../utils/types";

const reducer = (state:State, action:Action) => {
    switch (action.type) {

        case ActionType.LOAD_MAINCONTRACT :
            return { ...state, maincontractState: ActionType.LOAD_MAINCONTRACT };

        case ActionType.SET_MAINCONTRACT:
            return { ...state, maincontract: action.payload, maincontractState: 'READY' };

        case ActionType.MAINCONTRACT_ERROR:
            return { ...state, maincontract: null, maincontractState: 'ERROR' };

        case ActionType.SET_LOADING:
            return { ...state, loading: action.payload };

        case ActionType.SET_IFRAME:
            return { ...state, iframeList: action.payload };


        default:
            throw new Error(`Unknown type: ${action.type}`);
    }
};
export default reducer
