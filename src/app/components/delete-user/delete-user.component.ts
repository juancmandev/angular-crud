import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

    constructor(
        @Inject(MAT_DIALOG_DATA) public userData: any,
        private dialogRef: MatDialogRef<DeleteUserComponent>,
        private dialog: MatDialog,
        private api: ApiService
    ) { }

    deleteUser() {
        this.userData.logicalStatus = 0;

        this.api.logicalDeleteUser(this.userData, this.userData.id)
            .subscribe({
                next: (res) => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Usuario eliminado con éxito'
                    }).afterClosed().subscribe(() => {
                        this.dialogRef.close('save');
                    });
                },
                error: () => {
                    alert('Ha ocurrido un error inesperado...');
                }
            });
    }

    closeDialog() {
        this.dialogRef.close('cancel');
    }
}
