import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';
import * as dashboardActions from './store/dashboard.actions';
import * as UIActions from '../ui/store/ui.actions';
import * as blogActions from '../shared/store/blogs.action';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DashboardService } from './dashboard.service';
import { Blog } from '../shared/blog.model';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userEmail!: string | null; 
  isAuthenticated: boolean = false;
  userUid?: any;
  userBlogs$!: Observable<Blog[]>;
  private authSub!: Subscription;

  constructor(
    private store: Store<fromApp.AppState>, 
    private afAuth: AngularFireAuth, 
    private dashboardService: DashboardService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    // Get user authentication status, email & uid
    this.authSub = this.store.select('auth').subscribe(state => {
      this.userEmail = state.email;
      this.isAuthenticated = state.isAuthenticated;
      this.userUid = state.uid;
    });
    if(this.isAuthenticated) {
      // Fetch user blogs with blogId's from firestore
      this.dashboardService.fetchUserBlogs(this.userUid);
      // Get user blogs from dashboard store
      this.userBlogs$ = this.store.select(fromApp.getUserBlogs);
    }
  }

  logout(){
    // Log user out
    this.afAuth.signOut().then((res) => {
      this.store.dispatch(authActions.removeUser());
      this.store.dispatch(dashboardActions.clearUserBlogs());
      this.store.dispatch(UIActions.setStatusMessage({message: "You have been logged out!"}))
      this.dashboardService.cancelSubscriptions();
    })
  }

  // Select blog which the user wants to edit
  selectEditBlog(blog: Blog) {
    // Set selected edit blog in dashboard store
    this.store.dispatch(dashboardActions.selectEditBlog({blog: blog}));
  }

  toBlogDetail(blog: Blog) {
    this.store.dispatch(blogActions.getSelectedBlog({blog: blog}));
  }

  // Delete Blog
  deleteBlog(blogId: string | undefined) {
    this.db.collection('users').doc(this.userUid).collection('userBlogs').doc(blogId).delete().then(() => {
      this.db.collection('blogs').doc(blogId).delete();
      this.store.dispatch(UIActions.setStatusMessage({message: "Blog has been Deleted"}))
    });
  }

  ngOnDestroy(): void {
    if(this.authSub){
      this.authSub.unsubscribe();
    }
  }

}
