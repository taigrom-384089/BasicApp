import { Component, OnInit, OnDestroy, Input } from "@angular/core";

import { AuthService } from '../../services/auth.service';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { UserLogin } from '../../models/user-login.model';

@Component({
    selector: "app-login",
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    userLogin = new UserLogin();
    loading = false;
    loginStatusSubscription: any;

    constructor(private authService: AuthService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.userLogin.rememberMe = this.authService.rememberMe;

        if (this.getShouldRedirect()) {
            this.authService.redirectLoginUser();
        }
    }

    login() {
        this.loading = true;
        this.authService.login(this.userLogin.username, this.userLogin.password)
            .subscribe(
                user => {
                    
                },
                error => {
                    this.alertService.showMessage('Username or password is incorrect');
                    this.loading = false;
                });
    }

    getShouldRedirect() {
        return this.authService.isLoggedIn && !this.authService.isSessionExpired;
    }

    showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }
}
