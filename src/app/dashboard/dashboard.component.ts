import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userEmail!: string | null; 
  isAuthenticated: boolean = false;
  constructor(private store: Store<fromApp.AppState>, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(state => {
      this.userEmail = state.email;
      this.isAuthenticated = state.isAuthenticated;
    })
  }

  logout(){
    this.afAuth.signOut().then((res) => {
      this.store.dispatch(authActions.removeUser());
      console.log(res);
    })
  }

}
