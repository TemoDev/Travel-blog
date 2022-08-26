import { createAction, props } from "@ngrx/store";

export const startLoading = createAction("[UI] Start Loading");
export const stopLoading = createAction("[UI] Stop Loading");
export const setStatusMessage = createAction("[UI] Set Status Message", props<{message: string | null}>())