import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { CreateBlogComponent } from "./create-blog/create-blog.component";
import { DashboardComponent } from "./dashboard.component";
import { EditBlogComponent } from "./edit-blog/edit-blog.component";

const routes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'edit', component: EditBlogComponent},
    {path: 'new', component: CreateBlogComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule{}