import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../components/add-user/add-user.component';
import { EditUserComponent } from '../components/edit-user/edit-user.component';
import { ChangeStatusComponent } from '../components/change-status/change-status.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-crud',
    styleUrls: ['./crud.page.css'],
    templateUrl: './crud.page.html',
})
export class CrudPage implements OnInit {
    searchForm!: FormGroup;
    displayedColumns: string[] = ['id', 'name', 'age', 'position', 'status', 'actions'];
    dataSource: any;

    filterBy: string = 'completeName';
    filtersBy = [
        { name: 'Id', value: 'id', options: [] },
        { name: 'Nombre', value: 'completeName', options: [] },
        { name: 'Cargo', value: 'position', options: [] },
    ];

    tableCopy: any = [];

    private positions = [{ id: 0, description: '' }];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private api: ApiService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.searchForm = this.formBuilder.group({
            searchValue: [''],
            filterBy: ['']
        });

        this.searchForm.controls['filterBy'].setValue('completeName')

        this.getPositions();
        this.getUsers();

    }

    addUser() {
        this.dialog.open(AddUserComponent, {
            width: '40%'
        }).afterClosed().subscribe((val: string) => {
            val === 'save' ? this.getUsers() : '';
        });
    }

    editUser(row: User) {
        this.dialog.open(EditUserComponent, {
            width: '40%',
            data: row
        }).afterClosed().subscribe((val: string) => {
            val === 'save' ? this.getUsers() : '';
        });
    }

    deleteUser(row: User) {
        this.dialog.open(DeleteUserComponent, {
            width: '40%',
            data: row
        }).afterClosed().subscribe((val: string) => {
            val === 'save' ? this.getUsers() : '';
        });
    }

    changeStatus(row: any) {
        this.dialog.open(ChangeStatusComponent, {
            width: '40%',
            data: row
        }).afterClosed().subscribe((val: string) => {
            val === 'save' ? this.getUsers() : '';
        });
    }

    getUsers() {
        this.api.getUsers()
            .subscribe({
                next: (res: Array<any>) => {
                    const nonDeletedUsers = res.filter(user => user.logicalStatus === 1);

                    nonDeletedUsers.forEach((data: User) => {
                        data.position = this.convertIdToPosition(data.idPosition);
                    });

                    this.dataSource = new MatTableDataSource<User>(nonDeletedUsers);
                    this.tableCopy = this.dataSource;
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

    changeFilter(filter: string) {
        this.filterBy = filter;
    }

    searchData(event: Event) {
        const searchValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

        if (searchValue !== '') {
            const filteredData: Array<any> = [];
            this.tableCopy.data.forEach((data: any) => {
                if (this.filterBy === 'id') {
                    data[this.filterBy].toString().includes(searchValue) ? filteredData.push(data) : null;
                } else {
                    data[this.filterBy].trim().toLowerCase().includes(searchValue) ? filteredData.push(data) : null;
                }
            });

            this.dataSource = filteredData;
        } else {
            this.dataSource = this.tableCopy;
        }
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
    position: string;
    status: boolean;
};

export interface Position {
    id: number;
    description: string;
};
