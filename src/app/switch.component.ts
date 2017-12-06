import { Component, Input, OnInit } from '@angular/core';
import { LightingService } from './lighting.service';
import { Light } from './light';

@Component({
  selector: 'switchButton',
  templateUrl: './switch.component.html',
  styleUrls: ['./app.component.css']
})
export class SwitchComponent implements OnInit {
  @Input() light: Light;
  @Input() data : String;

  constructor(private lightingService: LightingService){}

  toggle(light): void {
    console.log(light);
    if (light.Type === "Light/Switch") {
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
          let res = response.json();
        });
      })
    } else if (light.Type === "Scene" or light.Type === "Group") {
      console.log('hoi')
      this.lightingService.getScene(light.idx).subscribe(response => {
        console.log(response);
        let resp = response.json();
        if (resp.result[0].Data === "Off") {
          this.data = "On"
          document.getElementById(this.light.idx).classList.add('active');
        } else {
          this.data = "Off"
          document.getElementById(this.light.idx).classList.remove('active');
        }
        this.lightingService.toggleScene(light.idx, this.data).subscribe(response => {
          let res = response.json();
        });
      })
    }
  }

  ngOnInit(): void {
    //console.log(this.light)
  }
}
