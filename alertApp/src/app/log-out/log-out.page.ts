import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.page.html',
  styleUrls: ['./log-out.page.scss'],
})
export class LogOutPage implements OnInit {
    // VARIABLES + CONSTR + INIT ----------------------------------------------------------------------------------------
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES + DESTROY ----------------------------------------------------------------------------------------------------------------
    // Déconnecte l'User
    onLogOut() {
        this.authService.logUserOut().then(() => {
            this.router.navigate(['/authentification']);
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
