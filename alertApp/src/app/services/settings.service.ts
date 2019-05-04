import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSettings } from '../models/app-settings';
import { Pac } from '../models/pac';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    /* Liste des Tables BDD : Symfony Entities - User, AppSettings, UserSettings => this->getUser()->getUserSettings()
            appSettings :       contient la liste des paramètres de l'APP (Gérer les PAC, etc.)
            userSettings :      contient la liste des préférences de l'User (liste des PAC, etc.) */

    // Variable contenant la liste des paramètres de l'APP
    appSettings: AppSettings[];

    // Variable contenant les Préférences de l'User
    userSettings: any;

    // Le Subject de la variable appSettings
    appSettingSubject = new Subject<AppSettings[]>();

    // Le Subject de la variable userSettings
    userSettingSubject = new Subject<any>();

    constructor() {
        this.getAppSettings();
        this.getUserSettings();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Emet l'appSettings Subject
    emitAppSettingSubject() {
        this.appSettingSubject.next(this.appSettings);
    }
    // Emet le UserSetting Subject
    emitUserSetSubject() {
        this.userSettingSubject.next(this.userSettings);
    }
    // Recupère la liste des paramètres de l'APP dans la BDD (Symfony : $entityManager->getEntity(list of AppSettings))
    getAppSettings() {
        this.appSettings = [
            new AppSettings(
                'Personnes A Contacter (PAC)',
                'Modifier votre liste de PAC',
                'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
                '/settings/pac-list',
                'people'
            ),
            new AppSettings(
                'Données Personnelles',
                'Modifier vos données personnelles',
                'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
                '/settings/fonction',
                'cog'
            ),
            new AppSettings(
                'Autre Fonction non définie',
                'Lorem Ipsum Et quia Mesopotamiae tractus',
                'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
                '/settings/autre-fonction',
                'cog'
            )
        ];
    }
    // Recupère les paramètres save par L'User connecté dans la BDD (table UserSettings)
    getUserSettings() {
        this.userSettings = {
            pacList: [
                new Pac(
                    1,
                    'SOUMARE',
                    'Fodé Idi',
                    664463486
                ),
                new Pac(
                    2,
                    'CONDE',
                    'Alpha Ibrahim',
                    622221239
                ),
                new Pac(
                    3,
                    'DOE',
                    'John',
                    622221239
                )
            ],
            secondFeat: true,	    // Définit la fonctionnalité comme étant Activée
            thirdFeat: false	    // Définit la fonctionnalité comme étant Désactivée
        };
        console.log('requete httpclient vers BDD');
        sessionStorage.setItem('numberOfPAC', this.userSettings.pacList.length);
        // RequetehttpClient -> BDD if return false => displayFlash(message, redFlashMessage)
    }
    // Recupère une PAC en fonction de son index
    getUniquePAC(index: number) {
        return new Promise<any>((resolve) => {
            resolve(this.userSettings.pacList[index]);
        });
    }
    // Modifie un PAC
    updatePAC(pac: any, index: number) {
        return new Promise<boolean>((resolve, reject) => {
            if (pac.pseudo && pac.firstName && pac.tel) {
                this.userSettings.pacList[index].firstName = pac.firstName;
                this.userSettings.pacList[index].pseudo = pac.pseudo;
                this.userSettings.pacList[index].tel = pac.tel;

                /* Requete httpClient -> update BDD if return false =
                    If(!response) => console.log(error); reject(error) */

                // On émet la mise à jour et resout la promise
                this.emitUserSetSubject();
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
    // Ajoute un PAC
    addNewPAC(pac: any) {
        return new Promise<boolean>((resolve, reject) => {
            if (pac.pseudo && pac.firstName && pac.tel) {
                this.userSettings.pacList.push(pac);

                // Requete httpClient -> BDD if return false => console.log(error); reject(error)

                // On émet la mise à jour et reout la requête
                this.emitUserSetSubject();
                sessionStorage.setItem('numberOfPAC', this.userSettings.pacList.length);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
    // Supprime un PAC
    deletePAC(index: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.userSettings.pacList.splice(index, 1);
            // Requete httpClient -> BDD if return false => console.log(error); reject(error)

            // On émet la mise à jour et resolve la requête
            this.emitUserSetSubject();
            sessionStorage.setItem('numberOfPAC', this.userSettings.pacList.length);
            resolve(true);
        });
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // --------------------------------------------------------------------------------------------------------------------------------------
}
