import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import { Light } from './light';

@Injectable()
export class LocalstorageService {

  constructor() {}

  setServerProtocol(protocol): void {
    localStorage.setItem("serverProtocol", protocol);
  }

  getServerProtocol(): string {
    if (localStorage.getItem("serverProtocol") === "" || localStorage.getItem("serverProtocol") === null || typeof localStorage.getItem("serverProtocol") === "undefined") {
      return "Http";
    } else {
      return localStorage.getItem("serverProtocol");
    }
  }

  setServerUrl(url): void {
    localStorage.setItem("serverUrl", url);
  }

  getServerUrl(): string {
    if (localStorage.getItem("serverUrl") === "" || localStorage.getItem("serverUrl") === null || typeof localStorage.getItem("serverUrl") === "undefined") {
      return "";
    } else {
      return localStorage.getItem("serverUrl");
    }
  }

  setServerPort(port) {
    localStorage.setItem("serverPort", port);
  }

  getServerPort(): string {
    if (localStorage.getItem("serverPort") === "" || localStorage.getItem("serverPort") === null || typeof localStorage.getItem("serverPort") === "undefined") {
      return "";
    } else {
      return localStorage.getItem("serverPort");
    }
  }
}
