import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducer';
import * as UIActions from '../../ui/store/ui.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Blog } from 'src/app/shared/blog.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  innerWidth!: number;
  loginForm!: FormGroup;
  errorMessage!: string | null;

  userBlogs: Blog[] = [];
  constructor(private afAuth: AngularFireAuth, private store: Store<fromApp.AppState>, private router:Router, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    // Get initial viewport size
    this.innerWidth = window.innerWidth;
    // Initialize form 
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }
  // Listen to viewport size changes
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  onFormSubmit() {
    
    // Read Form Values
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    
    // Reset Form
    this.loginForm.reset();
    
    // Sign in
    this.afAuth.signInWithEmailAndPassword(email, password).then(result => {

      // Save data in Dashboard Store
      this.store.dispatch(authActions.setUser({email: result.user!.email, uid: result.user!.uid}));
      this.router.navigate(['/dashboard']);
      // Successfuly logged in
      this.store.dispatch(UIActions.setStatusMessage({message: "You have been successfully logged in!"}));
    }).catch(err => {
      this.errorMessage = err.message;
    })  
  }

  closeToast() {
    document.querySelector('.toast')?.classList.replace('show','hide');
    this.errorMessage = null;
  }


}
