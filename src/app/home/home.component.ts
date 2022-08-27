import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Blog } from '../shared/blog.model';
import * as fromApp from "../store/app.reducer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs$: Blog[] = [];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select(fromApp.getAllBlogs);
  }

}
