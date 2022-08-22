import { createReducer, on } from "@ngrx/store";
import * as authActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';

export interface authState {
    isAuthenticated: boolean;
    uid: string | null;
    myBlog: [] | null;
}

export interface State extends fromApp.AppState {
    auth: authState;
}

const initialState: authState = {
    isAuthenticated: false,
    uid: null,
    myBlog: null
}

export const authReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, action) => {
        return {...state, isAuthenticated: true, uid: action.uid };
    }),
    on(authActions.removeUser, (state) => {
        return {...state, isAuthenticated: false, uid: null};
    })
)