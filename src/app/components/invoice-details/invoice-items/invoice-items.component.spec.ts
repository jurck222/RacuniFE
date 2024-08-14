import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Invoice, InvoiceItem } from '../../../models/invoice-utils.models';
import { InvoiceService } from '../../../services/invoice.service';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { InvoiceItemsComponent } from './invoice-items.component';

describe('testing InvoiceItemsComponent', () => {
  let fixture: ComponentFixture<InvoiceItemsComponent>;
  let component: InvoiceItemsComponent;
  let confirmModalComponent: ConfirmModalComponent;
  let invoiceService: InvoiceService;
  let modalService: NgbModal;

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
      imports: [InvoiceItemsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceItemsComponent);
    component = fixture.componentInstance;
    confirmModalComponent = TestBed.createComponent(ConfirmModalComponent).componentInstance;

    invoiceService = fixture.debugElement.injector.get(InvoiceService);
    modalService = fixture.debugElement.injector.get(NgbModal);

    fixture.componentRef.setInput('invoice', testInvoice);
  });

  it('should open modal and delete item from invoice', waitForAsync(() => {
    const mockModal: Partial<NgbModalRef> = {
      result: new Promise(resolve => resolve(true)),
      componentInstance: confirmModalComponent,
    };

    spyOn(modalService, 'open').and.returnValue(mockModal as NgbModalRef);
    spyOn(invoiceService, 'deleteInvoiceItem').and.returnValue(of(void 0));

    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(modalService.open).toHaveBeenCalled();
      expect(invoiceService.deleteInvoiceItem).toHaveBeenCalledWith(2);
      expect(component.invoice().invoiceItems).toEqual([testInvoiceItem]);
    });
  }));

  it('should open modal and not delete item from invoice', waitForAsync(() => {
    const mockModal: Partial<NgbModalRef> = {
      result: new Promise((_resolve, reject) => reject('dismiss')),
      componentInstance: confirmModalComponent,
    };

    spyOn(modalService, 'open').and.returnValue(mockModal as NgbModalRef);
    spyOn(invoiceService, 'deleteInvoiceItem').and.returnValue(of(void 0));

    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(modalService.open).toHaveBeenCalled();
      expect(invoiceService.deleteInvoiceItem).not.toHaveBeenCalled();
      expect(component.invoice().invoiceItems).toEqual([testInvoiceItem, testInvoiceItem2]);
    });
  }));
});
