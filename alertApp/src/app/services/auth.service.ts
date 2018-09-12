import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    userSubject = new Subject<Object>();
    private user: any = {
        pseudo: 'John DOE',
        status: false
    };

    constructor() {
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Emet le Subject
    emitUserSubject() {
        this.userSubject.next(this.user);
    }
    // Vérifie l'authentification de l'User
    isAuth() {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.user.status);
        });
    }
    // Authentifie l'User
    logUserIn() {
        return new Promise<boolean>((resolve, reject) => {
            this.user.status = true;
            this.emitUserSubject();

            // A suuprimer (juste pour simuler l'appel API)
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }
    // Déconnecte l'User
    logUserOut() {
        return new Promise<boolean>((resolve, reject) => {
            this.user.status = false;
            this.emitUserSubject();

            // A suuprimer (juste pour simuler l'appel API)
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
