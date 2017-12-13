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

  constructor(private lightingService: LightingService) { }

  toggleToastVisible() {
    this.toastActive = true;
    setTimeout(() => {
      this.toastActive = false;
    }, 5000);
  }

  toggle(light): void {
    if (light.Type === 'Light/Switch' || light.Type === 'Lighting 1') {
      this.lightingService.getSwitch(light.idx).subscribe(response => {
        const resp = response.json();
        this.toggleToastVisible();
        if (resp.result[0].Data === 'Off') {
          this.data = 'On';
          document.getElementById(this.light.idx).classList.add('active');
        } else {
          this.data = 'Off';
          document.getElementById(this.light.idx).classList.remove('active');
        }
        this.lightingService.toggleSwitch(light.idx, this.data).subscribe(respo => {
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
