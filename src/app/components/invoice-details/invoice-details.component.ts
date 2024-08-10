import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../models/invoice-utils.models';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './invoice-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceDetailsComponent implements OnInit {
  #invoiceService = inject(InvoiceService);

  selectedInvoice = signal<Invoice>(null);
  priceSum = computed<number>(() =>
    this.selectedInvoice() ? this.selectedInvoice().invoiceItems?.reduce((sum, item) => sum + item.price, 0) : 0
  );

  ngOnInit() {
    this.#invoiceService.selectInvoice.subscribe(invoice => this.selectedInvoice.set(invoice));
  }
}
