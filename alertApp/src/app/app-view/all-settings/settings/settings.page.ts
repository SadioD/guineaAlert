import { Component, OnInit, OnDestroy } from '@angular/core';
import { Settings } from '../../../models/settings';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit, OnDestroy {
    // VARIABLES + CONSTR -----------------------------------------------------------------------------------------------------------------
    settings: Settings[];
    settingSubscription: Subscription;

    constructor(private settingService: SettingsService) { }

    ngOnInit() {
       this.settingSubscription = this.settingService.settingSubject.subscribe(
           (settingsList: Settings[]) => {
               this.settings = settingsList;
           },
           (error) => {
                console.log(error);
                alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter');
           }
       );
       this.settingService.emitSettingSubject();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    ngOnDestroy() {
        this.settingSubscription.unsubscribe();
    }// ------------------------------------------------------------------------------------------------------------------------------------
}
