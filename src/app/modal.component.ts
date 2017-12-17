import { Component, Input } from '@angular/core';
import { LightsComponent } from './lights.component';
import { ScenesComponent } from './scenes.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./app.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() itemType: String;

  constructor(private lightsComponent: LightsComponent, private scenesComponent: ScenesComponent) { }

  filterBy(filterType) {
    if (this.itemType === 'switches') {
      this.lightsComponent.filterBy(filterType);
    } else if (this.itemType === 'scenes') {
      this.scenesComponent.filterBy(filterType);
    }
    this.close();
  }

  open() {
    const modal = document.getElementById(`${this.itemType}-modal`);
    const overlay = document.getElementById(`${this.itemType}-overlay`);
    const body = document.getElementsByTagName('body')[0];

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    body.style.overflowY = 'hidden';
  }

  close() {
    const modal = document.getElementById(`${this.itemType}-modal`);
    const overlay = document.getElementById(`${this.itemType}-overlay`);
    const body = document.getElementsByTagName('body')[0];

    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    body.style.overflowY = 'scroll';
  }
}
