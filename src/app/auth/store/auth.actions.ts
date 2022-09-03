import { createAction, props } from "@ngrx/store";

export const setUser = createAction('[Auth] Set User', props<{email: string | null,uid: string, userPhoto: null | string | undefined}>());
export const removeUser = createAction('[Auth] Remove User');