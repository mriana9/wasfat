import { Component, OnInit, Input } from '@angular/core';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
    selector: 'app-big-card',
    templateUrl: './big-card.component.html',
    styleUrls: ['./big-card.component.scss']
})
export class BigCardComponent implements OnInit {

    @Input() data: any | undefined;
    @Input() type: string | undefined;
    public imageUrl: string = '';
    public path: string = '';


    constructor(private angularFireStorage: AngularFireStorage) { }

    ngOnInit(): void {
        this.getImageUrl();
        this.getCardPath();
    }

    async getImageUrl(): Promise<void> {
        this.imageUrl = await this.angularFireStorage.storage.ref().child(this.data?.image as string).getDownloadURL();
    }

    getCardPath(): void {
        this.path = this.type == 'recipe' ? `/recipes/${this.data?.id}` : `/cocktails/${this.data?.id}`;
    }
}
