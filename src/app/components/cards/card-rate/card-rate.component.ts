import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRating } from 'src/app/interfaces/rating';
import { AuthService, RatingService } from 'src/app/services';

@Component({
    selector: 'app-card-rate',
    templateUrl: './card-rate.component.html',
    styleUrls: ['./card-rate.component.scss']
})
export class CardRateComponent implements OnInit {

    @Input() data: IRating[] | undefined;
    @Input() type: string | undefined;
    @Input() id: number | undefined;
    public rating: number = 0;

    public isLoggedIn: boolean | undefined;

    constructor(
        private ratingService: RatingService,
        public auth: AuthService) {
            const sub = this.auth.user.subscribe(user => {
                this.auth.userID = user?.uid;
                this.isLoggedIn = this.auth.userID? true: false;                
                sub.unsubscribe();
            });
        }

    ngOnInit(): void {
    }

    getRatingAverage(): string {
        let sum: number = 0;
        let average: number = 0;
        if (this.data && this.data.length > 0) {
            for (let data of this.data) {
                sum += data.rating;
            }
            average = sum / this.data?.length;
            this.findCardUserRating();
            return average.toFixed(1);
        }
        return '0.0';
    }

    addOrUpdateRating(rate: number): void {
        const rating: IRating = {
            type: this.type as string,
            type_id: this.id as number,
            rating: rate,
            user_id: this.auth.userID as string
        }
        if(this.auth.userID){
            this.ratingService.addNewRating(rating);
            const rate = this.data?.filter(rate => {
                return rate.user_id == this.auth.userID;
            });
            if(rate?.length && this.data){
                let index = this.data?.indexOf(rate[0]);
                this.data[index] = rating;                
            } else {
                this.data?.push(rating);
            }            
        }
    }

    setRating(rating: string): void {
        this.rating = parseInt(rating);
    }

    findCardUserRating(): void {
        const rate = this.data?.filter(rate => {
            return rate.user_id == this.auth.userID;
        });
        if(rate?.length && this.data){
            let index = this.data?.indexOf(rate[0]);
            this.rating = this.data[index].rating;                
        } else {
            this.rating = 0;
        }      
    }
}
