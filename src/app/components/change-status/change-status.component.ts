import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'change-status',
    templateUrl: './change-status.component.html',
    styleUrls: ['./change-status.component.css']
})
export class ChangeStatusComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public userData: any,
        private dialogRef: MatDialogRef<ChangeStatusComponent>,
        private dialog: MatDialog,
        private api: ApiService
    ) { }

    changeUserStatus() {
        this.userData.status = !this.userData.status;

        this.api.editUser(this.userData, this.userData.id)
            .subscribe({
                next: (res) => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Estatus cambiado con éxito'
                    }).afterClosed().subscribe(() => {
                        this.dialogRef.close('save');
                    });
                },
                error: () => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Ha ocurrido un error al intentar cambiar el estatus del usuario'
                    });
                }
            });
    }

    closeDialog() {
        this.dialogRef.close('cancel');
    }
}
