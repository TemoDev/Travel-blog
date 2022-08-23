import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/auth.reducer';
import * as authActions from '../store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  innerWidth!: number;
  signupForm!: FormGroup;
  errorMessage!: string | null;

  constructor(private afAuth: AngularFireAuth, private store: Store<fromAuth.State>, private router: Router) { }

  ngOnInit(): void {
    // Find initial width of the viewport
    this.innerWidth = window.innerWidth;
    // Define Form structure
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  onFormSubmit() {
    console.log(this.signupForm);
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    this.signupForm.reset();
    this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      console.log(result);
      this.store.dispatch(authActions.setUser({email: result.user!.email,uid: result.user!.uid}));
      this.router.navigate(['/home']);
    }).catch(err => {
      this.errorMessage = err.message;
      console.log(this.errorMessage)
    })
  }

  closeToast() {
    document.querySelector('.toast')?.classList.replace('show','hide');
    this.errorMessage = null;
  }

}
