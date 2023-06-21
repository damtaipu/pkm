import { createReducer, on } from "@ngrx/store";
import { comment, removeComment } from "../../action/comment/comment.actions";

export const initialState: any = [];
let auxCommentRespository: any = [];

export const commentReducer = createReducer(
  initialState,
  on(comment, (state, data) =>{    
    let objComment = {
        comment: data.text,
        id: data.id,
        name: data.name
    }
    auxCommentRespository.push(objComment);
    state = [...auxCommentRespository];
    return state
  }),
  on(removeComment, (state, data) =>{    
    auxCommentRespository = auxCommentRespository.filter((r: any) => Number(r.id) !== data.id);
    state = [...auxCommentRespository];
    return state
  })
);