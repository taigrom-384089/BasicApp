import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { DBkeys } from './db-keys';
import { LocalStoreManager } from './local-store-manager.service';
import { EndpointFactory } from './endpoint/endpoint-factory.service';
import { User } from '../models/user.model';
import { Utilities } from './utilities';

@Injectable()
export class AuthService {
    
    public get loginUrl() { return '/Login'; }
    public get homeUrl() { return '/home'; }

    public loginRedirectUrl: string;
    public logoutRedirectUrl: string;
    
    constructor(private http: Http, private router: Router, private localStorage: LocalStoreManager, private endpointFactory: EndpointFactory) { }

    login(username: string, password: string, rememberMe?: boolean) {

        return this.endpointFactory.getLoginEndpoint(username, password)
            .map((response: Response) => this.processLoginResponse(response, rememberMe));
    }

    private processLoginResponse(response: Response, rememberMe: boolean) {
        let user = response.json();
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return <User>user;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    get accessToken(): string {

        return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
    }

    get rememberMe(): boolean {
        return this.localStorage.getDataObject<boolean>(DBkeys.REMEMBER_ME) == true;
    }

    redirectLoginUser() {
        let redirect = this.loginRedirectUrl && this.loginRedirectUrl != '/' && this.loginRedirectUrl != this.homeUrl ? this.loginRedirectUrl : this.homeUrl;
        this.loginRedirectUrl = null;


        let urlParamsAndFragment = Utilities.splitInTwo(redirect, '#');
        let urlAndParams = Utilities.splitInTwo(urlParamsAndFragment.firstPart, '?');

        let navigationExtras: NavigationExtras = {
            fragment: urlParamsAndFragment.secondPart,
            queryParams: Utilities.getQueryParamsFromString(urlAndParams.secondPart),
            queryParamsHandling: "merge"
        };

        this.router.navigate([urlAndParams.firstPart], navigationExtras);
    }

    get isLoggedIn(): boolean {
        return this.currentUser != null;
    }

    get currentUser(): User {

        let user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);

        return user;
    }

    get isSessionExpired(): boolean {

        if (this.accessTokenExpiryDate == null) {
            return true;
        }

        return !(this.accessTokenExpiryDate.valueOf() > new Date().valueOf());
    }

    get accessTokenExpiryDate(): Date {

        return this.localStorage.getDataObject<Date>(DBkeys.TOKEN_EXPIRES_IN, true);
    }
}