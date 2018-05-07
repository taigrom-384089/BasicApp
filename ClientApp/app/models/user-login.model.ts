export class UserLogin {
    id: number;
    username: string;
    password: string;
    rememberMe: boolean;

    constructor(username?: string, password?: string, rememberMe?: boolean) {
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
    }
}