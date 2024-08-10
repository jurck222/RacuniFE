import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { InvoiceItem } from '../../../models/invoice-utils.models';

@Component({
  selector: 'app-invoice-items',
  standalone: true,
  imports: [],
  template: `
    @if (invoiceItems().length) {
      <table class="table table-striped table-bordered table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Naziv postavke</th>
            <th scope="col">Cena</th>
            <th scope="col">Količina</th>
            <th scope="col">Skupaj</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          @for (item of invoiceItems(); track $index) {
            <tr>
              <td>{{ item.itemName }}</td>
              <td>{{ item.price }}</td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-center">{{ item.price * item.quantity }}</td>
              <td>
                <button class="unstyled-button"><i class="fa-solid fa-trash text-secondary"></i></button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    } @else {
      <div class="text-secondary text-center mt-3"><h3>Račun nima postavk</h3></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceItemsComponent {
  invoiceItems = input.required<InvoiceItem[]>();
}
