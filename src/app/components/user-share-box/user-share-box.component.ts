import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { RecipeService, CocktailService, AuthService } from 'src/app/services';

@Component({
    selector: 'app-user-share-box',
    templateUrl: './user-share-box.component.html',
    styleUrls: ['./user-share-box.component.scss']
})
export class UserShareBoxComponent implements OnInit {

    @Input() data: any;
    @Input() type: string | undefined;
    @Input() user: IUser | undefined;
    public shared: boolean | null = null;

    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
            this.isShared();
        });
    }

    ngOnInit(): void {
    }

    takeAnAction(): void {
        this.shared = !this.shared;
        this.type == 'recipe' ? this.shareRecipeWith() : this.shareCocktailWith();
    }

    shareRecipeWith(): void {
        this.recipeService.shareRecipeWith(this.data?.id, this.user?.id as string);
    }

    shareCocktailWith(): void {
        this.cocktailService.shareCocktailWith(this.data?.id, this.user?.id as string);
    }

    isShared(): void {
        let sub: any;
        switch (this.type) {
            case 'recipe':
                sub = this.recipeService.isSharedWith(this.data?.id, this.user?.id as string).subscribe(result => {
                    this.shared = result.length > 0 ? true : false;
                    sub.unsubscribe();
                });
                break;
            case 'cocktail':
                sub = this.cocktailService.isSharedWith(this.data?.id, this.user?.id as string).subscribe(result => {
                    this.shared = result.length > 0 ? true : false;
                    sub.unsubscribe();
                });
                break;
        }
    }
}
