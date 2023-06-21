import { createAction, props } from "@ngrx/store";

export const favorite = createAction('[Favorite pokemon] Favorite', props<{id: number}>());
export const removeFavorite = createAction('[Remove favorite pokemon] Remove', props<{id: number}>());