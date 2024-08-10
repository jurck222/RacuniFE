import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponentComponent } from './components/invoice-component/invoice-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponentComponent],
  template: `
    <app-invoice-component />
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Racuni';
}
