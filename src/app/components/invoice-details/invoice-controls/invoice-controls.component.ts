import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';

@Component({
  selector: 'app-invoice-controls',
  standalone: true,
  template: `
    <div class="mt-4 d-flex gap-2">
      @if (selectedIndex() > 0) {
        <button
          class="unstyled-button"
          (click)="goBack()">
          <i class="fa-solid fa-backward"></i>
        </button>
      }
      @if (selectedIndex() < itemsLength() - 1) {
        <button
          class="unstyled-button"
          (click)="goToNext()">
          <i class="fa-solid fa-forward"></i>
        </button>
      }
    </div>
  `,
  styles: `
    i {
      font-size: 20px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceControlsComponent {
  #invoiceService = inject(InvoiceService);
  selectedIndex = input.required<number>();
  itemsLength = input.required<number>();

  goToNext() {
    this.#invoiceService.selectNextInvoice.next(this.selectedIndex() + 1);
  }

  goBack() {
    this.#invoiceService.selectNextInvoice.next(this.selectedIndex() - 1);
  }
}
