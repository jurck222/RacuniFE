import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InvoiceService } from '../../../services/invoice.service';
import { InvoiceControlsComponent } from './invoice-controls.component';
describe('testing InvoiceControlsComponent', () => {
  let fixture: ComponentFixture<InvoiceControlsComponent>;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceControlsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceControlsComponent);

    invoiceService = fixture.debugElement.injector.get(InvoiceService);

    fixture.componentRef.setInput('itemsLength', 5);
  });

  it('should show both buttons', () => {
    fixture.componentRef.setInput('selectedIndex', 1);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(2);
  });

  it('should show only back button', () => {
    fixture.componentRef.setInput('selectedIndex', 5);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(1);
  });

  it('should show only next button', () => {
    fixture.componentRef.setInput('selectedIndex', 0);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(1);
  });

  it('should show call selectNext subject to go to next invoice', fakeAsync(() => {
    spyOn(invoiceService.selectNextInvoice, 'next');
    fixture.componentRef.setInput('selectedIndex', 0);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    tick(50);

    expect(buttons.length).toEqual(1);
    expect(invoiceService.selectNextInvoice.next).toHaveBeenCalledWith(1);
  }));

  it('should show call selectNext subject to go one invoice back', fakeAsync(() => {
    spyOn(invoiceService.selectNextInvoice, 'next');
    fixture.componentRef.setInput('selectedIndex', 2);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    tick(50);

    expect(buttons.length).toEqual(2);
    expect(invoiceService.selectNextInvoice.next).toHaveBeenCalledWith(1);
  }));
});
