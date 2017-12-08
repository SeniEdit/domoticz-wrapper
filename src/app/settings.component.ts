import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./app.component.css']
})
export class SettingsComponent implements OnInit {
  serverProtocolFromDb = "";
  serverUrlFromDb = "";
  serverPortFromDb = "";

  constructor(private myStorage: LocalstorageService){}

  onSave(serverProtocol, serverUrl, serverPort): void {
    this.myStorage.setServerProtocol(serverProtocol);
    this.myStorage.setServerUrl(serverUrl);
    this.myStorage.setServerPort(serverPort);
    alert("Saved URL: " + serverProtocol + '://' + serverUrl + ':' + serverPort);
  }

  ngOnInit(): void {
    this.serverProtocolFromDb = this.myStorage.getServerProtocol();
    this.serverUrlFromDb = this.myStorage.getServerUrl();
    this.serverPortFromDb = this.myStorage.getServerPort();
  }
}
