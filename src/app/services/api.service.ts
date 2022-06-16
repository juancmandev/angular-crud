import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor (private http: HttpClient) { }

    createUser(data: any) {
        return this.http.post<any>('http://localhost:3000/users/', data);
    }

    getUsers() {
        return this.http.get<any>('http://localhost:3000/users/');
    }

    getPositions() {
        return this.http.get<any>('http://localhost:3000/positions/');
    }

    editUser(data: any, id: number) {
        return this.http.put<any>('http://localhost:3000/users/'+id, data);
    }

    logicalDeleteUser(data: any, id: number) {
        return this.http.put<any>('http://localhost:3000/users/'+id, data);
    }
}
