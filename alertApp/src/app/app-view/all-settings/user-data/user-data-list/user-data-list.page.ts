import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../../models/user';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user-data-list',
    templateUrl: './user-data-list.page.html',
    styleUrls: ['./user-data-list.page.scss'],
})
export class UserDataListPage implements OnInit, OnDestroy {
    // VARIABLES +  CONSTR + INIT -------------------------------------------------------------------------------------------------------
    // Variable contenant les données User
    user: User;
    userSubscription: Subscription;

    constructor(private userService: UserService,
        private toastController: ToastController,
        private router: Router) { }

    // On recupère les données User depuis UserService à l'initialisation de l'App
    ngOnInit() {
        this.userSubscription = this.userService.userSubject.subscribe(
            (userData: User) => {
                this.user = userData;
            },
            (error) => {
                console.log(error);
                alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter');
            }
        );
        this.userService.emitUserSubject();
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }// ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES -------------------------------------------------------------------------------------------------------------------------
    // Permet de modifier les données de l'User
    onUpdateUser() {
        this.router.navigate(['/settings/donnees-personnelles/mise-a-jour']);
    }
    // Permet de supprimer le compte de l'User
    onDeleteUser() {
        if (confirm('Etes-vous sûr de vouloir supprimer votre compte?')) {
            this.userService.deleteUserData().then(() => {
                this.displayFlash('Votre compte a bien été supprimé', 'greenFlashMessage');
                return this.router.navigate(['/authentification']);
            },
            () => { alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter'); });
        }
    }
    // ---------------------------------------------------------------------------------------------------------------------------------
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
