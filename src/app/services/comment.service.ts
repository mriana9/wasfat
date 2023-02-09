import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Utils } from '../common/utils';
import { IComment } from '../interfaces/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private angularFirestore: AngularFirestore) { }

    addNewComment(comment: IComment): Promise<void> {
        return this.angularFirestore.doc(`comments/${Utils.generateRandomId()}`).set(comment);
    }

    getComments(id: number): Observable<any[]> {
        return this.angularFirestore.collection("comments", ref => ref.where('type_id', '==', id)).valueChanges();
    }
}
