import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-crud',
    styleUrls: ['./crud.page.css'],
    templateUrl: './crud.page.html',
})
export class CrudPage implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'age', 'position', 'status', 'actions'];
    dataSource: any;

    private positions = [{ id: 0, description: '' }];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.getUsers();
        this.getPositions();
    }

    addUser() {
        this.dialog.open(DialogUserComponent, {
            width: '40%'
        }).afterClosed().subscribe((val: string) => {
            val === 'save' ? this.getUsers() : '';
        });
    }

    getUsers() {
        this.api.getUsers()
            .subscribe({
                next: (res: Array<any>) => {
                    this.dataSource = new MatTableDataSource<User>(res);
                    this.dataSource.paginator = this.paginator;
                },
                error: (error) => {
                    console.error(error);
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

    convertIdToPosition(positionId: number) {
        const position = this.positions.filter(position => position.id === positionId);

        return position[0]?.description;
    }
}

export interface User {
    id: number;
    completeName: string;
    age: number;
    idPosition: number;
    status: boolean;
};

export interface Position {
    id: number;
    description: string;
};
