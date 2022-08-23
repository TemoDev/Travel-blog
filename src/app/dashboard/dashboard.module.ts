import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";


@NgModule({
    declarations: [
        DashboardComponent,
        CreateBlogComponent,
        EditBlogComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        AngularFireAuthModule
    ],
    exports: [],
})
export class DashboardModule{}