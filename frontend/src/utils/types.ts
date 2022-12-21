import {Dispatch} from "react";

interface signObj{
    creator?:string
    saveAt?:number
    base64:string
    left:number
    page:number
    top:number
}

export type State = {
    loading: string | null
    mainContract:any
    maincontractState: string | null
    iframeList: signObj[] | null
}

export type Action = {
    type: ActionType
    payload?: any
}


export interface ContextType {
    state: State
    dispatch: Dispatch<Action>
}

export const enum ActionType {
    SET_LOADING = 'SET_LOADING',
    LOAD_MAINCONTRACT = 'LOAD_MAINCONTRACT',
    SET_MAINCONTRACT = 'SET_MAINCONTRACT',
    MAINCONTRACT_ERROR = 'MAINCONTRACT_ERROR',
    SET_IFRAME = 'SET_IFRAME',

}