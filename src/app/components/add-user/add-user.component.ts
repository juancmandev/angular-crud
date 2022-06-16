import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    addUserForm!: FormGroup;
    public positions = [{ id: 0, description: '' }];

    constructor(
        private dialogRef: MatDialogRef<AddUserComponent>,
        private dialog: MatDialog,
        private formBuilder: FormBuilder,
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.addUserForm = this.formBuilder.group({
            completeName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            age: ['', Validators.required],
            idPosition: ['', Validators.required],
            status: ['', Validators.required],
            logicalStatus: [1]
        });

        this.addUserForm.controls['status'].setValue(true);

        this.getPositions();
    }

    submitForm() {
        this.addUserForm.valid ? this.addUser() : this.invalidForm();
    }

    addUser() {
        this.api.createUser(this.addUserForm.value)
            .subscribe({
                next: (res) => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Usuario añadido con éxito'
                    }).afterClosed().subscribe(() => {
                        this.addUserForm.reset();
                        this.dialogRef.close('save');
                    });
                },
                error: () => {
                    this.dialog.open(ConfirmActionComponent, {
                        width: '40%',
                        data: 'Ha ocurrido un error al intentar añadir el usuario...'
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
