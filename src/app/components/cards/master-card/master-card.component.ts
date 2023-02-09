import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IUser } from 'src/app/interfaces/user';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthService, CocktailService, RecipeService, UserService } from 'src/app/services';

@Component({
    selector: 'app-master-card',
    templateUrl: './master-card.component.html',
    styleUrls: ['./master-card.component.scss']
})
export class MasterCardComponent implements OnInit {

    @Input() data: any;
    @Input() recipe: IUserRecipe | undefined;
    @Input() type: string | undefined;
    @Input() ratings: any[] = [];
    public imageUrl: string = '';
    public path: string = '';
    public _isUserCard: boolean = false;
    public user: IUser | undefined;
    public rate: any;
    
    constructor(
        private angularFireStorage: AngularFireStorage,
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        public auth: AuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.getImageUrl();
        this.getCardPath();
        this.getCardUser();
        this.findCardRating();
        const sub = this.auth.user.subscribe(user => {
            user?.uid? this.isUserCard(): this._isUserCard = false;
            sub.unsubscribe();
        });        
    }

    async getImageUrl(): Promise<void> {
        this.imageUrl = await this.angularFireStorage.storage.ref().child(this.data?.image as string).getDownloadURL();
    }

    getCardPath(): void {
        this.path = this.type == 'recipe' ? `/recipes/${this.data?.id}` : `/cocktails/${this.data?.id}`;
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

    getCardUser(): void {
        const sub = this.userService.getUserById(this.data?.user_id as string).subscribe(user => {
            this.user = user[0];
            sub.unsubscribe();
        });
    }

    findCardRating(): void {
        const interval = setInterval(() => {
            if(this.ratings.length){
                const rate = this.ratings.filter(rating => {
                    return rating.id == this.data?.id;
                });
                this.rate = parseFloat(rate[0].rating.toString()).toFixed(1);
                clearInterval(interval);
            }
        }, 500);
    }
}
