import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRating } from 'src/app/interfaces/rating';
import { RatingService } from 'src/app/services';

@Component({
    selector: 'app-ninja-recipe-item',
    templateUrl: './ninja-recipe-item.component.html',
    styleUrls: ['./ninja-recipe-item.component.scss']
})
export class NinjaRecipeItemComponent implements OnInit {

    public data: any;
    public rates: IRating[] | undefined;
    public loading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private ratingService: RatingService) {
        this.data = JSON.parse(JSON.parse(JSON.stringify(this.route.snapshot.paramMap.get('data'))));
        this.getRates();
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.loading = false;
        }, 500);
    }

    getRates(): void {
        const sub = this.ratingService.getRatings(this.data.title).subscribe(rates => {
            this.rates = rates;
            sub.unsubscribe();
        });
    }
}
