import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    /* Liste des Tables BDD : Symfony Entities - User, AppSettings, Preferences => this->getUser()->getPreferences()
            appSettings :       contient la liste des paramètres de l'APP (Gérer les PAC, etc.)
            userPreferences :   contient la liste des préférences de l'User (liste des PAC, etc.) */

    // Variable contenant la liste des paramètres de l'APP
    appSettings: Array<{}>;

    // Variable contenant les Préférences de l'User
    userSettings: any;

    // Le Subject de la variable appSettings
    appSettingSubject = new Subject <Array<{}>>();

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
        ];
    }
    // Recupère les paramètres save par L'User connecté dans la BDD (table UserSettings)
    getUserSettings() {
        this.userSettings = {
            /*list: [
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
            ],*/
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
        console.log('requete httpclient vers BDD');
        sessionStorage.setItem('numberOfPAC', this.userSettings.setup.pacList.length);
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
