import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from './localstorage.service';
import { LightingService } from './lighting.service';
import { Light } from './light';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./app.component.css']
})
export class LightsComponent implements OnInit {
  allLights;
  lights;
  loading;
  error = false;
  favorites = false;
  public toastActive = false;

  constructor(private lightingService: LightingService, private myStorage: LocalstorageService) { }

  toggleToastVisible() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 5000);
  }

  isFavorite(light) {
    return light.Favorite === 1;
  }

  toggleFavorites() {
    this.favorites = !this.favorites;
    this.setStorage(this.favorites);
    if (this.favorites === true) {
      this.filterFavorites();
    } else {
      this.lights = this.allLights;
    }
    this.toggleToastVisible();
  }

  filterFavorites(): void {
    this.lights = this.lights.filter(this.isFavorite);
  }

  public filterBy(filterType): void {
    //this.lights.filter(filterType);
    this.toggleFavorites();
  }

  setSwitches(): void {
    this.lightingService.getAllSwitches().subscribe(lights => {
      this.allLights = lights;
      this.lights = lights;
      if (this.favorites === true) {
        this.filterFavorites();
      }
      this.loading = false;
    },
    err => {
      this.loading = false;
      this.error = true;
    });
  }

  openModal() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const body = document.getElementsByTagName('body')[0];

    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      body.style.overflow = 'hidden';
    } else {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
      body.style.overflowY = 'scroll';
    }
  }

  getFromStorage() {
    this.favorites = this.myStorage.getSwitchesFavorite();
  }

  setStorage(favorite) {
    this.myStorage.setSwitchesFavorite(favorite);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setSwitches();
    this.getFromStorage();
  }
}
