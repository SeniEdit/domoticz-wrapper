import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import { Light } from './light';

@Injectable()
export class LocalstorageService {

  constructor() {}

  setSwitchesFavorite(bool): void {
    localStorage.setItem('switchesFavorite', bool);
  }

  getSwitchesFavorite(): boolean {
    if (localStorage.getItem('switchesFavorite') === null || typeof localStorage.getItem('switchesFavorite') === 'undefined') {
      return false;
    } else {
      return JSON.parse(localStorage.getItem('switchesFavorite'));
    }
  }

  setScenesFavorite(bool): void {
    localStorage.setItem('scenesFavorite', bool);
  }

  getScenesFavorite(): boolean {
    if (localStorage.getItem('scenesFavorite') === null || typeof localStorage.getItem('scenesFavorite') === 'undefined') {
      return false;
    } else {
      return JSON.parse(localStorage.getItem('scenesFavorite'));
    }
  }

  setDarkMode(darkMode): void {
    localStorage.setItem('darkMode', darkMode);
  }

  getDarkMode(): boolean {
    if (localStorage.getItem('darkMode') === null || typeof localStorage.getItem('darkMode') === 'undefined') {
      return false;
    } else {
      return JSON.parse(localStorage.getItem('darkMode'));
    }
  }

  setUsername(username): void {
    localStorage.setItem('username', username);
  }

  getUsername(): string {
    if (localStorage.getItem('username') === '' || localStorage.getItem('username') === null || typeof localStorage.getItem('username') === 'undefined') {
      return '';
    } else {
      return localStorage.getItem('username');
    }
  }

  setAuthorization(auth): void {
    localStorage.setItem('auth', auth);
  }

  getAuthorization(): string {
    if (localStorage.getItem('auth') === '' || localStorage.getItem('auth') === null || typeof localStorage.getItem('auth') === 'undefined') {
      return '';
    } else {
      return localStorage.getItem('auth');
    }
  }


  setServerProtocol(protocol): void {
    localStorage.setItem('serverProtocol', protocol);
  }

  getServerProtocol(): string {
    if (localStorage.getItem('serverProtocol') === '' || localStorage.getItem('serverProtocol') === null || typeof localStorage.getItem('serverProtocol') === 'undefined') {
      return 'Http';
    } else {
      return localStorage.getItem('serverProtocol');
    }
  }

  setServerUrl(url): void {
    localStorage.setItem('serverUrl', url);
  }

  getServerUrl(): string {
    if (localStorage.getItem('serverUrl') === '' || localStorage.getItem('serverUrl') === null || typeof localStorage.getItem('serverUrl') === 'undefined') {
      return '';
    } else {
      return localStorage.getItem('serverUrl');
    }
  }

  setServerPort(port) {
    localStorage.setItem('serverPort', port);
  }

  getServerPort(): string {
    if (localStorage.getItem('serverPort') === '' || localStorage.getItem('serverPort') === null || typeof localStorage.getItem('serverPort') === 'undefined') {
      return '';
    } else {
      return localStorage.getItem('serverPort');
    }
  }
}
