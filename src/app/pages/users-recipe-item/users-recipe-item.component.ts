import { Component, OnInit } from '@angular/core';
import { IRating } from 'src/app/interfaces/rating';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { RecipeService, AuthService, RatingService } from 'src/app/services';

@Component({
    selector: 'app-users-recipe-item',
    templateUrl: './users-recipe-item.component.html',
    styleUrls: ['./users-recipe-item.component.scss']
})
export class UsersRecipeItemComponent implements OnInit {

    public recipes: IUserRecipe[] = [];
    public filteredRecipes: IUserRecipe[] = [];
    public loading: boolean = true;
    public pages: any[] = [];
    public totalPages: number = 1;
    public currentPage: number = 0;
    public recipeRatings: any[] = [];

    constructor(
        private recipeService: RecipeService,
        private ratingService: RatingService) {
        this.getRecipes();
    }

    ngOnInit(): void {
        this.sortRecipesBasedOnRatings();
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
                this.filteredRecipes = newRecipes;
                this.paginate();
                this.loading = false;
                clearInterval(interval);
            }
        }, 500)
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

    getRecipes(): void {
        const sub = this.recipeService.getRecipes().subscribe(recipes => {
            this.recipes = recipes;
            this.getRecipeRates();            
            sub.unsubscribe();
        })
    }

    search(searchValue: string): void {
        this.filteredRecipes = this.recipes.filter((recipe) => {
            return recipe.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.paginate();
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }

    filterRecipes(removalRecipeId: number): void {
        this.filteredRecipes = this.filteredRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
    }

    paginate(): void {
        this.currentPage = 0;
        this.pages = [];
        this.totalPages = this.filteredRecipes.length / 4;
        this.totalPages = this.totalPages % 1 > 0 ? parseInt(this.totalPages.toString()) + 1 : parseInt(this.totalPages.toString());
        let s = 0;
        for (let i = 0; i < this.totalPages; i++) {
            for (let j = 0; j < 4; j++) {
                this.pages[i] = !Array.isArray(this.pages[i]) ? [] : this.pages[i];
                if (this.filteredRecipes[s]) {
                    this.pages[i].push(this.filteredRecipes[s]);
                    s++;
                }
            }
        }
    }

    next(): void {
        if (this.currentPage + 1 < this.totalPages) {
            this.currentPage++;
        }
    }

    prev(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
        }
    }

    showData(page: number): void {
        this.currentPage = page;
    }

}
