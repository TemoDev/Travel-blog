import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('navBtn') navBtn!: ElementRef<HTMLDivElement>;
  @ViewChild('navContent') navContent!: ElementRef<HTMLDivElement>;
  innerWidth!: number;
  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  toggleNav() {
    this.navBtn.nativeElement.classList.toggle('burger-line--active');
    this.navContent.nativeElement.classList.toggle('nav-content-container-active');
  }

}

