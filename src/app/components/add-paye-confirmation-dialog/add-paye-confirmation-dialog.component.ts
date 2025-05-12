import { Component } from '@angular/core';
import { MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogContent} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-add-paye-confirmation-dialog',
  imports: [MatDialogActions, MatDialogTitle, MatDialogClose, MatDialogContent, MatButtonModule],
  templateUrl: './add-paye-confirmation-dialog.component.html',
  styleUrl: './add-paye-confirmation-dialog.component.scss'
})
export class AddPayeConfirmationDialogComponent {

}
