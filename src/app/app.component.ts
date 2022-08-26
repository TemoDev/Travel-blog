import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as UIActions from './ui/store/ui.actions';
import * as fromApp from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'travel-blog';

  statusMessage: string | null = null;

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit(): void {
    this.store.select(fromApp.getStatusMessage).subscribe(res => {
      if(res) {
        console.log(res);
        this.statusMessage = res;
        setTimeout(() => {
          this.store.dispatch(UIActions.setStatusMessage({message: null}));
          this.statusMessage = null;
        }, 2500);
      }
    })
  }

}
