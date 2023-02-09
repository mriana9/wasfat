import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/comment';
import { IRating } from 'src/app/interfaces/rating';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthService, CommentService, RatingService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-recipe-item-details',
    templateUrl: './recipe-item-details.component.html',
    styleUrls: ['./recipe-item-details.component.scss']
})
export class RecipeItemDetailsComponent implements OnInit {

    public id?: number;
    public recipe: IUserRecipe | undefined;
    public comments: IComment[] | undefined;
    public rates: IRating[] | undefined;
    public imageUrl: string = '';
    public isUserCard: boolean | undefined;
    public shared: boolean | undefined;

    constructor(
        private angularFireStorage: AngularFireStorage,
        private activeRouter: ActivatedRoute,
        private recipeService: RecipeService,
        private commentService: CommentService,
        private ratingService: RatingService,
        private router: Router,
        private auth: AuthService) {
        this.id = Number(this.activeRouter.snapshot.paramMap.get('id'));
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
        });
    }

    ngOnInit(): void {
        const sub = this.recipeService.getRecipeById(this?.id as number).subscribe(recipe => {
            this.recipe = recipe;
            if (!recipe) {
                this.router.navigateByUrl('/**');
                return;
            }
            this.getImageUrl();
            this.getComments();
            this.getRates();
            this.isUserRecipe();
            this.isShared();
            sub.unsubscribe();
        });
    }

    async getImageUrl(): Promise<void> {
        this.imageUrl = await this.angularFireStorage.storage.ref().child(this.recipe?.image as string).getDownloadURL();
    }

    getComments(): void {
        const sub = this.commentService.getComments(this.recipe?.id as number).subscribe(comments => {
            this.comments = comments;
            sub.unsubscribe();
        });
    }

    getRates(): void {
        const sub = this.ratingService.getRatings(this.id as number).subscribe(rates => {
            this.rates = rates;
            sub.unsubscribe();
        });
    }

    isUserRecipe(): void {
        if (this.auth.userID) {
            const sub = this.recipeService.isUserRecipe(this.id as number).subscribe(result => {
                this.isUserCard = result.length > 0 ? true : false;
                sub.unsubscribe();
            });
        }
    }

    isShared(): void {
        const sub = this.recipeService.isSharedWith(this.recipe?.id as number, this.auth.userID as string).subscribe(result => {
            this.shared = result.length > 0 ? true : false;
            sub.unsubscribe();
        });
    }
}
