import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import { Light } from './light';
import { LocalstorageService } from './localstorage.service';

@Injectable()
export class LightingService {
  //http://145.90.93.147:6144

  constructor(private http: Http, private myStorage: LocalstorageService) {
  }

  getAllSwitches(): Observable<Light> {
    return this.http.get(this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=devices&filter=light&used=true&order=Name&favorite=1').map(res => {
      return res.json().result;
    });
  }

  getSwitch(idx) {
    return this.http.get(this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=devices&rid=' + idx);
  }

  toggleSwitch(idx, toggle) {
    return this.http.get(this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=command&param=switchlight&idx=' + idx + '&switchcmd=' + toggle);
  }

  getAllScenes(): Observable<Light> {
    return this.http.get(this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=scenes').map(res => {
      return res.json().result;
    });
  }

  getScene(idx) {
    return this.http.get(this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=scenes&rid=' + idx);
  }

  toggleScene(idx, toggle) {
    return this.http.get(this.myStorage.getServerUrl() + ':' + this.myStorage.getServerPort() + '/json.htm?type=command&param=switchscene&idx=' + idx + '&switchcmd=' + toggle);
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
