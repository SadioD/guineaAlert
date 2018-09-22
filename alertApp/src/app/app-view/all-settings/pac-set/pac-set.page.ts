import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import '../../../../assets/js/pac-set.page.js';

@Component({
  selector: 'app-pac-set',
  templateUrl: './pac-set.page.html',
  styleUrls: ['./pac-set.page.scss'],
})
export class PacSetPage implements OnInit, OnDestroy {
    // VARIABLES + CONSTR + INIT + DESTROY -----------------------------------------------------------------------------------------------------------
    constructor() { }

    // Initialise les dépendances de la page
    ngOnInit() {

    }
    // Supprime certaines dépendances à la sortie
    ngOnDestroy() {

    }// ------------------------------------------------------------------------------------------------------------------------------------
    // METHODES ---------------------------------------------------------------------------------------------------------------------------
    // Exploite les données à la soumission du formulaire
    onSubmit(form: NgForm) {
        console.log(form.value);
    }// ------------------------------------------------------------------------------------------------------------------------------------
}
