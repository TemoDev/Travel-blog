import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from '../store/dashboard.actions';
import { Blog } from '../../shared/blog.model';
 
export interface State {
    userBlogs: Blog[];
    editBlog: Blog | null;
}

const initialState: State = {
    userBlogs: [],
    editBlog: null,
}

export const dashboardReducer = createReducer(
    initialState,
    on(dashboardActions.setUserBlogs, (state, action): any => {  
        return {...state, userBlogs: [...action.blogs]}
    }),
    on(dashboardActions.clearUserBlogs, (state): any => {  
        return {...state, userBlogs: []}
    }),
    on(dashboardActions.selectEditBlog, (state, action) => {
        return {...state, editBlog: action.blog}
    }),
    on(dashboardActions.removeSelectedEditBlog, (state) => {
        return {...state, editBlog: null}
    }),
);

export const fetchUserBlogs = (state: State) => { return state.userBlogs }
export const fetchEditBlog = (state: State) => { return state.editBlog }


