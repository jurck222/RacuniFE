import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Invoice } from '../../models/invoice-utils.models';
import { InvoiceService } from '../../services/invoice.service';
@Component({
  selector: 'app-invoice-component',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="table-responsive">
      <table class="table table-striped table-hover table-bordered table-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Št. Računa</th>
            <th scope="col">Prejemnik</th>
          </tr>
        </thead>
        <tbody>
          @for (invoice of invoices(); track $index) {
            @let tdCss = { 'table-danger': invoice.expiresAt < currDate };
            <tr
              (click)="showInvoice($index)"
              role="button">
              <td [ngClass]="tdCss">
                {{ invoice.invoiceNumber }}
              </td>
              <td [ngClass]="tdCss">{{ invoice.recipient }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceComponentComponent implements OnInit {
  #invoiceService = inject(InvoiceService);
  #destroyRef = inject(DestroyRef);

  invoices = signal<Invoice[]>([]);
  currDate = new Date();

  ngOnInit(): void {
    this.#invoiceService.refetchInvoices.subscribe(() => {
      console.log('here');
      this.#fetchInvoices();
    });
    this.#invoiceService.selectNextInvoice.subscribe(index => this.showInvoice(index));
    this.#fetchInvoices();
  }

  showInvoice(index: number) {
    this.#invoiceService.selectInvoice.next({ item: this.invoices()[index], index });
  }

  #fetchInvoices() {
    this.#invoiceService
      .getInvoices()
      .pipe(
        map(invoices =>
          invoices.map((invoice: Invoice) => ({
            ...invoice,
            createdAt: new Date(invoice.createdAt),
            expiresAt: new Date(invoice.expiresAt),
          }))
        ),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe({ next: invoices => this.invoices.set(invoices) });
  }
}
