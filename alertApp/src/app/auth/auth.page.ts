import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    // VARIABLES +  CONSTR + INIT -------------------------------------------------------------------------------------------------------
    constructor(private userService: UserService , private router: Router) { }

    ngOnInit() {
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES -------------------------------------------------------------------------------------------------------------------------
    // Authentifie l'User
    onLogIn() {
        this.userService.logUserIn().then(() => {
            this.router.navigate(['/home']);
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
