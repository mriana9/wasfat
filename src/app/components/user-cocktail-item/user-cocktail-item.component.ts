import { Component, Injectable, OnInit } from '@angular/core';
import { IRating } from 'src/app/interfaces/rating';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { AuthService, CocktailService, RatingService } from 'src/app/services';

@Component({
    selector: 'app-user-cocktail-item',
    templateUrl: './user-cocktail-item.component.html',
    styleUrls: ['./user-cocktail-item.component.scss']
})

@Injectable({
    providedIn: 'root'
})

export class UserCocktailItemComponent implements OnInit {

    public userCocktails: IUserCocktail[] = [];
    public filteredUserCocktails: IUserCocktail[] = [];
    public loading: boolean = true;
    public pages: any[] = [];
    public totalPages: number = 1;
    public currentPage: number = 0;
    public cocktailRatings: any[] = [];

    constructor(
        private cocktailService: CocktailService,
        private auth: AuthService,
        private ratingService: RatingService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
            this.getUserCocktails();
        });
    }

    ngOnInit(): void {
        this.sortCocktailsBasedOnRatings();
    }

    sortCocktailsBasedOnRatings(){
        const interval = setInterval(() => {
            if(this.cocktailRatings.length == this.userCocktails.length && this.userCocktails.length != 0){
                const newCocktails: any[] = [];
                this.cocktailRatings.sort((a, b) => {
                    return b.rating - a.rating;
                });
                for(let i=0; i<this.userCocktails.length; i++){
                    const c = this.userCocktails.filter(coc => {
                        return coc.id == this.cocktailRatings[i].id;
                    });
                    newCocktails.push(c[0]);
                }
                this.userCocktails = newCocktails;
                this.filteredUserCocktails = newCocktails;
                this.paginate();
                this.loading = false;
                clearInterval(interval);
            }
        }, 500)
    }

    getCocktailsRates(): void {
        for (let cocktail of this.userCocktails) {
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

    getUserCocktails(): void {
        const sub = this.cocktailService.getUserCocktails().subscribe(cocktails => {
            this.userCocktails = cocktails;
            this.getCocktailsRates();
            sub.unsubscribe();
        });
    }

    search(searchValue: string): void {
        this.filteredUserCocktails = this.userCocktails.filter((user) => {
            return user.name.toLocaleLowerCase().includes(searchValue.toLowerCase());
        });
        this.paginate();
    }

    checkSearch(searchValue: string): void {
        searchValue == ''? this.search(''): null;
    }

    filterUserCocktails(removalCocktailId: number): void {
        this.filteredUserCocktails = this.filteredUserCocktails.filter(cocktail => {
            return cocktail.id != removalCocktailId;
        });
    }

    paginate(): void {
        this.currentPage = 0;
        this.pages = [];
        this.totalPages = this.filteredUserCocktails.length / 4;
        this.totalPages = this.totalPages % 1 > 0 ? parseInt(this.totalPages.toString()) + 1 : parseInt(this.totalPages.toString());
        let s = 0;
        for (let i = 0; i < this.totalPages; i++) {
            for (let j = 0; j < 4; j++) {
                this.pages[i] = !Array.isArray(this.pages[i]) ? [] : this.pages[i];
                if (this.filteredUserCocktails[s]) {
                    this.pages[i].push(this.filteredUserCocktails[s]);
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