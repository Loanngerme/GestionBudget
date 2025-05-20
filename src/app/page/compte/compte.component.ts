import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddPayeConfirmationDialogComponent } from '../../components/add-paye-confirmation-dialog/add-paye-confirmation-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import {TranslatePipe, TranslateDirective} from "@ngx-translate/core";
import { TransactionComponent } from '../transaction/transaction.component';
import { PayeService } from '../../services/paye.service';

@Component({
  selector: 'app-compte',
  standalone: true,
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.scss',
  imports: [
    MatDialogModule,
    MatButtonModule,
    TranslatePipe, TranslateDirective,
  ]
})
export class CompteComponent {

    private translate = inject(TranslateService);
    payeService = inject(PayeService);

  get totalPaye() {
    return this.payeService.total;
  }

}