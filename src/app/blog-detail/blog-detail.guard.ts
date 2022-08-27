import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class BlogDetailGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any{
        this.store.select(fromApp.selectedBlog).subscribe((res: string | null | undefined) => {
            if(!!res) {
                return true
            }else{
                this.router.navigate(['blogs']);
                return false;
            }
        })
    }
}