import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Blog } from './shared/blog.model';

import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UIActions from './ui/store/ui.actions';
import * as fromApp from './store/app.reducer';
import * as blogsActions from './shared/store/blogs.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'travel-blog';

  statusMessage: string | null = null;

  constructor(private store: Store<fromApp.AppState>, private db: AngularFirestore){}

  ngOnInit(): void {
    this.store.select(fromApp.getStatusMessage).subscribe(res => {
      if(res) {
        this.statusMessage = res;
        setTimeout(() => {
          this.store.dispatch(UIActions.setStatusMessage({message: null}));
          this.statusMessage = null;
        }, 2500);
      }
    });

    this.db.collection('blogs').snapshotChanges().pipe(
      map((result) => {
        return result.map(doc => {
          return {
              blogId: doc.payload.doc.id,
              ...doc.payload.doc.data() as Blog,
          }
      })      
    })
    ).subscribe((blogs: Blog[]) => {
      this.store.dispatch(blogsActions.getBlogs({blogs: blogs}));
    })

  }

}
