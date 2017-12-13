import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalstorageService } from './localstorage.service';
import { LightingService } from './lighting.service';
import { Scene } from './scene';

@Component({
  selector: 'app-scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./app.component.css']
})
export class ScenesComponent implements OnInit {
  allScenes;
  scenes;
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

  isFavorite(scene) {
    return scene.Favorite === 1;
  }

  toggleFavorites() {
    this.favorites = !this.favorites;
    this.setStorage(this.favorites);
    if (this.favorites === true) {
      this.filterFavorites();
    } else {
      this.scenes = this.allScenes;
    }
    this.toggleToastVisible();
  }

  filterFavorites(): void {
    this.scenes = this.scenes.filter(this.isFavorite);
  }

  setScenes(): void {
    this.lightingService.getAllScenes().subscribe(scenes => {
      this.allScenes = scenes;
      this.scenes = scenes;
      if (this.favorites === true) {
        this.filterFavorites();
      }
      this.loading = false;
    },
    err => {
      // console.log(err);
      this.loading = false;
      this.error = true;
    });
  }

  getFromStorage() {
    this.favorites = this.myStorage.getScenesFavorite();
  }

  setStorage(favorite) {
    this.myStorage.setScenesFavorite(favorite);
  }

  ngOnInit(): void {
    this.loading = true;
    this.setScenes();
    this.getFromStorage();
  }
}
