import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
        private api: ApiService
    ) { }

    changeUserStatus() {
        this.userData.status = !this.userData.status;

        this.api.editUser(this.userData, this.userData.id)
        .subscribe({
            next: (res) => {
                alert('Estatus de usuario editado con éxito');
                this.dialogRef.close('save');
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
