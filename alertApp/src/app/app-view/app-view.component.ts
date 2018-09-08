import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss']
})
export class AppViewComponent implements OnInit {

    // VARIABLES + PAGES de l'APP ------------------------------------------------------------------------------------------------------
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'List',
            url: '/list',
            icon: 'list'
        }
    ]; // ---------------------------------------------------------------------------------------------------------------------------------
    // METHODES --------------------------------------------------------------------------------------------------------------------------
    constructor() { }

    ngOnInit() {
    }// -----------------------------------------------------------------------------------------------------------------------------------

}
