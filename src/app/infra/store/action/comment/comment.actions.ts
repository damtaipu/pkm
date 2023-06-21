import { createAction, props } from "@ngrx/store";

export const comment = createAction('[Comment pokemon] Comment', props<{text: string, id: number, name: string}>());
export const removeComment = createAction('[Remove comment pokemon] Remove', props<{id: number}>());