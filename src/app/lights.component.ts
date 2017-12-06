import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LightingService } from './lighting.service';
import { Light } from './light';

@Component({
  selector: 'lights',
  templateUrl: './lights.component.html',
  styleUrls: ['./app.component.css']
})
export class LightsComponent implements OnInit {
  lights;

  constructor(private lightingService: LightingService){}

  setSwitches(): void {
    this.lightingService.getAllSwitches().subscribe(lights => {
      this.lights = lights;
    });
  }

  ngOnInit(): void {
    this.setSwitches();
  }
}
