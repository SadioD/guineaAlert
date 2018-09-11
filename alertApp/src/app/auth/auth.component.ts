import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    // VARIABLES + CONSTR + ONINIT ------------------------------------------------------------------------------------------------------
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES --------------------------------------------------------------------------------------------------------------------------
    // Authentifie l'User
    onLogIn() {
        this.authService.logUserIn().then(() => {
            //this.router.navigate(['/home']);
            //console.log('yes');
        });
        
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
