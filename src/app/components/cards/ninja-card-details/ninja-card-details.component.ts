import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/common/utils';
import { IComment } from 'src/app/interfaces/comment';
import { AuthService, CommentService } from 'src/app/services';

@Component({
    selector: 'app-ninja-card-details',
    templateUrl: './ninja-card-details.component.html',
    styleUrls: ['./ninja-card-details.component.scss']
})
export class NinjaCardDetailsComponent implements OnInit {

    public data: any;
    public title: any;
    public comments: IComment[] | undefined;
    public isLoggedIn: boolean | null = null;

    constructor(
        private route: ActivatedRoute,
        private commentService: CommentService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.isLoggedIn = user ? true : false;
            sub.unsubscribe();
        });
        this.data = JSON.parse(JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('data'))));
        this.title = this.data?.title ? this.data.title : this.data.name;
        try {
            this.data.ingredients = this.data.ingredients.split('|');
        } catch (e) { }
    }

    ngOnInit(): void {
        this.getComments();
    }

    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('', Validators.required)
    });

    addNewComment(): void {
        const type = this.data?.title ? 'recipe' : 'cocktail';
        const comment: IComment = {
            type: type,
            type_id: this.title,
            comment: this.commentForm.value.comment,
            user_id: this.auth.userID as string,
            date: Utils.GetCurrentDate()
        }
        this.comments?.push(comment);
        this.commentForm.reset();
        this.commentService.addNewComment(comment);
    }

    getComments(): void {
        const sub = this.commentService.getComments(this.title).subscribe(comments => {
            this.comments = comments;
            sub.unsubscribe();
        });
    }
}
