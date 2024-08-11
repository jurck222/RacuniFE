import { Component, DestroyRef, inject, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice, InvoiceItem } from '../../../models/invoice-utils.models';
import { InvoiceService } from '../../../services/invoice.service';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-invoice-items',
  standalone: true,
  template: `
    @if (invoice()?.invoiceItems?.length) {
      <table class="table table-striped table-bordered table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Naziv postavke</th>
            <th scope="col">Cena</th>
            <th scope="col">Količina</th>
            <th scope="col">Skupaj</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          @for (item of invoice().invoiceItems; track $index) {
            <tr>
              <td>{{ item.itemName }}</td>
              <td>{{ item.price }}</td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-center">{{ item.price * item.quantity }}</td>
              <td>
                <button
                  class="unstyled-button"
                  (click)="deleteItem(item)">
                  <i class="fa-solid fa-trash text-secondary"></i>
                </button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <div class="text-secondary text-center mt-3"><h3>Račun nima postavk</h3></div>
    }
  `,
})
export class InvoiceItemsComponent {
  #invoiceService = inject(InvoiceService);
  #destroyRef = inject(DestroyRef);
  #modalService = inject(NgbModal);

  invoice = model.required<Invoice>();

  deleteItem(invoiceItem: InvoiceItem) {
    const modalRef = this.#modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.item.set(invoiceItem.itemName);
    modalRef.result.then(
      closed => {
        if (closed) {
          this.#invoiceService
            .deleteInvoiceItem(invoiceItem.id)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
              next: () => {
                this.invoice.update(invoice => {
                  return {
                    ...invoice,
                    invoiceItems: invoice.invoiceItems.filter(item => item.id !== invoiceItem.id),
                  };
                });
                this.#invoiceService.refetchInvoices.next();
              },
            });
        }
      },
      () => {
        //ignore on dissmis
      }
    );
  }
}
