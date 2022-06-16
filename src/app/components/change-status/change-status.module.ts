import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeStatusComponent } from './change-status.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule
    ],
    declarations: [ChangeStatusComponent],
    exports: [ChangeStatusComponent]
})
export class ChangeStatusModule { }
