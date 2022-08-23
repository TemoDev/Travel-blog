import { createAction, props } from "@ngrx/store";
import { Blog } from "src/app/shared/blog.model";

export const addBlog = createAction("[Dashboard] Add Blog", props<{blog: Blog}>());