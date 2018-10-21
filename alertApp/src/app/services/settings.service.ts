import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { Settings } from '../models/settings';
//import { UserSettings } from '../models/user-settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    // Table UserSettings : Données Stockées au format JSON en BDD (Postgresql)
    // Contient la liste des paramètres de l'app et leur configuration apportée par l'User
    // Contient également une colonne faisant référence à la clé extérieure (user_id)
    // SELECT user_settings.info WHERE user_settings.user_id = 1
    userSettings: any = {
        list: [
            {
                label: 'Personnes A Contacter (PAC)',
                shortDesc: 'Modifier votre liste de PAC',
                longDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
                url: '/settings/pac-list',
                icon: 'people'
            },
            {
                label: 'Fonction',
                shortDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus',
                longDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
                url: '/settings/fonction',
                icon: 'cog'
            },
            {
                label: 'Autre Fonction',
                shortDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus',
                longDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
                url: '/settings/autre-fonction',
                icon: 'cog'
            }
        ],
        setup: {
            pacList: [
                {
                    firstName: 'SOUMARE',
                    pseudo: 'Fodé Idi',
                    tel: 664463486
                },
                {
                    firstName: 'CONDE',
                    pseudo: 'Alpha Ibrahim',
                    tel: 622221239
                },
                {
                    firstName: 'DOE',
                    pseudo: 'John',
                    tel: 622221239
                }
            ],
            secondFeat: true,	    // Définit la fonctionnalité comme étant Activée
            thirdFeat: false	    // Définit la fonctionnalité comme étant Désactivée
        }
    };
    // Table settings (Liste des fonctionnalités de l'App)
    /*settingsList: Settings = new Settings([
        {
            name: 'Personnes A Contacter (PAC)',
            shortDesc: 'Modifier votre liste de PAC',
            longDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            url: '/settings/pac-list',
            icon: 'people'
        },
        {
            name: 'Fonction ',
            shortDesc: 'Modifier votre liste de personnes à contacter',
            longDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            url: '/settings/pac-list',
            icon: 'cog'
        },
        {
            name: 'Surprise',
            shortDesc: 'Modifier votre liste de personnes à contacter',
            longDesc: 'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            url: '/settings/pac-list',
            icon: 'cog'
        },
    ]);*/

    // Le Subject de la variable userSettings
    userSettingSubject = new Subject<any>();

    constructor() {
        // this.getAppSettings();
        this.getUserSettings();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Emet le Setting Subject
    /*emitSettingSubject() {
        this.settingSubject.next(this.settingsList);
    }*/
    // Emet le UserSetting Subject
    emitUserSetSubject() {
        this.userSettingSubject.next(this.userSettings);
    }
    // Recupère la liste des paramètres de la BDD (table Settings)
    /*getAppSettings() {
        console.log('requete httpclient vers BDD');
        // RequetehttpClient -> BDD if return false => displayFlash(message, redFlashMessage)
    }*/
    // Recupère les paramètres save par L'User connecté dans la BDD (table UserSettings)
    getUserSettings() {
        console.log('requete httpclient vers BDD');
        sessionStorage.setItem('numberOfPAC', this.userSettings.data.pacList.setup.length);
        // RequetehttpClient -> BDD if return false => displayFlash(message, redFlashMessage)
    }
    // Recupère une PAC en fonction de son index
    getUniquePAC(index: number) {
        return new Promise<any>((resolve) => {
            resolve(this.userSettings.setup.pacList[index]);
        });
    }
    // Modifie un PAC
    updatePAC(pac: any, index: number) {
        return new Promise<boolean>((resolve, reject) => {
            if (pac.pseudo && pac.firstName && pac.tel) {
                this.userSettings.setup.pacList[index].firstName = pac.firstName;
                this.userSettings.setup.pacList[index].pseudo = pac.pseudo;
                this.userSettings.setup.pacList[index].tel = pac.tel;

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
                this.userSettings.setup.pacList.push(pac);

                // Requete httpClient -> BDD if return false => console.log(error); reject(error)

                // On émet la mise à jour et reout la requête
                this.emitUserSetSubject();
                sessionStorage.setItem('numberOfPAC', this.userSettings.setup.pacList.length);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
    // Supprime un PAC
    deletePAC(index: number) {
        return new Promise<boolean>((resolve, reject) => {
            this.userSettings.setup.pacList.splice(index, 1);
            // Requete httpClient -> BDD if return false => console.log(error); reject(error)

            // On émet la mise à jour et resolve la requête
            this.emitUserSetSubject();
            sessionStorage.setItem('numberOfPAC', this.userSettings.setup.pacList.length);
            resolve(true);
        });
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // --------------------------------------------------------------------------------------------------------------------------------------
}
