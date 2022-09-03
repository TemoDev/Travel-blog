import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { StoreModule } from "@ngrx/store";
import { authReducer } from './store/auth.reducer';
import { AngularFireModule } from "@angular/fire/compat";
import { SpinnerComponent } from "../ui/spinner/spinner.component";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        SignupComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AuthRoutingModule,
        AngularFireModule,
        StoreModule.forFeature('auth', authReducer)
    ],
    exports: [],
})
export class AuthModule {}