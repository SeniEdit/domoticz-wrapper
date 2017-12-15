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
  filtered = false;
  public toastActive = false;
  message = '';

  constructor(private lightingService: LightingService, private myStorage: LocalstorageService) { }

  toggleToastVisible() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 5000);
  }

  public filterBy(filterType): void {
    this.lightingService.getAllSwitches().subscribe(lights => {
      this.allLights = lights;

      switch (filterType) {
        case 'statusOn':
          this.filtered = true;
          this.lights = this.allLights.filter(light => (light.Data === 'On' || light.Data === 'Open'));
          this.message = 'Show active switches';
          this.toggleToastVisible();
          break;
        case 'statusOff':
          this.filtered = true;
          this.lights = this.allLights.filter(light => (light.Data === 'Off' || light.Data === 'Closed'));
          this.message = 'Show inactive switches';
          this.toggleToastVisible();
          break;
        case 'favorites':
          this.filtered = true;
          this.lights = this.allLights.filter(light => light.Favorite === 1);
          this.message = 'Show favorite switches';
          this.toggleToastVisible();
          break;
        case 'all':
          this.filtered = false;
          this.lights = this.allLights;
          this.message = 'Show all switches';
          this.toggleToastVisible();
          break;
        default:
          this.filtered = false;
          this.lights = this.allLights;
          this.message = 'Show all switches';
          this.toggleToastVisible();
          break;
        }
    });
    this.toggleModal();
  }

  setSwitches(): void {
    this.lightingService.getAllSwitches().subscribe(lights => {
      this.allLights = lights;
      this.lights = lights;
      this.loading = false;
    },
    err => {
      this.loading = false;
      this.error = true;
    });
  }

  toggleModal() {
    const modal = document.getElementById('switch-modal');
    const overlay = document.getElementById('switch-overlay');
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
    this.setSwitches();
  }
}
