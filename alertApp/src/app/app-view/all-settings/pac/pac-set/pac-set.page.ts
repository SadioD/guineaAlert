import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import '../../../../../assets/js/pac-set.page.js';

declare var $: any;
@Component({
  selector: 'app-pac-set',
  templateUrl: './pac-set.page.html',
  styleUrls: ['./pac-set.page.scss'],
})
export class PacSetPage implements OnInit {
    // VARIABLES + CONSTR + INIT + DESTROY -----------------------------------------------------------------------------------------------------------
    constructor() { }

    // Initialise les dépendances de la page
    ngOnInit() {
       this.loadJqueryCode();
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Exploite les données à la soumission du formulaire
    onSubmit(form: NgForm) {
        console.log(form.value);
    }// ------------------------------------------------------------------------------------------------------------------------------------
    // SCRIPTS ----------------------------------------------------------------------------------------------------------------------------
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
                        $(e.target).prev().css('color', 'black');
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
    }// ------------------------------------------------------------------------------------------------------------------------------------
}
