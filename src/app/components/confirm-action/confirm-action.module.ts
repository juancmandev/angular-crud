import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmActionComponent } from './confirm-action.component';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [ConfirmActionComponent],
    exports: [ConfirmActionComponent]
})
export class ConfirmActionModule { }
