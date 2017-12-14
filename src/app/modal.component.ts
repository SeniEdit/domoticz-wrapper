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
  }

  close() {
    const modals = document.getElementsByTagName('app-modal');
    const overlay = document.getElementById('overlay');
    const body = document.getElementsByTagName('body')[0];

    for (let i = 0; i < modals.length; i++) {
      if (!modals[i].classList.contains('hidden')) {
        modals[i].classList.add('hidden');
        overlay.classList.add('hidden');
        body.style.overflowY = 'scroll';
      }
    }
  }
}
