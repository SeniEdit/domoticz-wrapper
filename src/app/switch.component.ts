import { Component, Input } from '@angular/core';
import { LightingService } from './lighting.service';
import { Light } from './light';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch.component.html',
  styleUrls: ['./app.component.css']
})
export class SwitchComponent {
  @Input() light: Light;
  @Input() data: string;

  public toastActive = false;
  toggleData = '';
  message = '';

  constructor(private lightingService: LightingService) { }

  toggleToastVisible() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 5000);
  }

  toggle(light): void {
    this.toggleData = '';

    if (light.Type === 'Light/Switch' || light.Type === 'Lighting 1') {
      this.lightingService.getSwitch(light.idx).subscribe(response => {
        const resp = response.json();
        if (resp.result[0].Data === 'Off') {
          this.data = 'On';
          this.toggleData = 'On';
          document.getElementById(this.light.idx).classList.add('active');
        } else if (resp.result[0].Data === 'On'){
          this.data = 'Off';
          this.toggleData = 'Off';
          document.getElementById(this.light.idx).classList.remove('active');
        } else if (resp.result[0].Data === 'Closed') {
          this.toggleData = 'On';
          this.data = 'Open';
          document.getElementById(this.light.idx).classList.add('active');
        } else if (resp.result[0].Data === 'Open'){
          this.toggleData = 'Off';
          this.data = 'Closed';
          document.getElementById(this.light.idx).classList.remove('active');
        }
        this.message = `Set ${this.light.Name} ${this.data.toLowerCase()}`
        this.toggleToastVisible();
        this.lightingService.toggleSwitch(light.idx, this.toggleData).subscribe(respo => {
          this.lightingService.getSwitch(light.idx).subscribe(respon => {
            const res = respon.json();
            this.light = res.result[0];
          });
        });
      });
    } else if (light.Type === 'Scene' || light.Type === 'Group') {
      this.lightingService.triggerScene(light.idx).subscribe(response => {
        console.log(response);
      });
    }
  }
}
