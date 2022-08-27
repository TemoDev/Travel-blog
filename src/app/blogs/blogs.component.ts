import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as blogsActions from '../shared/store/blogs.action';
import { Observable } from 'rxjs';
import { Blog } from '../shared/blog.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs$!: Observable<Blog[]>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.blogs$ = this.store.select(fromApp.getAllBlogs);
  }

  toBlogDetail(id: string | undefined) {
    this.store.dispatch(blogsActions.getSelectedBlog({blogId: id}));
  }

}
