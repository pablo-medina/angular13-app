import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NavigationService } from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';  

  constructor(
    private navigationService: NavigationService
  ) { }

  login(username: string, password: string): Observable<any> {
    this.setToken('123456');
    return of(true);
  }

  logout(): void {
    this.clearToken();
    this.navigationService.redirectToLogin();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
