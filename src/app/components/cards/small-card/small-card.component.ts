import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { CocktailService, RecipeService, UserService } from 'src/app/services';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
    selector: 'app-small-card',
    templateUrl: './small-card.component.html',
    styleUrls: ['./small-card.component.scss']
})
export class SmallCardComponent implements OnInit {

    @Input() data: any;
    @Input() type: string | undefined;
    @Input() category: string | undefined;
    public showCardActivityIcon: boolean = false;
    public author: IUser | undefined;
    public imageUrl: string = '';
    public _isUserCard: boolean = false;
    public path: string = '';

    constructor(
        private userService: UserService,
        private angularFireStorage: AngularFireStorage,
        private recipeService: RecipeService,
        private cocktailService: CocktailService) {
    }

    ngOnInit(): void {
        if (this.data) {
            this.getAuthor();
            this.getImageUrl();
            this.isUserCard();
            this.getCardPath();
        }
    }

    showCardActivity(): void {
        this.showCardActivityIcon = !this.showCardActivityIcon;
    }

    getAuthor(): void {
        const sub = this.userService.getUserById(this.data?.user_id).subscribe(user => {
            this.author = user[0];
            sub.unsubscribe();
        });
    }

    async getImageUrl(): Promise<void> {
        this.imageUrl = await this.angularFireStorage.storage.ref().child(this.data?.image as string).getDownloadURL();
    }

    isUserCard(): void {
        this.type == 'recipe' ? this.isUserRecipe() : this.isUserCocktail();
    }

    isUserRecipe(): void {
        const sub = this.recipeService.isUserRecipe(this.data?.id).subscribe(result => {
            this._isUserCard = result.length > 0 ? true : false;
            sub.unsubscribe();
        });
    }

    isUserCocktail(): void {
        const sub = this.cocktailService.isUserCocktail(this.data?.id).subscribe(result => {
            this._isUserCard = result.length > 0 ? true : false;
            sub.unsubscribe();
        });
    }

    getCardPath(): void {
        this.path = this.type == 'recipe' ? `/recipes/${this.data?.id}` : `/cocktails/${this.data?.id}`;
    }
}
