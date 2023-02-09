import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user: Observable<firebase.default.User | null>;
    public userID: string | undefined;

    constructor(private afAuth: AngularFireAuth) {
        this.user = afAuth.user;
    }

    register(email: string, password: string): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    logout(): Promise<void> {
        return this.afAuth.signOut();
    }

}
