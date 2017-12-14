import { Component, OnInit} from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./app.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private myStorage: LocalstorageService) { }

  checkIfDarkMode() {
    const rowHeaders = document.getElementsByClassName('row header');
    const navbar = document.getElementsByClassName('navbar')[0];
    const navtabs = document.getElementsByClassName('navtab');
    const buttons = document.getElementsByTagName('button');

    if (this.myStorage.getDarkMode() === true) {
      document.getElementsByTagName('html')[0].classList.add('darkMode');
      for (let i = 0; i < rowHeaders.length; i++ ) {
        rowHeaders[i].classList.add('darkMode');
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add('darkMode');
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
      for (let i = 0; i < navtabs.length; i++) {
        navtabs[i].classList.remove('darkMode');
      }
      navbar.classList.remove('darkMode');
    }
  }

  ngOnInit(): void {
    this.checkIfDarkMode();
  }
}
