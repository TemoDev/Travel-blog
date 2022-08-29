import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Blog } from '../shared/blog.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({
    providedIn: 'root'
})
export class BlogDetailGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | any{
        this.store.select(fromApp.selectedBlog).subscribe((res: Blog | null) => {
            if(!!res) {
                return true
            }else{
                this.router.navigate(['blogs']);
                return false;
            }
        })
    }
}