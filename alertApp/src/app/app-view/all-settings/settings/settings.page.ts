import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit, OnDestroy {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    // Liste des paramètres de l'app
    settingsList: Array<{}>;
    settingSubscription: Subscription;

    constructor(private settingService: SettingsService) { }

    ngOnInit() {
        // On recupère la liste des paramètres à afficher depuis settingService
        this.settingSubscription = this.settingService.userSettingSubject.subscribe(
           (userSettings: any) => {
               this.settingsList = userSettings.list;
           },
           (error) => {
                console.log(error);
                alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter');
           }
       );
       this.settingService.emitUserSetSubject();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.settingSubscription.unsubscribe();
    }// ------------------------------------------------------------------------------------------------------------------------------------
}
