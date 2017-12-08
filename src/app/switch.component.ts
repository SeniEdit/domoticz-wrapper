import { Component, Input } from '@angular/core';
import { LightingService } from './lighting.service';
import { Light } from './light';

@Component({
  selector: 'switchButton',
  templateUrl: './switch.component.html',
  styleUrls: ['./app.component.css']
})
export class SwitchComponent {
  @Input() light: Light;
  @Input() data : String;

  constructor(private lightingService: LightingService){ }

  toggle(light): void {
    if (light.Type === "Light/Switch" || light.Type === "Lighting 1") {
      this.lightingService.getSwitch(light.idx).subscribe(response => {
        let resp = response.json();
        if (resp.result[0].Data === "Off") {
          this.data = "On"
          document.getElementById(this.light.idx).classList.add('active');
        } else {
          this.data = "Off"
          document.getElementById(this.light.idx).classList.remove('active');
        }
        this.lightingService.toggleSwitch(light.idx, this.data).subscribe(response => {
          this.lightingService.getSwitch(light.idx).subscribe(response => {
            let res = response.json();
            this.light = res.result[0];
          });
        });
      })
    } else if (light.Type === "Scene" || light.Type === "Group") {
      this.lightingService.triggerScene(light.idx).subscribe(response => {
        console.log(response)
      });
    }
  }
}
