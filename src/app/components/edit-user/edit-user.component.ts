import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';

@Component({
    selector: 'edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
    editUserForm!: FormGroup;
    public positions = [{ id: 0, description: '' }];

    constructor(
        @Inject(MAT_DIALOG_DATA) public editUserData: any,
        private dialogRef: MatDialogRef<EditUserComponent>,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.editUserForm = this.formBuilder.group({
            completeName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            age: ['', Validators.required],
            idPosition: ['', Validators.required],
            status: ['', Validators.required],
            logicalStatus: [1]
        });

        this.editUserForm.controls['completeName'].setValue(this.editUserData.completeName);
        this.editUserForm.controls['dateOfBirth'].setValue(this.editUserData.dateOfBirth);
        this.editUserForm.controls['age'].setValue(this.editUserData.age);
        this.editUserForm.controls['idPosition'].setValue(this.editUserData.idPosition);
        this.editUserForm.controls['status'].setValue(this.editUserData.status);

        this.getPositions();
    }

    submitForm() {
        this.editUserForm.valid ? this.editUser() : this.invalidForm();
    }

    editUser() {
        this.api.editUser(this.editUserForm.value, this.editUserData.id)
            .subscribe({
                next: (res) => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Usuario editado con éxito'
                    }).afterClosed().subscribe(() => {
                        this.dialogRef.close('save');
                        this.editUserForm.reset();
                    });
                },
                error: () => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Ha ocrrido un error al intentar editar el usuario...'
                    });
                }
            });
    }

    invalidForm() {
        this.dialog.open(ConfirmActionComponent, {
            width: '40%',
            data: 'Por favor, llene los campos marcados con un asterisco "*"'
        });
    }

    getPositions() {
        this.api.getPositions()
            .subscribe({
                next: (res) => {
                    this.positions = res;
                },
                error: (error) => {
                    console.error(error);
                }
            });
    }

    closeDialog() {
        this.dialogRef.close('cancel');
    }
}
