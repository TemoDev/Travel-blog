import { createAction, props } from "@ngrx/store";
import { Blog } from "src/app/shared/blog.model";

export const setUserBlogs = createAction("[Dashboard] Set User blogs", props<{blogs: Blog[]}>());
export const clearUserBlogs = createAction("[Dashboard] Clear user blogs");
export const selectEditBlog = createAction("[Dashboard] Select Edit Blog", props<{blog: Blog}>());
export const removeSelectedEditBlog = createAction("[Dashboard] Remove Edit Blog");
export const updatedBlogs = createAction("[Dashboard] Update Blogs", props<{newBlog: Blog}>());