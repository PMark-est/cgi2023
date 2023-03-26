import { Component, Input, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() activeColor: string;
  @Input() activeBorder: string;
  checkoutMessage: string = 'Laena';
  private active: boolean;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    if (this.active) this.dialogRef.close();
    this.active = true;
    this.activeColor = '#3ab53a';
    this.activeBorder = 'solid 2px #000';
    this.checkoutMessage = 'Kinnita';
  }
}
