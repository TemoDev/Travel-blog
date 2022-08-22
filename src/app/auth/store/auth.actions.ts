import { createAction, props } from "@ngrx/store";

export const setUser = createAction('[Auth] Set User', props<{uid: string}>());
export const removeUser = createAction('[Auth] Remove User');