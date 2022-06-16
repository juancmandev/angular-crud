import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'confirm-action',
    templateUrl: './confirm-action.component.html',
    styleUrls: ['./confirm-action.component.css']
})
export class ConfirmActionComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public action: string,
        private dialogRef: MatDialogRef<ConfirmActionComponent>
    ) { }

    closeDialog() {
        this.dialogRef.close('cancel');
    }
}
