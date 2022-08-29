import { createAction, props } from "@ngrx/store";
import { Blog } from "src/app/shared/blog.model";

// Get all blogs from Firestore
export const getBlogs = createAction("[Blogs] Fetch Blogs", props<{blogs: Blog[]}>());
export const getSelectedBlog = createAction("[Blogs] Get Selected Blog id", props<{blog: Blog | null}>());
export const removeSelectedBlog = createAction("[Blogs] Remove Blog id");