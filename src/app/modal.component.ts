import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./app.component.css']
})
export class ModalComponent {
  @Input() title: string;
  @Input() content: string;

  constructor() { }

  close() {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  }
}
