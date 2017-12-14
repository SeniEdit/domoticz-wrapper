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
    this.toggleModal();
  }

  toggleModal() {
    const modal = document.getElementById('scene-modal');
    const overlay = document.getElementById('scene-overlay');
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

  ngOnInit(): void {
    this.loading = true;
    this.setScenes();
  }
}
