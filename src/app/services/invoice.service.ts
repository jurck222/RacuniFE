import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Invoice } from '../models/invoice-utils.models';
import { url } from '../util/consts';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  http = inject(HttpClient);
  getInvoices() {
    return this.http.get<Invoice[]>(`${url}Invoice`);
  }
}
