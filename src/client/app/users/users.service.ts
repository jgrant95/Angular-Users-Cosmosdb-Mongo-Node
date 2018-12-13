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
}