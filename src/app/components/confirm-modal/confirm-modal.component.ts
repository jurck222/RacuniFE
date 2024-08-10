import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    <div class="modal-header">
      <h4
        class="modal-title w-100 text-center"
        id="modal-basic-title">
        Potrdi brisanje
      </h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="modal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body d-flex flex-column align-items-center">
      <span class="text-danger text-center mb-3">
        Ste prepričani da želite izbrisati postavko:
        <br />
        <strong>{{ item() }}</strong>
      </span>
      <div class="modal-footer w-100 d-flex justify-content-center p-2">
        <button
          type="button"
          (click)="onConfirm()"
          class="btn btn-outline-danger">
          Potrdi
        </button>
        <button
          type="button"
          (click)="modal.close()"
          class="btn btn-outline-success">
          Zavrni
        </button>
      </div>
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  modal = inject(NgbActiveModal);
  item = signal('');

  onConfirm() {
    this.modal.close(true);
  }
}
