import { ActionType } from "../utils/types";
import {ADDRESS} from "../consts";


const {programId} = ADDRESS;

let loadMain = false;

export default async function mainConnect(state, dispatch) {
    const { maincontractState} = state;

    const asyncLoadMain = async () => {
        // try {
        //     maincontract = await ConnectContract(api, 'main', mainAddress.market);
        //     dispatch({type: ActionType.SET_MAINCONTRACT, payload: maincontract});
        // } catch (e) {
        //     console.error(e);
        //     dispatch({type: ActionType.MAINCONTRACT_ERROR});
        // }
    };
    if (maincontractState !== ActionType.LOAD_MAINCONTRACT) return;
    // if (loadMain) return dispatch({type: ActionType.SET_MAINCONTRACT, payload: maincontract});
    loadMain = true;
    asyncLoadMain();
}
