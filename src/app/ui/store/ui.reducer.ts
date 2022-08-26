import { createReducer, on } from "@ngrx/store";
import * as UIActions from './ui.actions';

export interface State {
    isLoading: boolean;
    statusMessage: string | null;
}

const initialState: State = {
    isLoading: false,
    statusMessage: null
}

export const UIReducer = createReducer(
    initialState,
    on(UIActions.startLoading, (state) => {
        return {...state, isLoading: true};
    }),
    on(UIActions.stopLoading, (state) => {
        return {...state, isLoading: false};
    }),
    on(UIActions.setStatusMessage, (state, action) => {
        return {...state, statusMessage: action.message}
    })
)

export const UILoadingState = (state: State) => { return state.isLoading };
export const UIStatusMessageState = (state: State) => { return state.statusMessage };