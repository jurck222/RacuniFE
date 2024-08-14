import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('Testing ConfirmModal', () => {
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let activeModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);

    activeModal = fixture.debugElement.injector.get(NgbActiveModal);
    fixture.detectChanges();
  });

  it('should dissmis modal', fakeAsync(() => {
    spyOn(activeModal, 'dismiss');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[0].nativeElement.click();
    tick(50);

    expect(activeModal.dismiss).toHaveBeenCalled();
  }));

  it('should confirm', fakeAsync(() => {
    spyOn(activeModal, 'close');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[1].nativeElement.click();
    tick(50);

    expect(activeModal.close).toHaveBeenCalledWith(true);
  }));

  it('should reject', fakeAsync(() => {
    spyOn(activeModal, 'close');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    buttons[2].nativeElement.click();
    tick(50);

    expect(activeModal.close).toHaveBeenCalledWith();
  }));
});
