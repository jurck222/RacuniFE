import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponentComponent } from './components/invoice-component/invoice-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponentComponent],
  template: `
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <app-invoice-component />
        </div>
        <div class="col-md-6">
          <div class="text-center border"><h3 class="text-secondary p-5 ms-auto">Noben račun ni izbran</h3></div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  title = 'Racuni';
}
