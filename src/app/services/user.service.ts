import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService implements OnDestroy {

    constructor(private angularFirestore: AngularFirestore, private auth: AuthService) { }

    private userSubscription: any;

    saveUserInfo(newUser: IUser): Promise<void> {
        return new Promise(resolve => {
            this.userSubscription = this.auth.user.subscribe(user => {
                this.auth.userID = user?.uid;
                newUser.id = user?.uid as string;
                resolve(this.angularFirestore.doc(`users/${this.auth.userID}`).set(newUser));
            });
        })
    }

    getUserInfo(): Observable<any> {
        return this.angularFirestore.doc(`users/${this.auth.userID}`).valueChanges();
    }

    getUsers(): Observable<any[]> {
        return this.angularFirestore.collection(`users`).valueChanges();
    }

    getUserById(userId: string): Observable<any> {
        return this.angularFirestore.collection(`users`, ref => ref.where('id', '==', userId)).valueChanges();
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }
}
