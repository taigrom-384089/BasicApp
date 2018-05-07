import { Injectable, Injector } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EndpointFactory } from './endpoint-factory.service';

@Injectable()
export class UserEndpoint extends EndpointFactory {

    private readonly _usersUrl: string = "/api/users";

    get usersUrl() { return this.baseUrl + this._usersUrl; }

    constructor(http: Http, injector: Injector) {

        super(http, injector);
    }

    getUsersEndpoint() {
        return this.http.get(this.usersUrl, this.getAuthHeader())
        .map((response: Response) => {
            return response;
        })
        .catch(error => {
            return this.handleError(error);
        });
    }
}