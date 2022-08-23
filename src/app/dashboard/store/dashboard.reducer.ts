import { createReducer, on } from '@ngrx/store';
import * as dashboardActions from '../store/dashboard.actions';
import { Blog } from '../../shared/blog.model';
 
export interface State {
    blogs: Blog[] | null;
}

const initialState: State = {
    blogs: null
}

export const dashboardReducer = createReducer(
    initialState,
    on(dashboardActions.addBlog, (state, action): any => {
        return {...state, blogs: state.blogs?.push(action.blog)}
    })
)