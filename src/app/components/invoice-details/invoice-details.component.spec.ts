import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Invoice, InvoiceItem } from '../../models/invoice-utils.models';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDetailsComponent } from './invoice-details.component';

describe('Testing InvoiceDetails', () => {
  let fixture: ComponentFixture<InvoiceDetailsComponent>;
  let component: InvoiceDetailsComponent;
  let invoiceService: InvoiceService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    fixture = TestBed.createComponent(InvoiceDetailsComponent);
    component = fixture.componentInstance;

    invoiceService = fixture.debugElement.injector.get(InvoiceService);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component.length()).toEqual(0);
    expect(component.selectedInvoice()).toBeNull();
    expect(component.selectedIndex()).toEqual(0);
    expect(component.priceSum()).toEqual(0);
  });

  it('should set values when subject is called', () => {
    invoiceService.selectInvoice.next({ item: testInvoice, index: 1, length: testInvoice.invoiceItems.length });
    fixture.detectChanges();

    expect(component.length()).toEqual(2);
    expect(component.selectedInvoice()).toEqual(testInvoice);
    expect(component.selectedIndex()).toEqual(1);
    expect(component.priceSum()).toEqual(95);
  });
});
