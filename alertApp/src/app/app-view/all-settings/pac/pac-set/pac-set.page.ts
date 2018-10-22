import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../../../../services/settings.service';
import { ToastController } from '@ionic/angular';
// import '../../../../../assets/js/pac-set.page.js';

declare var $: any;
@Component({
    selector: 'app-pac-set',
    templateUrl: './pac-set.page.html',
    styleUrls: ['./pac-set.page.scss'],
})
export class PacSetPage implements OnInit {
    // VARIABLES + CONSTR + INIT + DESTROY -----------------------------------------------------------------------------------------------------------
    pac: any = {};

    constructor(private route: ActivatedRoute,
                private router: Router,
                private settingService: SettingsService,
                private toastController: ToastController) { }

    // On vérifie si des paramètres ont été recus et on charge le code Jquery de la page
    // if(Paramètres) => modification de PAC => on recupère le PAC à modifier
    // ELSE => Add New PAC
    ngOnInit() {
        if (this.reqHasParam()) {
            this.settingService.getUniquePAC(+this.route.snapshot.params['id']).then(
                (response: {} | boolean) => {
                    if (!response) {
                        return this.router.navigate(['/settings/pac-list']);
                    } else {
                        this.pac = response;
                    }
                }
            );
        } else {
            this.pac.pseudo = this.pac.firstName = this.pac.tel = '';
        }
        this.loadJqueryCode();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Traite le formulaire soumis (if(paramètres) => update/ ELSE => add new)
    onSubmit(form: NgForm) {
        if (this.reqHasParam()) {
            this.settingService.updatePAC(form.value, this.route.snapshot.params['id']).then(
            (response: boolean) => {
                if (!response) {
                    this.displayFlash('Vous devez remplir tous les champs du formulaire', 'redFlashMessage');
                } else {
                    return this.redirectAndDisplay(form.value.pseudo + ' a bien été modifié(e)', 'greenFlashMessage');
                }
            },
            () => { alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter'); });
        } else {
            this.settingService.addNewPAC(form.value).then((response: boolean) => {
                if (!response) {
                    this.displayFlash('Vous devez remplir tous les champs du formulaire', 'redFlashMessage');
                } else {
                    this.redirectAndDisplay(form.value.pseudo + ' a bien été ajouté(e)', 'greenFlashMessage');
                }
            },
            () => { alert('Oups... Une erreur est survenue! Merci de rafraichir la page. Si ce problème persiste n\'hésitez pas nous contacter'); });
        }
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // EVITE DUPLICATION CODE /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // --------------------------------------------------------------------------------------------------------------------------------------
    // Charge du code Jquery directement dans le typeScript (Import ne marche pas lorsqu'on ajoute le backButton)
    loadJqueryCode() {
        $(function () {
            const manager = {
                // Désactive le boutton d'ajout de PAC si les champs Inputs sont vides
                disableSubmit: function () {
                    if (!$('#pseudo').val() || !$('#firstName').val() || !$('#tel').val()) {
                        $('#submitButton').attr('disabled', true);
                    }
                },
                // Customise la couleur des labels lors du focus
                styleForm: function () {
                    $('#pseudo, #firstName, #tel').focus(function (e) {
                        $(e.target).prev().css('color', '#e68484');
                    });
                },
                // initialise le script
                loadScript: function () {
                    manager.disableSubmit();
                    manager.styleForm();
                }
            };
            manager.loadScript();
        });
    }
    // Premet de vérifier si l'id a été recue: si TRUE=> il s'agit d'un UPDATE si FALSE => il s'agit d'un ADD NEW
    reqHasParam() {
        return this.route.snapshot.params['id'] === 'new-pac' ? false : true;
    }
    // Redirige et affiche un message FLash
    redirectAndDisplay(message: string, customClass: string) {
        return this.router.navigate(['/settings/pac-list']).then(() => {
            this.displayFlash(message, customClass);
        });
    }
    // Affiche un Message FLash
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
