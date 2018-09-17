import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    userSubject = new Subject<User>();
    private user: User = new User(1, 'John DOE', 'abc@yahoo.fr', false);

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
