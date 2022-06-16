import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudPage } from './crud.page';
import { CrudRoutingModule } from './crud-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [
        CommonModule,
        CrudRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [CrudPage]
})
export class CrudModule { }
