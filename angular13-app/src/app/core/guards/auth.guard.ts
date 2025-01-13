import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { NavigationService } from "../services/navigation.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private navigationService: NavigationService) {}
    
    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;            
        } else {
            this.navigationService.redirectToLogin();
            return false;
        }
    }
}
