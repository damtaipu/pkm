import { createReducer, on } from "@ngrx/store";
import { favorite, removeFavorite } from "../../action/favorite/favorite.actions";

export const initialState: any = [];
let auxFavoriteRespository: any = [];

export const favoriteReducer = createReducer(
  initialState,
  on(favorite, (state, data) =>{    
    auxFavoriteRespository.push(data.id);
    state = [...auxFavoriteRespository];
    return state
  }),
  on(removeFavorite, (state, data) =>{    
    auxFavoriteRespository = auxFavoriteRespository.filter((r: any) => Number(r) !== Number(data.id));
    state = [...auxFavoriteRespository];
    return state
  })
);