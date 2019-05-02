import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';
import { AppSettings } from '../../../models/app-settings';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit, OnDestroy {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    // Liste des paramètres de l'app
    appSettings: AppSettings[];
    settingSubscription: Subscription;

    constructor(private settingService: SettingsService) { }

    ngOnInit() {
        // On recupère la liste des paramètres à afficher depuis settingService
        this.settingSubscription = this.settingService.appSettingSubject.subscribe(
           (settings: AppSettings[]) => {
               this.appSettings = settings;
           },
           (error) => {
                console.log(error);
                alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter');
           }
       );
       this.settingService.emitAppSettingSubject();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.settingSubscription.unsubscribe();
    }// ------------------------------------------------------------------------------------------------------------------------------------
}
