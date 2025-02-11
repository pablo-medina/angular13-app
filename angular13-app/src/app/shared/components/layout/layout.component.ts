import { Component, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sidenavOpened = false;
  isMobile: boolean = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.updateMobileStatus();
  }

  public logout(): void {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  checkIfMobile(): void {
    this.updateMobileStatus();
  }

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event) {
    this.updateMobileStatus();
  }

  private updateMobileStatus(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    this.isMobile = (window.innerWidth <= 768) || /android|iphone|ipod|windows phone|blackberry|webos/.test(userAgent);
  }

  closeSidenav(sidenav: MatSidenav): void {
    if (this.isMobile) {
      this.sidenavOpened = false;
      sidenav.close().then(() => { });
    }
  }
}
