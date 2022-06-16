import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'user-dialog',
    templateUrl: './dialog-user.component.html',
    styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
    public userForm!: FormGroup;
    public positions = [{ id: 0, description: '' }];

    constructor(
        private dialogRef: MatDialogRef<DialogUserComponent>,
        private formBuilder: FormBuilder,
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            completeName: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            age: ['', Validators.required],
            idPosition: ['', Validators.required],
            status: [true, Validators.required]
        });

        this.getPositions();
    }

    submitForm() {
        this.userForm.valid ? this.addUser() : this.invalidForm();
    }

    addUser() {
        this.api.createUser(this.userForm.value)
        .subscribe({
            next:(res) => {
                alert('Usuario añadido con éxito');
                this.userForm.reset();
                this.dialogRef.close('save');
            },
            error:() => {
                alert('Ha ocurrido un error inesperado...');
            }
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

    invalidForm() {
        alert('Por favor, llene los campos marcados con un asterisco (*)');
    }

    closeDialog() {
        this.dialogRef.close('cancel');
    }
}
