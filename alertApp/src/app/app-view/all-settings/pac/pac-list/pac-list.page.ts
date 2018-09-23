import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSettings } from '../../../../models/user-settings';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-pac-list',
  templateUrl: './pac-list.page.html',
  styleUrls: ['./pac-list.page.scss'],
})
export class PacListPage implements OnInit, OnDestroy {
    // VARIABLES +  CONSTR + INIT -------------------------------------------------------------------------------------------------------
    user: {};
    userSetSubscription: Subscription;

    constructor(private settingService: SettingsService) { }

    ngOnInit() {
        this.userSetSubscription = this.settingService.userSettingSubject.subscribe(
            (userSet: UserSettings) => {
                this.user = userSet.data;
            },
            (error) => {
                console.log(error);
                alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter');
            }
        );
        this.settingService.emitUserSetSubject();
    }

    ngOnDestroy() {
        this.userSetSubscription.unsubscribe();
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES -------------------------------------------------------------------------------------------------------------------------

}
