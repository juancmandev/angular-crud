import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from './delete-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [DeleteUserComponent],
    exports: [DeleteUserComponent]
})
export class DeleteUserModule { }
