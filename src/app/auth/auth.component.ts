import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
//   styleUrls: ['./login.component.scss']
})
export class AuthComponent implements OnInit {
    innerWidth!: number;
    constructor() { }
  
    ngOnInit(): void {
      this.innerWidth = window.innerWidth;
    }
    @HostListener('window:resize', ['$event'])
    onResize() {
      this.innerWidth = window.innerWidth;
    }
}
