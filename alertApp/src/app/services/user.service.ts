import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    // Table User (avec les infos personnelles du User)
    user: User = new User(
        1,
        'Ahmed',
        'DIALLO',
        'dialloamadou1@yahoo.fr',
        '********',
        'standard_version',  // Version de l'App download (Standard : gratuite Ou Premium : Payante)
        true
    );
    // Le Subject de la variable user
    userSubject: Subject<User>;

    constructor() {
        this.getUserData();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Emet le UserSubject
    emitUserSubject() {
        this.userSubject.next(this.user);
    }
    // Permet de recupérer les données personnelles du User depuis la BDD
    getUserData() {
        // Appel http vers BDD => if (!reponse), consoleLog(error) => reject(false)
    }
    // Permet de modifier les préférences du User
    updateUserPref(userPref: User) {
        return new Promise<boolean>((resolve, reject) => {
            if (userPref.pseudo && userPref.firstName && userPref.email && userPref.password) {
                this.user.pseudo    = userPref.pseudo;
                this.user.firstName = userPref.firstName;
                this.user.email     = userPref.email;
                this.user.password	= userPref.password;

                // Appel http vers BDD => if (!reponse), consoleLog(error) => reject(false)

                // On émet la mise à jour et resout la promise
                this.emitUserSubject();
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
    // Déconnecter l'User
    logUserOut() {
        return new Promise<boolean>((resolve, reject) => {
            this.user.status = false;
            // Appel http vers BDD => if (!reponse), consoleLog(error) => reject(false)

            // On émet la mise à jour et resout la promise
            this.emitUserSubject();
            resolve(true);
        });
    }
    // Authentifie l'User
    logUserIn() {
        return new Promise<boolean>((resolve, reject) => {
            this.user.status = true;
            // Appel http vers BDD => if (!reponse), consoleLog(error) => reject(false)

            // On émet la mise à jour et resout la promise
            this.emitUserSubject();
            resolve(true);
        });
    }
    // Vérifie l'authentification de l'User
    isAuth() {
        return new Promise<boolean>((resolve) => {
            resolve(this.user.status);
        });
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // --------------------------------------------------------------------------------------------------------------------------------------
}
