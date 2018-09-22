import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from '../models/settings';
import { UserSettings } from '../models/user-settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    // Table userSettings (liste des fonctionnalités avec les options saved pas l'User)
    userSettings: UserSettings = new UserSettings([
        {
            firstName: 'DIALLO',
            pseudo:    'Ahmed',
            tel:       664463486
        },
        {
            firstName: 'BAH',
            pseudo:    'Grasset',
            tel:       622221239
        },
        {
            firstName: 'BAH-DIALLO',
            pseudo:    'Hope',
            tel:       622221239
        },
    ], 'secondProperty');
    // Table settings (Liste des fonctionnalités de l'App)
    settings: Settings[] = [
        new Settings(1,
            'Personnes A Contacter (PAC)',
            'Modifier votre liste de personnes à contacter',
            'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            '/settings/pac'),
        new Settings(1,
            'Ahmed',
            'Bye Fellas I\'m out doing stuff that get me in trouble',
            'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            'url'),
        new Settings(1,
            'Hope',
            'Bye Fellas I\'m out doing stuff that get me in trouble',
            'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            'url')
    ];
    // Les Subjects (Settings référencés[name, short/long Desc, etc.] + Settings que l'user a saved[PAC, raccourcis alert icones, etc.])
    settingSubject = new Subject<Settings[]>();
    userSettingSubject = new Subject<UserSettings>();

    constructor() {
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Emet le Setting Subject
    emitSettingSubject() {
        this.settingSubject.next(this.settings);
    }
    // Emet le UserSetting Subject
    emitUserSetSubject() {
        this.userSettingSubject.next(this.userSettings);
    }
}// ------------------------------------------------------------------------------------------------------------------------------------
