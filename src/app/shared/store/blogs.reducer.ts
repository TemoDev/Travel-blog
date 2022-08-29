import { Statement } from "@angular/compiler";
import { createReducer, on } from "@ngrx/store";
import { Blog } from "../blog.model";
import * as blogsActions from './blogs.action';

export interface State {
    blogs: Blog[];
    selectedBlog: Blog | null;
}

const initialState: State = {
    blogs: [],
    selectedBlog: null,
}

export const blogsReducer = createReducer(
    initialState,
    on(blogsActions.getBlogs, (state, action) => {
        return {...state, blogs: action.blogs};
    }),
    on(blogsActions.getSelectedBlog, (state, action) => {
        return { ...state, selectedBlog: action.blog };
    }),
    on(blogsActions.removeSelectedBlog, (state) => {
        return {...state, selectedBlog: null};
    })
)

export const getBlogs = (state: State) => { return state.blogs };
export const getSelectedBlog = (state: State) => {return state.selectedBlog};