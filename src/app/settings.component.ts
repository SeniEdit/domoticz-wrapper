import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./app.component.css']
})
export class SettingsComponent implements OnInit {
  serverUrlFromDb = "";
  serverPortFromDb = "";

  constructor(private myStorage: LocalstorageService){}

  onSave(serverUrl, serverPort): void {
    this.myStorage.setServerUrl(serverUrl);
    this.myStorage.setServerPort(serverPort);
    alert("Saved URL: " + serverUrl + ':' + serverPort);
  }

  ngOnInit(): void {
    this.serverUrlFromDb = this.myStorage.getServerUrl();
    this.serverPortFromDb = this.myStorage.getServerPort();
  }
}
