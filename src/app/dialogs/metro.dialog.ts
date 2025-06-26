import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Metro } from '../../music/metro';

@Component({
  selector: 'metro-dialog',
  templateUrl: './metro.html',
  standalone: false,
})
export class MetroDialog {
  metro: Metro;

  constructor(public dialogRef: MatDialogRef<MetroDialog>) {}

  done() {
    this.dialogRef.close('LOADED');
  }
}
