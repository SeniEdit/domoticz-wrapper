import { Component, OnInit } from '@angular/core';
import {LocalstorageService } from './localstorage.service';
import { LightingService } from './lighting.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./app.component.css']
})
export class StatsComponent implements OnInit {
  lights;
  loading;
  error;

  constructor(private lightingService: LightingService, private myStorage: LocalstorageService) { }

  checkIfDarkMode() {
    const rowHeaders = document.getElementsByClassName('row header');
    const navbar = document.getElementsByClassName('navbar')[0];
    const navtabs = document.getElementsByClassName('navtab');
    const buttons = document.getElementsByTagName('button');
    const modals = document.getElementsByClassName('modal-wrapper');

    if (this.myStorage.getDarkMode() === true) {
      document.getElementsByTagName('html')[0].classList.add('darkMode');
      for (let i = 0; i < rowHeaders.length; i++ ) {
        rowHeaders[i].classList.add('darkMode');
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('darkMode');
      }
      for (let i = 0; i < modals.length; i++ ) {
        modals[i].classList.add('darkMode');
      }
      for (let i = 0; i < navtabs.length; i++) {
        navtabs[i].classList.add('darkMode');
      }
      navbar.classList.add('darkMode');
    } else {
      document.getElementsByTagName('html')[0].classList.remove('darkMode');
      for (let i = 0; i < rowHeaders.length; i++ ) {
        rowHeaders[i].classList.remove('darkMode');
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('darkMode');
      }
      for (let i = 0; i < modals.length; i++ ) {
        modals[i].classList.remove('darkMode');
      }
      for (let i = 0; i < navtabs.length; i++) {
        navtabs[i].classList.remove('darkMode');
      }
      navbar.classList.remove('darkMode');
    }
  }

  setSwitches(): void {
    this.lightingService.getAllSwitches().subscribe(lights => {
      this.lights = lights;
      this.loading = false;
    },
    err => {
      this.loading = false;
      this.error = true;
    });
  }

  ngOnInit(): void {
    this.setSwitches();
    this.checkIfDarkMode();
  }
}
