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

  ngOnInit(): void {}
  toggleNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    this.navBtn.nativeElement.classList.toggle('burger-line--active');
    this.navContent.nativeElement.classList.toggle('nav-content-container-active');
    navLinks?.forEach((el) => {
      el.addEventListener('click', () => { 
        this.navBtn.nativeElement.classList.remove('burger-line--active');
        this.navContent.nativeElement.classList.remove('nav-content-container-active');
      })
    })
  }

}

