import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService, UserService } from 'src/app/services';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    public isLoggedIn: boolean | null = null;
    public currentUser: IUser | null = null;
    constructor(private auth: AuthService, private userService: UserService) { }

    ngOnInit(): void {
        this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            this.isLoggedIn = user ? true : false;
            this.getUserInfo();
        });
    }

    logout(): void {
        this.auth.logout().then (() => {
            this.isLoggedIn = null;
        });
    }

    getUserInfo(): void {
        const userSub = this.userService.getUserInfo().subscribe(user => {
            this.currentUser = user;
            userSub.unsubscribe();
        });
    }
}
