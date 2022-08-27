import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromDashboard from '../dashboard/store/dashboard.reducer';
import * as fromUI from "../ui/store/ui.reducer";
import * as fromBlogs from '../shared/store/blogs.reducer';

export interface AppState {
    auth: fromAuth.State,
    dashboard: fromDashboard.State,
    ui: fromUI.State,
    blogs: fromBlogs.State,
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    dashboard: fromDashboard.dashboardReducer,
    ui: fromUI.UIReducer,
    blogs: fromBlogs.blogsReducer,
}

// Get Dashboard State
export const getDashboardState = createFeatureSelector<fromDashboard.State>('dashboard');
export const getUserBlogs = createSelector(getDashboardState, fromDashboard.fetchUserBlogs);
export const getUserEditBlog = createSelector(getDashboardState, fromDashboard.fetchEditBlog);

// UI State
export const getUIState = createFeatureSelector<fromUI.State>('ui');
export const getIsLoading = createSelector(getUIState, fromUI.UILoadingState);
export const getStatusMessage = createSelector(getUIState, fromUI.UIStatusMessageState);

// Blogs
export const getBlogsState = createFeatureSelector<fromBlogs.State>('blogs');
export const getAllBlogs = createSelector(getBlogsState, fromBlogs.getBlogs);
export const selectedBlog = createSelector(getBlogsState, fromBlogs.getSelectedBlog);
