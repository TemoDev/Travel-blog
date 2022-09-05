import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Blog } from '../shared/blog.model';
import * as fromApp from "../store/app.reducer";
import * as blogsActions from '../shared/store/blogs.action'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs$!: Observable<Blog[]>;
  // Blogs with Photos
  blogsArr: Blog[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.select(fromApp.getAllBlogs).subscribe(res => {
      res.forEach(el => {
          if(this.blogsArr.length < 4 && el.bgImg) {
            this.blogsArr.push(el);
          }
        })
    });
  }

  // To blog detail click action
  toBlogDetail(blog: Blog) {
    this.store.dispatch(blogsActions.getSelectedBlog({blog: blog}));
  }

}
