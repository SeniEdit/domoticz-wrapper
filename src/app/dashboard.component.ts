import { Component} from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./app.component.css']
})
export class DashboardComponent {

  test() {
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
