import { Component, Input } from '@angular/core';
import { LightsComponent } from './lights.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./app.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() content: string;
  @Input() itemType: String;


  constructor(private lightsComponent: LightsComponent) { }

  filterBy(filterType) {
    console.log(filterType);

    this.lightsComponent.filterBy(filterType);
  }

  close() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
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
}
