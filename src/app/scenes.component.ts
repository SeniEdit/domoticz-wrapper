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
  filtered = false;
  message = '';
  public toastActive = false;

  constructor(private lightingService: LightingService, private myStorage: LocalstorageService) { }

  toggleToastVisible() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 5000);
  }

  setScenes(): void {
    this.lightingService.getAllScenes().subscribe(scenes => {
      this.allScenes = scenes;
      this.scenes = scenes;
      this.loading = false;
    },
    err => {
      // console.log(err);
      this.loading = false;
      this.error = true;
    });
  }

  public filterBy(filterType): void {
    this.lightingService.getAllScenes().subscribe(scenes => {
      this.allScenes = scenes;

      switch (filterType) {
        case 'favorites':
          this.filtered = true;
          this.scenes = this.allScenes.filter(scene => scene.Favorite === 1);
          this.message = 'Show favorite scenes';
          this.toggleToastVisible();
          break;
        case 'all':
          this.filtered = false;
          this.scenes = this.allScenes;
          this.message = 'Show all scenes';
          this.toggleToastVisible();
          break;
        default:
          this.filtered = false;
          this.scenes = this.allScenes;
          this.message = 'Show all scenes';
          this.toggleToastVisible();
          break;
        }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.setScenes();
  }
}
