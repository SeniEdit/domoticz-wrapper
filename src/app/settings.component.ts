import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./app.component.css']
})
export class SettingsComponent implements OnInit {
  serverProtocolFromDb = '';
  serverUrlFromDb = '';
  serverPortFromDb = '';
  usernameFromDb = '';
  darkMode;
  toastActive = false;
  message = '';

  constructor(private myStorage: LocalstorageService) { }

  toggleToastVisible() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 5000);
  }


  onSave(serverProtocol, serverUrl, serverPort): void {
    this.myStorage.setServerProtocol(serverProtocol);
    this.myStorage.setServerUrl(serverUrl);
    this.myStorage.setServerPort(serverPort);
    this.message = `Saved URL: ${serverProtocol.toLowerCase()}://${serverUrl}:${serverPort}`;
    this.toggleToastVisible();
  }

  onSaveAuth(username, password) {
    this.myStorage.setUsername(username);
    this.myStorage.setAuthorization(btoa(`${username}:${password}`));
    this.message = 'Saved authorization info';
    this.toggleToastVisible();
  }

  getFromStorage() {
    this.darkMode = this.myStorage.getDarkMode();
    this.checkIfDarkMode();
    this.serverProtocolFromDb = this.myStorage.getServerProtocol();
    this.serverUrlFromDb = this.myStorage.getServerUrl();
    this.serverPortFromDb = this.myStorage.getServerPort();
    this.usernameFromDb = this.myStorage.getUsername();
  }

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

  toggleDarkMode() {
    this.myStorage.setDarkMode(this.darkMode);
    this.checkIfDarkMode();
  }

  ngOnInit(): void {
    this.getFromStorage();
  }
}
