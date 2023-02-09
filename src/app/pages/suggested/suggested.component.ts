import { Component, OnInit } from '@angular/core';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { RecipeService, CocktailService, AuthService } from 'src/app/services';

@Component({
    selector: 'app-suggested',
    templateUrl: './suggested.component.html',
    styleUrls: ['./suggested.component.scss']
})
export class SuggestedComponent implements OnInit {

    public recipe: boolean = true;
    public cocktail: boolean = true;
    public suggestedRecipes: IUserRecipe[] = [];
    public suggestedCocktails: IUserCocktail[] = [];
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
            this.getUserSuggestedRecipes();
            this.getUserSuggestedCocktails();
        })
    }

    ngOnInit(): void {
    }

    getUserSuggestedRecipes(): void {
        const sub = this.recipeService.getSharedRecipes().subscribe(recipes => {
            this.suggestedRecipes = recipes;
            this.filteredRecipes = recipes;
            sub.unsubscribe();
        });
    }

    getUserSuggestedCocktails(): void {
        const sub = this.cocktailService.getSharedCocktails().subscribe(cocktails => {
            this.suggestedCocktails = cocktails;
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
        this.filteredRecipes = this.suggestedRecipes.filter((recipe) => {
            return recipe.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.filteredCocktails = this.suggestedCocktails.filter((cocktail) => {
            return cocktail.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }
}
