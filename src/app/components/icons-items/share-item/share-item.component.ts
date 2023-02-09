import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService, UserService } from 'src/app/services';

@Component({
    selector: 'app-share-item',
    templateUrl: './share-item.component.html',
    styleUrls: ['./share-item.component.scss']
})
export class ShareItemComponent implements OnInit {

    @Input() data: any;
    @Input() type: string | undefined;
    public shareButton: boolean = false;
    public users: IUser[] = [];
    public filteredUsers: IUser[] = []

    constructor(
        private userService: UserService,
        private auth: AuthService) {
    }

    ngOnInit(): void {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            this.getUsers();
            sub.unsubscribe();
        });
        const usersRequest = setInterval(() => {
            this.getUsers();
            if(this.users){
                clearInterval(usersRequest);
            }
        }, 1000);
    }

    shareWith(): void {
        this.shareButton = !this.shareButton;
    }

    closeShareBox(): void {
        this.shareButton = !this.shareButton;
    }

    getUsers(): void {
        const sub = this.userService.getUsers().subscribe(users => {
            this.users = users;
            this.filteredUsers = users;
            this.filteredUsers = users.filter(user => {
                return user.id != this.auth.userID;
            });
            sub.unsubscribe();
        });
    }

    search(searchValue: string): void {
        this.filteredUsers = this.users.filter((user) => {
            return user.firstName.toLocaleLowerCase().includes(searchValue.toLowerCase()) && user.id != this.auth.userID || user.lastName.toLocaleLowerCase().includes(searchValue.toLowerCase()) && user.id != this.auth.userID;
        });
    }
}
