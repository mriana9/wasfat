import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services';

@Component({
    selector: 'app-card-comment',
    templateUrl: './card-comment.component.html',
    styleUrls: ['./card-comment.component.scss']
})
export class CardCommentComponent implements OnInit {

    @Input() data: IComment | undefined;
    public user: IUser | undefined;

    constructor(public userService: UserService) { }

    ngOnInit(): void {
        this.getCommentUser();
    }

    getCommentUser(): void {
        const sub = this.userService.getUserById(this.data?.user_id as string).subscribe(user => {
            this.user = user[0];
            sub.unsubscribe();
        });
    }
}
