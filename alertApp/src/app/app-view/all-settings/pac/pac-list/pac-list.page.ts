import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SettingsService } from '../../../../services/settings.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Pac } from '../../../../models/pac';

@Component({
  selector: 'app-pac-list',
  templateUrl: './pac-list.page.html',
  styleUrls: ['./pac-list.page.scss'],
})
export class PacListPage implements OnInit, OnDestroy {
    // VARIABLES +  CONSTR + INIT -------------------------------------------------------------------------------------------------------
    // Liste des PAC de l'User
    //pacList: Array<{}>;
    pacList: Pac[];
    userSetSubscription: Subscription;

    constructor(private settingService: SettingsService,
                private toastController: ToastController,
                private router: Router) { }

    ngOnInit() {
        // On recupère la liste des PAC depuis settingService
        this.userSetSubscription = this.settingService.userSettingSubject.subscribe(
            (userSet: any) => {
                this.pacList = userSet.setup.pacList;
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
    // Supprime un PAC
    deletePAC(pacPseudo: string, index: string) {
        if (sessionStorage.getItem('numberOfPAC') > '1') {
            this.settingService.deletePAC(+index).then(() => {
                this.displayFlash(pacPseudo + ' a bien été supprimé(e)', 'greenFlashMessage');
            },
                () => { alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter'); });
        } else {
            this.displayFlash('Vous devez avoir au moins un PAC enregistré', 'redFlashMessage');
        }
    }
    // Ajoute un PAC si le nombre total de PAC du USer est < 3
    onAddPAC() {
        if (sessionStorage.getItem('numberOfPAC') >= '3') {
            this.displayFlash('Vous avez atteint le nombre maximum de PAC', 'redFlashMessage');
        } else {
            return this.router.navigate(['/settings/pac-list/new-pac']);
        }
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Affiche un Message flash ----------------------------------------------------------------------------------------------------------
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
