import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Blog } from '../shared/blog.model';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blog$!: Observable<Blog | null>;

  constructor(private store: Store<fromApp.AppState>, private db: AngularFirestore) { }

  // Avoid nested subscriptions ? mergeMap, switchMap?
  ngOnInit(): void {
    this.blog$ = this.store.select(fromApp.selectedBlog);
  }

}
