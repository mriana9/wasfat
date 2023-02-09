import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { INinjaCocktail } from 'src/app/interfaces/ninja-cocktail';
import { NinjaCocktailService } from 'src/app/services/ninja-cocktail.service';

@Component({
    selector: 'app-cocktails',
    templateUrl: './cocktails.component.html',
    styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {

    private cocktailSearchList: string[] = [];
    public recipe: boolean = true;
    public cocktails: INinjaCocktail[] = [];
    public loading: boolean = true;
    public searchLoading: boolean = false;
    public pages: any[] = [];
    public totalPages: number = 1;
    public currentPage: number = 0;
    public noResults: boolean = false;

    constructor(
        private ninjaCocktailService: NinjaCocktailService,
        private http: HttpClient) { }

    ngOnInit(): void {
        this.getCocktailSearchList();
    }

    showCocktails(input: string): void {
        if(input){
            this.searchLoading = true;
            const headers = new HttpHeaders().set('X-Api-Key', 'aBZ78UbngWSzSFduEmHUMg==6uO9iH7WCcdU7Q18');
            this.ninjaCocktailService.get(input, { headers: headers }).subscribe(data => {
                this.cocktails = data as INinjaCocktail[];
                this.searchLoading = false;
                this.noResults = this.cocktails.length == 0 ? true : false;
                this.paginate();
            });
        }
    }

    getCocktailSearchList(): void {
        this.http.get('./assets/resources/cocktailSearchKeys.json').subscribe(data => {
            this.cocktailSearchList = data as string[];
            this.getNinjaCocktails();
        });
    }

    getNinjaCocktails(): void {
        let random = parseInt((Math.random() * this.cocktailSearchList.length).toString());
        const headers = new HttpHeaders().set('X-Api-Key', 'aBZ78UbngWSzSFduEmHUMg==6uO9iH7WCcdU7Q18');
        const sub = this.ninjaCocktailService.get(this.cocktailSearchList[random], { headers: headers }).subscribe(data => {
            this.cocktails = data as INinjaCocktail[];
            this.paginate();
            this.loading = false;
            sub.unsubscribe();
        });
    }

    paginate(): void {
        this.currentPage = 0;
        this.pages = [];
        this.totalPages = this.cocktails.length / 3;
        this.totalPages = this.totalPages % 1 > 0 ? parseInt(this.totalPages.toString()) + 1 : parseInt(this.totalPages.toString());
        let s = 0;
        for (let i = 0; i < this.totalPages; i++) {
            for (let j = 0; j < 3; j++) {
                this.pages[i] = !Array.isArray(this.pages[i]) ? [] : this.pages[i];
                if (this.cocktails[s]) {
                    this.pages[i].push(this.cocktails[s]);
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