import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router
  ) { }

  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}
