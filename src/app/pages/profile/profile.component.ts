import { Component, Injectable, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthService, CocktailService, RecipeService, UserService } from 'src/app/services';
import Swiper from 'swiper';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

@Injectable({
    providedIn: 'root'
})

export class ProfileComponent implements OnInit {

    public shareButton: boolean = false;
    public deleteButton: boolean = false;
    public userRecipes: IUserRecipe[] = [];
    public userSharedRecipes: IUserRecipe[] = [];
    public userFavoriteRecipes: IUserRecipe[] = [];
    public userCocktails: IUserCocktail[] = [];
    public userSharedCocktails: IUserCocktail[] = [];
    public userFavoriteCocktails: IUserCocktail[] = [];

    public filteredUserRecipes: IUserRecipe[] = [];
    public filteredUserSharedRecipes: IUserRecipe[] = [];
    public filteredUserFavoriteRecipes: IUserRecipe[] = [];
    public filteredUserCocktails: IUserCocktail[] = [];
    public filteredUserSharedCocktails: IUserCocktail[] = [];
    public filteredUserFavoriteCocktails: IUserCocktail[] = [];

    public currentUser: IUser | undefined;

    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private auth: AuthService,
        private userService: UserService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
            this.getUserRecipes();
            this.getSharedRecipes();
            this.getFavoriteRecipes();
            this.getUserCocktails();
            this.getSharedCocktails();
            this.getFavoriteCocktails();
            this.getUserInfo();
        });
    }

    ngOnInit(): void {
        let swiper = new Swiper(".mySwiper", {
            spaceBetween: 30,
            grabCursor: true,
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                }
            }
        });
    }

    shareWith() {
        this.shareButton = !this.shareButton;
    }

    closeShareBox() {
        this.shareButton = !this.shareButton;
    }

    deleteUserCardActivity() {
        this.deleteButton = !this.deleteButton;
    }

    closeDeleteBox() {
        this.deleteButton = !this.deleteButton;
    }

    getUserRecipes(): void {
        const sub = this.recipeService.getUserRecipes().subscribe(recipes => {
            this.userRecipes = recipes.reverse();
            this.filteredUserRecipes = recipes.reverse();
            sub.unsubscribe();
        });
    }

    getSharedRecipes(): void {
        const sub = this.recipeService.getSharedRecipes().subscribe(recipes => {
            this.userSharedRecipes = recipes.reverse();
            this.filteredUserSharedRecipes = recipes.reverse();
            sub.unsubscribe();
        });
    }

    getFavoriteRecipes(): void {
        const sub = this.recipeService.getFavoriteRecipes().subscribe(recipes => {
            this.userFavoriteRecipes = recipes.reverse();
            this.filteredUserFavoriteRecipes = recipes.reverse();
            sub.unsubscribe();
        });
    }

    getUserCocktails(): void {
        const sub = this.cocktailService.getUserCocktails().subscribe(cocktails => {
            this.userCocktails = cocktails.reverse();
            this.filteredUserCocktails = cocktails.reverse();
            sub.unsubscribe();
        });
    }

    getSharedCocktails(): void {
        const sub = this.cocktailService.getSharedCocktails().subscribe(cocktails => {
            this.userSharedCocktails = cocktails.reverse();
            this.filteredUserSharedCocktails = cocktails.reverse();
            sub.unsubscribe();
        });
    }

    getFavoriteCocktails(): void {
        const sub = this.cocktailService.getFavoriteCocktails().subscribe(cocktails => {
            this.userFavoriteCocktails = cocktails.reverse();
            this.filteredUserFavoriteCocktails = cocktails.reverse();
            sub.unsubscribe();
        });
    }

    getUserInfo(): void {
        const userSub = this.userService.getUserInfo().subscribe(user => {
            this.currentUser = user;
            userSub.unsubscribe();
        });
    }

    search(searchValue: string): void {
        this.filteredUserRecipes = this.userRecipes.filter((recipe) => {
            return recipe.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredUserFavoriteRecipes = this.userFavoriteRecipes.filter((recipe) => {
            return recipe.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredUserSharedRecipes = this.userSharedRecipes.filter((recipe) => {
            return recipe.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredUserCocktails = this.userCocktails.filter((cocktail) => {
            return cocktail.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredUserFavoriteCocktails = this.userFavoriteCocktails.filter((cocktail) => {
            return cocktail.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredUserSharedCocktails = this.userSharedCocktails.filter((cocktail) => {
            return cocktail.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }

    filterUserRecipes(removalRecipeId: number): void {
        this.filteredUserRecipes = this.filteredUserRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
        this.userRecipes = this.userRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
    }

    filterUserFavoriteRecieps(removalRecipeId: number): void {
        this.filteredUserFavoriteRecipes = this.filteredUserFavoriteRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
        this.userFavoriteRecipes = this.userFavoriteRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
    }

    filterUserCocktails(removalCocktailId: number): void {
        this.filteredUserCocktails = this.filteredUserCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
        this.userCocktails = this.userCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
    }

    filterUserFavoriteCocktails(removalCocktailId: number): void {
        this.filteredUserFavoriteCocktails = this.filteredUserFavoriteCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
        this.userFavoriteCocktails = this.userFavoriteCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
    }

    filterUserSharedRecipes(removalRecipeId: number): void {
        this.filteredUserSharedRecipes = this.filteredUserSharedRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
        this.userSharedRecipes = this.userSharedRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
    }

    filterUserSharedCocktails(removalCocktailId: number): void {
        this.filteredUserSharedCocktails = this.filteredUserSharedCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
        this.userSharedCocktails = this.userSharedCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
    }
}

