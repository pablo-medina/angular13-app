import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustContentHeight();
  }  

  ngOnInit(): void {
    this.adjustContentHeight();
  }

  constructor() { }

  private adjustContentHeight(): void {
    const windowHeight = window.innerHeight;

    const navbar = document.getElementById('app-navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const contentHeight = windowHeight - navbarHeight;

    const content = document.getElementById('app-content');
    if (content) {
      content.style.height = `${contentHeight}px`;
    }
  }
}
