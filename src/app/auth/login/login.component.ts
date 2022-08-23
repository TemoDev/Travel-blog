import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  innerWidth!: number;
  loginForm!: FormGroup;
  errorMessage!: string | null;
  constructor(private afAuth: AngularFireAuth, private store: Store<fromApp.AppState>, private router:Router) { }

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
    console.log(this.loginForm);
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.loginForm.reset();
    this.afAuth.signInWithEmailAndPassword(email, password).then(result => {
      console.log(result);
      this.store.dispatch(authActions.setUser({email: result.user!.email, uid: result.user!.uid}));
      this.router.navigate(['/home']);
    }).catch(err => {
      this.errorMessage = err.message;
    })  }

  closeToast() {
    document.querySelector('.toast')?.classList.replace('show','hide');
    this.errorMessage = null;
  }


}
