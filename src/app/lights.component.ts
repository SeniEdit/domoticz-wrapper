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

  ngOnInit(): void {
    this.loading = true;
    this.setSwitches();
  }
}
