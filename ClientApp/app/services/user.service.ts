import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user.model';
import { UserEndpoint } from './endpoint/user-endpoint.service';

@Injectable()
export class UserService {
    constructor(private http: Http, private userEndpoint: UserEndpoint) { }

    getAll() {

        return this.userEndpoint.getUsersEndpoint()
            .map((response: Response) => <User>response.json());
    }

    // getById(id: number) {
    //     return this.http.get(this.config.apiUrl + '/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // create(user: User) {
    //     return this.http.post(this.config.apiUrl + '/users', user, this.jwt());
    // }

    // update(user: User) {
    //     return this.http.put(this.config.apiUrl + '/users/' + user.id, user, this.jwt());
    // }

    // delete(id: number) {
    //     return this.http.delete(this.config.apiUrl + '/users/' + id, this.jwt());
    // }
}