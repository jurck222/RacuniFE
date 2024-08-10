import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../models/invoice-utils.models';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceControlsComponent } from './invoice-controls/invoice-controls.component';
import { InvoiceItemsComponent } from './invoice-items/invoice-items.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [FormsModule, DatePipe, InvoiceItemsComponent, NgClass, InvoiceControlsComponent],
  templateUrl: './invoice-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsComponent implements OnInit {
  #invoiceService = inject(InvoiceService);

  selectedInvoice = signal<Invoice>(null);
  selectedIndex = signal<number>(0);
  currDate = new Date();

  priceSum = computed<number>(() =>
    this.selectedInvoice()
      ? this.selectedInvoice().invoiceItems?.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : 0
  );

  ngOnInit() {
    this.#invoiceService.selectInvoice.subscribe(invoice => {
      this.selectedInvoice.set(invoice.item);
      this.selectedIndex.set(invoice.index);
    });
  }
}
