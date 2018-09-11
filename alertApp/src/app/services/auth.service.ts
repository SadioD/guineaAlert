import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // VARIABLES + CONSTR -------------------------------------------------------------------------------------------------
    userSubject = new Subject<Object>();
    private user: any = {
        pseudo: 'John DOE',
        status: false
    };

    constructor() {
    }
    // ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES -------------------------------------------------------------------------------------------------
    // Emet le Subject
    emitUserSubject() {
        this.userSubject.next(this.user);
    }
    // Authentifie l'User
    logUserIn() {
        return new Promise<boolean>((resolve, reject) => {
            this.user.status = true;
            this.emitUserSubject();

            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
