import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BlogsRoutingModule } from "./blogs-routing.module";
import { BlogsComponent } from "./blogs.component";

@NgModule({
    declarations: [
        BlogsComponent,
    ],
    imports: [
        CommonModule,
        BlogsRoutingModule
    ],
})
export class BlogsModule{}