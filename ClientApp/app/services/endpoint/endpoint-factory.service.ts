import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { AuthService } from './../auth.service';
import { Utilities } from './../utilities';


@Injectable()
export class EndpointFactory {

    private readonly _loginUrl: string = '/users/authenticate';

    public baseUrl: string = Utilities.baseUrl().replace(/\/$/, '');

    private get loginUrl() { return this.baseUrl + this._loginUrl; }

    private _authService: AuthService;

    private get authService() {
        if (!this._authService)
            this._authService = this.injector.get(AuthService);

        return this._authService;
    }


    constructor(protected http: Http, private injector: Injector) {

    }

    getLoginEndpoint(userName: string, password: string): Observable<Response> {

        let header = new Headers();
        header.append("Content-Type", "application/x-www-form-urlencoded");

        let searchParams = new URLSearchParams();
        searchParams.append('username', userName);
        searchParams.append('password', password);
        searchParams.append('grant_type', 'password');
        searchParams.append('resource', window.location.origin);

        let requestBody = searchParams.toString();

        return this.http.post(this.loginUrl, requestBody, { headers: header });
    }

    protected getAuthHeader(includeJsonContentType?: boolean): RequestOptions {
        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.accessToken });

        if (includeJsonContentType)
            headers.append("Content-Type", "application/json");

        //headers.append("Accept", `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`);

        return new RequestOptions({ headers: headers });
    }

    protected handleError(error) {

        if (error.url && error.url.toLowerCase().includes(this.loginUrl.toLowerCase())) {
            return Observable.throw('session expired');
        }
        else {
            return Observable.throw(error || 'server error');
        }
    }
}