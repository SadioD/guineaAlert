import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from '../models/settings';
import { UserSettings } from '../models/user-settings';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    // Table userSettings (liste des fonctionnalités avec les options saved pas l'User)
    userSettings: UserSettings = new UserSettings({
        id: 1,
        hash: 'huui65ugu',  // Créer un hash pour différencier les gens ayant le même nom
        pseudo: 'Ahmed',
        firstName: 'DIALLO',
        email: 'dialloamadou1@yahoo.fr',
        password: '*******',
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
        ]
    });
    // Table settings (Liste des fonctionnalités de l'App)
    settingsList: Settings = new Settings([
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
    ]);
    // Les Subjects (Settings référencés[name, short/long Desc, etc.] + Settings que l'user a saved[PAC, raccourcis alert icones, etc.])
    settingSubject = new Subject<Settings>();
    userSettingSubject = new Subject<UserSettings>();

    constructor(private toastController: ToastController) {
        this.getAppSettings();
        this.getUserSettings();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Emet le Setting Subject
    emitSettingSubject() {
        this.settingSubject.next(this.settingsList);
    }
    // Emet le UserSetting Subject
    emitUserSetSubject() {
        this.userSettingSubject.next(this.userSettings);
    }
    // Recupère la liste des paramètres de la BDD (table Settings)
    getAppSettings() {
        console.log('requete httpclient vers BDD');
        // RequetehttpClient -> BDD if return false => displayFlash(message, redFlashMessage)
    }
    // Recupère les paramètres save par L'User connecté dans la BDD (table UserSettings)
    getUserSettings() {
        console.log('requete httpclient vers BDD');
        sessionStorage.setItem('numberOfPAC', this.userSettings.data.pacList.length);
        // RequetehttpClient -> BDD if return false => displayFlash(message, redFlashMessage)

    }
    // Recupère une PAC en fonction de son index
    getUniquePAC(index: number) {
        return new Promise<any>((resolve) => {
            // En cas de rafraichissement de la page, one recupère d'abord le UserSettings depuis la BDD (this.getUserSettings)
            if (!this.userSettings.data.pacList.length) {
                resolve(false); // A modifier => this.getUserSettings().then(this.findPAC(index));
            } else {
                resolve(this.findPAC(index));
            }
        });
    }
    // Modifie un PAC
    updatePAC(pac: any, index: number) {
        return new Promise<boolean>((resolve) => {
            if (pac.pseudo && pac.firstName && pac.tel) {
                this.userSettings.data.pacList[index].firstName = pac.firstName;
                this.userSettings.data.pacList[index].pseudo = pac.pseudo;
                this.userSettings.data.pacList[index].tel = pac.tel;

                // Requete httpClient -> BDD if return false => displayFlash(message, redFlashMessage)

                // On émet la mise à jour et reout la requête
                this.emitUserSetSubject();
                resolve(true);
            } else {
                this.displayFlash('Vous devez remplir tous les champs du formulaire', 'redFlashMessage');
                resolve(false);
            }

        });
    }
    // Ajoute un PAC
    addNewPAC(pac: any) {
        return new Promise<boolean>((resolve) => {
            if (pac.pseudo && pac.firstName && pac.tel) {
                this.userSettings.data.pacList.push(pac);

                // Requete httpClient -> BDD if return false => displayFlash(message, redFlashMessage)

                // On émet la mise à jour et reout la requête
                this.emitUserSetSubject();
                sessionStorage.setItem('numberOfPAC', this.userSettings.data.pacList.length);
                resolve(true);
            } else {
                this.displayFlash('Vous devez remplir tous les champs du formulaire', 'redFlashMessage');
                resolve(false);
            }
        });
    }
    // Supprime un PAC
    deletePAC(index: number) {
        return new Promise<boolean>((resolve) => {
            this.userSettings.data.pacList.splice(index, 1);
            // Requete httpClient -> BDD if return false => displayFlash(message, redFlashMessage)

            // On émet la mise à jour et resolve la requête
            this.emitUserSetSubject();
            sessionStorage.setItem('numberOfPAC', this.userSettings.data.pacList.length);
            resolve(true);
        });
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Permet de trouver une machine dans la liste d'Array ----------------------------------------------------------------------------------------
    findPAC(index: number) {
        return this.userSettings.data.pacList[index];
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // Affiche un Message flash
    displayFlash(message: string, customClass: string) {
        this.toastController.create({
            message: message,
            showCloseButton: true,
            closeButtonText: 'Fermer',
            position: 'top',
            cssClass: customClass
        }).then((toast: HTMLIonToastElement) => {
            toast.present();
        });
    }// ---------------------------------------------------------------------------------------------------------------------------------
}
