import { Component, Injectable, OnInit } from '@angular/core';
import { IRating } from 'src/app/interfaces/rating';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthService, RatingService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-user-recipe-item',
    templateUrl: './user-recipe-item.component.html',
    styleUrls: ['./user-recipe-item.component.scss']
})

@Injectable({
    providedIn: 'root'
})

export class UserRecipeItemComponent implements OnInit {

    public userRecipes: IUserRecipe[] = [];
    public filteredUserRecipes: IUserRecipe[] = [];
    public loading: boolean = true;
    public pages: any[] = [];
    public totalPages: number = 1;
    public currentPage: number = 0;
    public recipeRatings: any[] = [];

    constructor(
        private recipeService: RecipeService,
        private auth: AuthService,
        private ratingService: RatingService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
            this.getUserRecipes();
        });
    }

    ngOnInit(): void {
        this.sortRecipesBasedOnRatings();
    }

    sortRecipesBasedOnRatings(){
        const interval = setInterval(() => {
            if(this.recipeRatings.length == this.userRecipes.length && this.userRecipes.length != 0){
                const newRecipes: any[] = [];
                this.recipeRatings.sort((a, b) => {
                    return b.rating - a.rating;
                });
                for(let i=0; i<this.userRecipes.length; i++){
                    const r = this.userRecipes.filter(rec => {
                        return rec.id == this.recipeRatings[i].id;
                    });
                    newRecipes.push(r[0]);
                }
                this.userRecipes = newRecipes;
                this.filteredUserRecipes = newRecipes;
                this.paginate();
                this.loading = false;
                clearInterval(interval);
            }
        }, 500)
    }

    getRecipeRates(): void {
        for (let recipe of this.userRecipes) {
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

    getUserRecipes(): void {
        const sub = this.recipeService.getUserRecipes().subscribe(recipes => {
            this.userRecipes = recipes;
            this.getRecipeRates();
            sub.unsubscribe();
        });
    }

    search(searchValue: string): void {
        this.filteredUserRecipes = this.userRecipes.filter((user) => {
            return user.title.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.paginate();
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }

    filterUserRecipes(removalRecipeId: number): void {
        this.filteredUserRecipes = this.filteredUserRecipes.filter(recipe => {
            return recipe.id != removalRecipeId;
        });
    }

    paginate(): void {
        this.currentPage = 0;
        this.pages = [];
        this.totalPages = this.filteredUserRecipes.length / 4;
        this.totalPages = this.totalPages % 1 > 0 ? parseInt(this.totalPages.toString()) + 1 : parseInt(this.totalPages.toString());
        let s = 0;
        for (let i = 0; i < this.totalPages; i++) {
            for (let j = 0; j < 4; j++) {
                this.pages[i] = !Array.isArray(this.pages[i]) ? [] : this.pages[i];
                if (this.filteredUserRecipes[s]) {
                    this.pages[i].push(this.filteredUserRecipes[s]);
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
