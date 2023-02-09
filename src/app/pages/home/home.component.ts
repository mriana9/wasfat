import { Component, OnInit } from '@angular/core';
import { IRating } from 'src/app/interfaces/rating';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthService, CocktailService, RatingService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public recipes: IUserRecipe[] = [];
    public cocktails: IUserCocktail[] = [];
    public loading: boolean = true;
    public cocktailsLoading: boolean = true;
    public recipeRatings: any[] = [];
    public cocktailRatings: any[] = [];

    constructor(
        private auth: AuthService,
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private ratingService: RatingService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            this.getRecipes();
            this.getCocktails();
            sub.unsubscribe();
        });
    }

    ngOnInit(): void {
        this.sortRecipesBasedOnRatings();
        this.sortCocktailsBasedOnRatings();
    }

    sortRecipesBasedOnRatings(){
        const interval = setInterval(() => {
            if(this.recipeRatings.length == this.recipes.length && this.recipes.length != 0){
                const newRecipes: any[] = [];
                this.recipeRatings.sort((a, b) => {
                    return b.rating - a.rating;
                });
                for(let i=0; i<this.recipes.length; i++){
                    const r = this.recipes.filter(rec => {
                        return rec.id == this.recipeRatings[i].id;
                    });
                    newRecipes.push(r[0]);
                }
                this.recipes = newRecipes;
                this.loading = false;
                clearInterval(interval);
            }
        }, 500)
    }

    sortCocktailsBasedOnRatings(){
        const interval = setInterval(() => {
            if(this.cocktailRatings.length == this.cocktails.length && this.cocktails.length != 0){
                const newCocktails: any[] = [];
                this.cocktailRatings.sort((a, b) => {
                    return b.rating - a.rating;
                });
                for(let i=0; i<this.cocktails.length; i++){
                    const c = this.cocktails.filter(coc => {
                        return coc.id == this.cocktailRatings[i].id;
                    });
                    newCocktails.push(c[0]);
                }
                this.cocktails = newCocktails;
                this.loading = false;
                clearInterval(interval);
            }
        }, 500)
    }

    getRecipes(): void {
        const sub = this.recipeService.getRecipes().subscribe(recipes => {
            this.recipes = recipes;
            this.getRecipeRates();
            sub.unsubscribe();
        })
    }

    getCocktails(): void {
        const sub = this.cocktailService.getCocktails().subscribe(cocktails => {
            this.cocktails = cocktails;
            this.getCocktailRates();
            sub.unsubscribe();
        });
    }

    getRecipeRates(): void {
        for (let recipe of this.recipes) {
            const sub = this.ratingService.getRatings(recipe.id as number).subscribe(rates => {
                this.recipeRatings.push({
                    id: recipe.id,
                    rating: this.getRatingAverage(rates)
                });                    
                sub.unsubscribe();
            });
        }
    }

    getCocktailRates(): void {
        for (let cocktail of this.cocktails) {
            const sub = this.ratingService.getRatings(cocktail.id as number).subscribe(rates => {
                this.cocktailRatings.push({
                    id: cocktail.id,
                    rating: this.getRatingAverage(rates)
                });                    
                sub.unsubscribe();
            });
        }
    }

    getRatingAverage(ratings: IRating[]): number {
        let sum: number = 0;
        let average: number = 0;
        if (ratings && ratings.length > 0) {
            for (let rating of ratings) {
                sum += rating.rating;
            }
            average = sum / ratings?.length;
            return average;
        }
        return 0;
    }
}
