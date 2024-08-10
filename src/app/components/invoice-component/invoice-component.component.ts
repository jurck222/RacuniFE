import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Invoice } from '../../models/invoice-utils.models';
import { InvoiceService } from '../../services/invoice.service';
@Component({
  selector: 'app-invoice-component',
  standalone: true,
  imports: [],
  template: `
    <p>invoice-component works!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponentComponent implements OnInit {
  #invoiceService = inject(InvoiceService);
  #destroyRef = inject(DestroyRef);

  invoices = signal<Invoice[]>([]);

  constructor() {
    effect(() => {
      if (this.invoices().length) {
        console.log(this.invoices());
      }
    });
  }
  ngOnInit(): void {
    this.#invoiceService
      .getInvoices()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({ next: invoices => this.invoices.set(invoices) });
  }
}
