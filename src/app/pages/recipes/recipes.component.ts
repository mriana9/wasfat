import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { INinjaRecipe } from 'src/app/interfaces/ninja-recipe';
import { NinjaRecipeService } from 'src/app/services/ninja-recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    private recipeSearchList: string[] = [];
    public recipe: boolean = true;
    public recipes: INinjaRecipe[] = [];
    public loading: boolean = true;
    public searchLoading: boolean = false;
    public pages: any[] = [];
    public totalPages: number = 1;
    public currentPage: number = 0;
    public noResults: boolean = false;

    constructor(
        private ninjaRecipeService: NinjaRecipeService,
        private http: HttpClient) { }

    ngOnInit(): void {
        this.getRecipeSearchList();
    }

    showRecipes(input: string): void {
        if(input){
            this.searchLoading = true;
            const headers = new HttpHeaders().set('X-Api-Key', 'aBZ78UbngWSzSFduEmHUMg==6uO9iH7WCcdU7Q18');
            this.ninjaRecipeService.get(input, { headers: headers }).subscribe(data => {
                this.recipes = data as INinjaRecipe[];
                this.searchLoading = false;
                this.paginate();
            });
        }
    }

    getRecipeSearchList(): void {
        this.http.get('./assets/resources/recipeSearchKeys.json').subscribe(data => {
            this.recipeSearchList = data as string[];
            this.getNinjaRecipes();
        });
    }

    getNinjaRecipes(): void {
        let random = parseInt((Math.random() * this.recipeSearchList.length).toString());
        const headers = new HttpHeaders().set('X-Api-Key', 'aBZ78UbngWSzSFduEmHUMg==6uO9iH7WCcdU7Q18');
        const sub = this.ninjaRecipeService.get(this.recipeSearchList[random], { headers: headers }).subscribe(data => {
            this.recipes = data as INinjaRecipe[];
            this.loading = false;
            this.paginate();
            sub.unsubscribe();
        });
    }

    paginate(): void {
        this.currentPage = 0;
        this.pages = [];
        this.totalPages = this.recipes.length / 3;
        this.totalPages = this.totalPages % 1 > 0 ? parseInt(this.totalPages.toString()) + 1 : parseInt(this.totalPages.toString());
        let s = 0;
        for (let i = 0; i < this.totalPages; i++) {
            for (let j = 0; j < 3; j++) {
                this.pages[i] = !Array.isArray(this.pages[i]) ? [] : this.pages[i];
                if (this.recipes[s]) {
                    this.pages[i].push(this.recipes[s]);
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
