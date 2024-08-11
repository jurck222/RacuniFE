import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Invoice, InvoiceItem } from '../../models/invoice-utils.models';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceComponent } from './invoice.component';

fdescribe('testing InvoiceComponent', () => {
  let fixture: ComponentFixture<InvoiceComponent>;
  let component: InvoiceComponent;
  let invoiceService: InvoiceService;

  const testInvoiceItem: InvoiceItem = {
    id: 1,
    itemName: 'TV - JAVNA RABA - PAVŠAL',
    quantity: 4,
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
    invoiceItems: [testInvoiceItem],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;

    invoiceService = fixture.debugElement.injector.get(InvoiceService);
  });

  it('should fetch invoices', () => {
    spyOn(invoiceService, 'getInvoices').and.returnValue(of([testInvoice]));

    fixture.detectChanges();

    expect(invoiceService.getInvoices).toHaveBeenCalled();
    expect(component.invoices()[0]).toEqual(testInvoice);
  });

  it('should refetch invoices', () => {
    spyOn(invoiceService, 'getInvoices').and.returnValue(of([testInvoice]));

    fixture.detectChanges();
    invoiceService.refetchInvoices.next();
    fixture.detectChanges();

    expect(invoiceService.getInvoices).toHaveBeenCalledTimes(2);
    expect(component.invoices()[0]).toEqual(testInvoice);
  });

  it('should show invoice', () => {
    spyOn(invoiceService.selectInvoice, 'next');

    fixture.detectChanges();
    invoiceService.selectNextInvoice.next(0);
    fixture.detectChanges();

    expect(invoiceService.selectInvoice.next).toHaveBeenCalled();
  });
});
