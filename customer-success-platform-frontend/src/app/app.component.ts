import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
loadComponent($event: Event) {
throw new Error('Method not implemented.');
}
  title = "Customer Success Platform";
}
