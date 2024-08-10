import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceComponentComponent } from './components/invoice-component/invoice-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponentComponent, NgbPopover],
  template: `
    <div class="container mt-5">
      <div class="text-center">
        <h1>Računi</h1>
        <button
          type="button"
          title="klikni za info"
          class="unstyled-button"
          placement="bottom"
          [ngbPopover]="popoverBody"
          [popoverTitle]="popoverTitle">
          <i class="fa-solid fa-circle-info"></i>
        </button>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <app-invoice-component />
        </div>
        <div class="col-md-6">
          <div class="text-center border"><h3 class="text-secondary p-5 ms-auto">Noben račun ni izbran</h3></div>
        </div>
      </div>
    </div>

    <ng-template #popoverTitle>Pregled računov</ng-template>
    <ng-template #popoverBody>
      <p>
        S klikom na vsrtico v tabeli računov lahko izberete račun in si pogledate njegove informacije na desnem delu
        ekrana.
      </p>
      <p>Računom, ki so označeni z rdečo je potekel rok.</p>
    </ng-template>
  `,
})
export class AppComponent {}
