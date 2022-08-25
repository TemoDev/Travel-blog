import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromDashboard from '../dashboard/store/dashboard.reducer';

export interface AppState {
    auth: fromAuth.State,
    dashboard: fromDashboard.State
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    dashboard: fromDashboard.dashboardReducer,
}

export const getDashboardState = createFeatureSelector<fromDashboard.State>('dashboard');
export const getUserBlogs = createSelector(getDashboardState, fromDashboard.fetchUserBlogs);
export const getUserEditBlog = createSelector(getDashboardState, fromDashboard.fetchEditBlog);