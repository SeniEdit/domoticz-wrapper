import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { LightingService } from './lighting.service';
import { Scene } from './scene';

@Component({
  selector: 'scenes',
  templateUrl: './scenes.component.html',
  styleUrls: ['./app.component.css']
})
export class ScenesComponent implements OnInit {
  scenes;
  loading;

  constructor(private lightingService: LightingService){}

  setScenes(): void {
    this.lightingService.getAllScenes().subscribe(scenes => {
      this.scenes = scenes;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.setScenes();
  }
}
