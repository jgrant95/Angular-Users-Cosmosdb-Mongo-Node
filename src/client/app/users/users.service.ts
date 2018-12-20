import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { User } from './user';

const api = "/api"

@Injectable()
export class UsersService {
    constructor(private http: HttpClient){}

    getUsers() {
        return this.http.get<Array<User>>(`${api}/users`)
    }

    addUser(user: User) {
        return this.http.post<User>(`${api}/user`, user)
    }

    putUser(id: string, user: User) {
        return this.http.put<User>(`${api}/user/${id}`, user)
    }

    deleteUser(id: string) {
        return this.http.delete<User>(`${api}/user/${id}`)
    }
}