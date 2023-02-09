import { Component, OnInit } from '@angular/core';
import { IRating } from 'src/app/interfaces/rating';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { CocktailService, RatingService } from 'src/app/services';

@Component({
    selector: 'app-users-cocktail-item',
    templateUrl: './users-cocktail-item.component.html',
    styleUrls: ['./users-cocktail-item.component.scss']
})
export class UsersCocktailItemComponent implements OnInit {

    public cocktails: IUserCocktail[] = [];
    public filteredCocktails: IUserCocktail[] = [];
    public loading: boolean = true;
    public pages: any[] = [];
    public totalPages: number = 1;
    public currentPage: number = 0;
    public cocktailRatings: any[] = [];

    constructor(
        private cocktailService: CocktailService,
        private ratingService: RatingService) {
        this.getCocktails();
    }

    ngOnInit(): void {
        this.sortCocktailsBasedOnRatings();
    }

    sortCocktailsBasedOnRatings(){
        const interval = setInterval(() => {
            if(this.cocktailRatings.length == this.cocktails.length && this.cocktails.length != 0){
                const newCocktails: any[] = [];
                this.cocktailRatings.sort((a, b) => {
                    return b.rating - a.rating;
                });
                for(let i=0; i<this.cocktails.length; i++){
                    const r = this.cocktails.filter(rec => {
                        return rec.id == this.cocktailRatings[i].id;
                    });
                    newCocktails.push(r[0]);
                }
                this.cocktails = newCocktails;
                this.filteredCocktails = newCocktails;
                this.paginate();
                this.loading = false;
                clearInterval(interval);
            }
        }, 500)
    }

    getCocktailsRates(): void {
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

    getCocktails(): void {
        const sub = this.cocktailService.getCocktails().subscribe(cocktails => {
            this.cocktails = cocktails;
            this.getCocktailsRates();
            sub.unsubscribe();
        })
    }

    search(searchValue: string): void {
        this.filteredCocktails = this.cocktails.filter((cocktail) => {
            return cocktail.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.paginate();
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }

    filterRecipes(removalCocktailId: number): void {
        this.filteredCocktails = this.filteredCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
    }

    paginate(): void {
        this.currentPage = 0;
        this.pages = [];
        this.totalPages = this.filteredCocktails.length / 4;
        this.totalPages = this.totalPages % 1 > 0 ? parseInt(this.totalPages.toString()) + 1 : parseInt(this.totalPages.toString());
        let s = 0;
        for (let i = 0; i < this.totalPages; i++) {
            for (let j = 0; j < 4; j++) {
                this.pages[i] = !Array.isArray(this.pages[i]) ? [] : this.pages[i];
                if (this.filteredCocktails[s]) {
                    this.pages[i].push(this.filteredCocktails[s]);
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
