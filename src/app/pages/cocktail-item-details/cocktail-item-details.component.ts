import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/app/interfaces/comment';
import { IRating } from 'src/app/interfaces/rating';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { AuthService, CocktailService, CommentService, RatingService } from 'src/app/services';

@Component({
    selector: 'app-cocktail-item-details',
    templateUrl: './cocktail-item-details.component.html',
    styleUrls: ['./cocktail-item-details.component.scss']
})
export class CocktailItemDetailsComponent implements OnInit {

    public id?: number;
    public cocktail: IUserCocktail | undefined;
    public comments: IComment[] | undefined;
    public rates: IRating[] | undefined;
    public imageUrl: string = '';
    public loading: boolean = true;
    public isUserCard: boolean | undefined;
    public shared: boolean | undefined;

    constructor(
        private angularFireStorage: AngularFireStorage,
        private activeRouter: ActivatedRoute,
        private cocktailService: CocktailService,
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
        const sub = this.cocktailService.getCocktailById(this?.id as number).subscribe(cocktail => {
            this.cocktail = cocktail;
            if (!cocktail) {
                this.router.navigateByUrl('/**');
                return;
            }
            this.getImageUrl();
            this.getComments();
            this.getRates();
            this.isUserCocktail();
            sub.unsubscribe();
        });
    }

    async getImageUrl(): Promise<void> {
        this.imageUrl = await this.angularFireStorage.storage.ref().child(this.cocktail?.image as string).getDownloadURL();
    }

    getComments(): void {
        const sub = this.commentService.getComments(this.cocktail?.id as number).subscribe(comments => {
            this.comments = comments;
            sub.unsubscribe();
        });
    }

    getRates(): void {
        const sub = this.ratingService.getRatings(this.id as number).subscribe(rates => {
            this.rates = rates;
            this.loading = false;
            sub.unsubscribe();
        });
    }

    isUserCocktail(): void {
        const sub = this.cocktailService.isUserCocktail(this.id as number).subscribe(result => {
            this.isUserCard = result.length > 0 ? true : false;
            sub.unsubscribe();
        });
    }

    isShared(): void {
        const sub = this.cocktailService.isSharedWith(this.cocktail?.id as number, this.auth.userID as string).subscribe(result => {
            this.shared = result.length > 0 ? true : false;
            sub.unsubscribe();
        });
    }
}
