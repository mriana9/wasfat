import { Component, OnInit } from '@angular/core';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthService, CocktailService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    public recipe: boolean = true;
    public cocktail: boolean = true;
    public favoriteRecipes: IUserRecipe[] = [];
    public favoriteCocktails: IUserCocktail[] = [];
    public filteredRecipes: IUserRecipe[] = [];
    public filteredCocktails: IUserCocktail[] = [];
    public loading: boolean = true;

    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
            this.getUserFavoriteRecipes();
            this.getUserFavoriteCocktails();
        })
    }

    ngOnInit(): void {
    }

    getUserFavoriteRecipes(): void {
        const sub = this.recipeService.getFavoriteRecipes().subscribe(recipes => {
            this.favoriteRecipes = recipes;
            this.filteredRecipes = recipes;
            sub.unsubscribe();
        });
    }

    getUserFavoriteCocktails(): void {
        const sub = this.cocktailService.getFavoriteCocktails().subscribe(cocktails => {
            this.favoriteCocktails = cocktails;
            this.filteredCocktails = cocktails;
            this.loading = false;
            sub.unsubscribe();
        })
    }

    showRecipes(): void {
        this.recipe = true;
        this.cocktail = false;
    }

    showCocktails(): void {
        this.recipe = false;
        this.cocktail = true;
    }

    showRecipesAndCocktails(): void {
        this.recipe = true;
        this.cocktail = true;
    }

    search(searchValue: string): void {
        this.filteredRecipes = this.favoriteRecipes.filter((recipe) => {
            return recipe.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredCocktails = this.favoriteCocktails.filter((cocktail) => {
            return cocktail.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }
}
