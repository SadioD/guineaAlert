import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.page.html',
  styleUrls: ['./log-out.page.scss'],
})
export class LogOutPage implements OnInit {
    // VARIABLES + CONSTR + INIT ----------------------------------------------------------------------------------------
    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES + DESTROY ----------------------------------------------------------------------------------------------------------------
    // Déconnecte l'User
    onLogOut() {
        this.userService.logUserOut().then(() => {
            this.router.navigate(['/authentification']);
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
