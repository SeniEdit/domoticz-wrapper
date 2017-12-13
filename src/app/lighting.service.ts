import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import { Light } from './light';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class LightingService {
  private authHeader;
  private auth;

  constructor(private http: Http, private myStorage: LocalstorageService) {
    this.auth = this.myStorage.getAuthorization();
    this.authHeader = `Basic ${this.auth}`;
  }

  setAuthHeader(): void {
    this.auth = this.myStorage.getAuthorization();
    this.authHeader = `Basic ${this.auth}`;
  }

  getAllSwitches(): Observable<Light> {
    this.setAuthHeader();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this.authHeader);
    const options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.myStorage.getServerProtocol() + '://' + this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=devices&filter=light&used=true&order=Name', options).map(res => {
      return res.json().result;
    });
  }

  getSwitch(idx) {
    this.setAuthHeader();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this.authHeader);
    const options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.myStorage.getServerProtocol() + '://' + this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=devices&rid=' + idx, options);
  }

  toggleSwitch(idx, toggle) {
    this.setAuthHeader();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this.authHeader);
    const options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.myStorage.getServerProtocol() + '://' + this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=command&param=switchlight&idx=' + idx + '&switchcmd=' + toggle, options);
  }

  getAllScenes(): Observable<Light> {
    this.setAuthHeader();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this.authHeader);
    const options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.myStorage.getServerProtocol() + '://' + this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=scenes', options).map(res => {
      return res.json().result;
    });
  }

  getScene(idx) {
    this.setAuthHeader();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this.authHeader);
    const options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.myStorage.getServerProtocol() + '://' + this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=scenes&rid=' + idx, options);
  }

  triggerScene(idx) {
    this.setAuthHeader();
    const myHeaders = new Headers();
    myHeaders.append('Authorization', this.authHeader);
    const options = new RequestOptions({ headers: myHeaders });
    return this.http.get(this.myStorage.getServerProtocol() + '://' + this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=command&param=switchscene&idx=' + idx + '&switchcmd=On', options);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}




/*
toggleLights(idx, toggle) {
  fetch(url + 'json.htm?type=command&param=switchlight&idx=' + idx + '&switchcmd=' + toggle);
}

getAllSwitches() {
  //alert("Fetching all switches!")
  return fetch(url + 'json.htm?type=devices&filter=light&used=true&order=Name&favorite=1')
}
*/
