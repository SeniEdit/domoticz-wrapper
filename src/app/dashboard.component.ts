import { Component} from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./app.component.css']
})
export class DashboardComponent {

  test() {
    alert('New scene/light')
  }
}
