
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./app.component.css']
})
export class ToastComponent {
  @Input() message: string;

  constructor() { }

}
