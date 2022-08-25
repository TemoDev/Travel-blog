import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {map, Subscription} from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as dashboardActions from './store/dashboard.actions';
import { Blog } from "../shared/blog.model";

@Injectable({providedIn: 'root'})
export class DashboardService{
    private fbSubs: Subscription[] = [];

    constructor(private db: AngularFirestore, private store: Store<fromApp.AppState>){}

    fetchUserBlogs(userUid: string) {
        this.fbSubs.push(
            this.db.collection('users').doc(userUid).collection('userBlogs').snapshotChanges().pipe(
                map(result => {
                    return result.map(doc => {
                        return {
                            blogId: doc.payload.doc.id,
                            ...doc.payload.doc.data(),
                        }
                    })
                })
            )
            .subscribe((blogs: any) => {
                this.store.dispatch(dashboardActions.setUserBlogs({blogs: blogs}));
            })
        )
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(el => el.unsubscribe());
    }

}