import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-ninja-master-card',
    templateUrl: './ninja-master-card.component.html',
    styleUrls: ['./ninja-master-card.component.scss']
})
export class NinjaMasterCardComponent implements OnInit {

    @Input() data: any;
    @Input() type: string | undefined;
    public imageUrl: string = '';
    public path: string = '';

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    navigate(): void {
        const routePath = this.data?.title ? 'recipe' : 'cocktail';
        this.router.navigate([`/${routePath}`, { data: JSON.stringify(this.data), type: this.type }]);
    }
}
