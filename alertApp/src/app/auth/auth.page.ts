import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    // VARIABLES +  CONSTR + INIT -------------------------------------------------------------------------------------------------------
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES -------------------------------------------------------------------------------------------------------------------------
    // Authentifie l'User
    onLogIn() {
        this.authService.logUserIn().then(() => {
            this.router.navigate(['/home']);
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
