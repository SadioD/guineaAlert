import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-app-view',
    templateUrl: './app-view.component.html',
    styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit, OnDestroy {
    // VARIABLES + PAGES de l'APP + CONSTR + INIT ----------------------------------------------------------------------------------------
    user: any;
    userSubscription: Subscription;
    public appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Paramètres', url: '/settings', icon: 'cog' }
    ];

    // Injection de services dans le constructeur
    constructor(private authService: AuthService) { }

    // Initialisation de l'App en liant l'User au subject du Service AuthService
    ngOnInit() {
        this.userSubscription = this.authService.userSubject.subscribe(
            (sessionUser: Object) => {
                this.user = sessionUser;
            },
            (error) => {
                console.log(error);
            }
        );
        this.authService.emitUserSubject();
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES + DESTROY ----------------------------------------------------------------------------------------------------------------
    // Vérifie l'état de connexion de l'user
    isAuth() {
        return this.user.status;
    }
    // On Destroy
    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }// -----------------------------------------------------------------------------------------------------------------------------------
}
