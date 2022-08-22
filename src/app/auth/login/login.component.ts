import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as authActions from '../store/auth.actions';
import * as fromAuth from '../store/auth.reducer';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  innerWidth!: number;
  loginForm!: FormGroup;
  errorMessage!: string | null;
  constructor(private afAuth: AngularFireAuth, private store: Store<fromAuth.authState>) { }

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
      this.store.dispatch(authActions.setUser({uid: result.user!.uid}))
    }).catch(err => {
      this.errorMessage = err.message;
      console.log(this.errorMessage)
    })  }

  closeToast() {
    document.querySelector('.toast')?.classList.replace('show','hide');
    this.errorMessage = null;
  }


}
