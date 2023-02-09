import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Utils } from '../common/utils';
import { IRating } from '../interfaces/rating';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(private angularFirestore: AngularFirestore, private auth: AuthService) { }

    addNewRating(rating: IRating): void {
        let rated: boolean = false;
        this.angularFirestore.collection(`ratings`, ref => ref.where('type_id', '==', rating.type_id)).ref.get().then((docs) => {
            docs.forEach(doc => {
                if (doc.get('user_id') == this.auth.userID && doc.get('type_id') == rating.type_id) {
                    this.angularFirestore.collection("ratings").doc(doc.id).update({
                        rating: rating.rating
                    });
                    rated = true;
                }
            });
        }).then(() => {
            if (!rated) {
                this.angularFirestore.doc(`ratings/${Utils.generateRandomId()}`).set(rating);
            }
        });
    }

    getRatings(id: number): Observable<any[]> {
        return this.angularFirestore.collection(`ratings`, ref => ref.where('type_id', '==', id)).valueChanges();
    }
}
