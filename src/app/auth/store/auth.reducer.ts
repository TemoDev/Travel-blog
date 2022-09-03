import { createReducer, on } from "@ngrx/store";
import * as authActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';

export interface State {
    isAuthenticated: boolean;
    uid: string | null;
    email: string | null;
    userPhoto: string | null | undefined;
}

const initialState: State = {
    isAuthenticated: false,
    email: null,
    uid: null,
    userPhoto: null
}

export const authReducer = createReducer(
    initialState,
    on(authActions.setUser, (state, action) => {
        return {...state, isAuthenticated: true, email: action.email ,uid: action.uid, userPhoto: action.userPhoto };
    }),
    on(authActions.removeUser, (state) => {
        return {...state, isAuthenticated: false, email: null ,uid: null, userPhoto: null};
    })
)