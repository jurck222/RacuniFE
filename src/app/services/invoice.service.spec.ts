import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Invoice, InvoiceItem } from '../models/invoice-utils.models';
import { url } from '../util/consts';
import { InvoiceService } from './invoice.service';

describe('Testing InvoiceService', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;

  const testInvoiceItem: InvoiceItem = {
    id: 1,
    itemName: 'TV - JAVNA RABA - PAVŠAL',
    quantity: 4,
    price: 17.5,
  };

  const testInvoiceItem2: InvoiceItem = {
    id: 2,
    itemName: 'TV - ZASEBNA RABA - PAVŠAL',
    quantity: 2,
    price: 12.5,
  };

  const testInvoice: Invoice = {
    id: 1,
    invoiceNumber: 245678,
    address: 'Testna pot 404',
    createdAt: new Date(),
    expiresAt: new Date(),
    city: '0000, Neznano Mesto',
    recipient: 'Testko Testni',
    invoiceItems: [testInvoiceItem, testInvoiceItem2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoiceService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(InvoiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get invoices', () => {
    service.getInvoices().subscribe(response => {
      expect(response).toEqual([testInvoice]);
    });

    const req = httpMock.expectOne(`${url}Invoice`);
    expect(req.request.method).toBe('GET');
    req.flush([testInvoice]);
  });

  it('shoudl delete invoice item', () => {
    service.deleteInvoiceItem(2).subscribe(response => {
      expect(response).toEqual('Invoice item successfully deleted');
    });

    const req = httpMock.expectOne(`${url}InvoiceItem/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush('Invoice item successfully deleted');
  });
});
