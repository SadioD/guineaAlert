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
    userSettings: UserSettings = new UserSettings({
            id: 1,
            hash: 'huui65ugu',  // Créer un hash pour différencier les gens ayant le même nom
            pseudo: 'Ahmed',
            firstName: 'DIALLO',
            settings: {
                pacList: [
                    {
                        firstName: 'BAH',
                        pseudo: 'Grasset',
                        tel: 664463486
                    },
                    {
                        firstName: 'BAH-DIALLO',
                        pseudo: 'Hope',
                        tel: 622221239
                    }
                ]
            }

        });
    // Table settings (Liste des fonctionnalités de l'App)
    settingsList: Settings = new Settings([
        {
            name:       'Personnes A Contacter (PAC)',
            shortDesc:  'Modifier votre liste de personnes à contacter',
            longDesc:   'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            url:        '/settings/pac-list'
        },
        {
            name:       'Fonction ',
            shortDesc:  'Modifier votre liste de personnes à contacter',
            longDesc:   'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            url:        '/settings/pac-list'
        },
        {
            name:       'Surprise',
            shortDesc:  'Modifier votre liste de personnes à contacter',
            longDesc:   'Lorem Ipsum Et quia Mesopotamiae tractus omnes crebro inquietari sueti praetenturis et stationibus servabantur agrariis, laevorsum flexo itinere Osdroenae subsederat extimas partes, novum parumque aliquando temptatum commentum adgressus.quod si impetrasset, fulminis modo cuncta vastarat.erat autem quod cogitabat huius modi.',
            url:        '/settings/pac-list'
        },
    ]);
    // Les Subjects (Settings référencés[name, short/long Desc, etc.] + Settings que l'user a saved[PAC, raccourcis alert icones, etc.])
    settingSubject = new Subject<Settings>();
    userSettingSubject = new Subject<UserSettings>();

    constructor() {
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
}// ------------------------------------------------------------------------------------------------------------------------------------
