import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Invoice } from '../models/invoice-utils.models';
import { url } from '../util/consts';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  selectInvoice = new Subject<{ item: Invoice; index: number }>();
  refetchInvoices = new Subject<void>();
  selectNextInvoice = new Subject<number>();

  #http = inject(HttpClient);
  getInvoices() {
    return this.#http.get<Invoice[]>(`${url}Invoice`);
  }

  deleteInvoiceItem(itemId: number) {
    return this.#http.delete(`${url}InvoiceItem/${itemId}`, { responseType: 'text' });
  }
}
