import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { Observable } from 'rxjs';
import { IUserCocktail } from '../interfaces/user-cocktail';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CocktailService {

    constructor(private angularFirestore: AngularFirestore, private auth: AuthService) { }

    addNewCocktail(cocktail: IUserCocktail): Promise<void> {
        return this.angularFirestore.doc(`cocktails/${cocktail.id}`).set(cocktail);
    }

    getCocktails(): Observable<any[]> {
        return this.angularFirestore.collection("cocktails").valueChanges();
    }

    addToFavorites(cocktailId: number): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(cocktailId.toString()).update({
            favorites: arrayUnion(this.auth.userID)
        });
    }

    removeFromFavorites(cocktailId: number): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(cocktailId.toString()).update({
            favorites: arrayRemove(this.auth.userID)
        });
    }

    updateName(cocktailId: number, name: string): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(cocktailId.toString()).update({
            name
        });
    }

    updateIngredients(cocktailId: number, ingredients: string[]): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(cocktailId.toString()).update({
            ingredients
        });
    }

    updateInstructions(cocktailId: number, instructions: string): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(cocktailId.toString()).update({
            instructions
        });
    }

    deleteCocktail(cocktailId: number): Promise<void> {
        return this.angularFirestore.doc(`cocktails/${cocktailId}`).delete();
    }

    getUserCocktails(): Observable<any[]> {
        return this.angularFirestore.collection("cocktails", ref => ref.where('user_id', '==', this.auth.userID?.toString())).valueChanges();
    }

    getFavoriteCocktails(): Observable<any[]> {
        return this.angularFirestore.collection("cocktails", ref => ref.where('favorites', 'array-contains-any', [this.auth.userID?.toString()])).valueChanges();
    }

    shareCocktailWith(cocktailId: number, userId: string): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(cocktailId.toString()).update({
            sharedWith: arrayUnion(userId)
        });
    }

    removeSharedCocktail(recipeId: number): Promise<void> {
        return this.angularFirestore.collection("cocktails").doc(recipeId.toString()).update({
            sharedWith: arrayRemove(this.auth.userID)
        });
    }

    getSharedCocktails(): Observable<any[]> {
        return this.angularFirestore.collection("cocktails", ref => ref.where('sharedWith', 'array-contains-any', [this.auth.userID?.toString()])).valueChanges();
    }

    isFavoriteCocktail(cocktailId: number): Observable<any[]> {
        return this.angularFirestore.collection("cocktails", ref => ref.where('id', '==', cocktailId).where('favorites', 'array-contains', this.auth.userID)).valueChanges();
    }

    isSharedWith(cocktailId: number, userId: string): Observable<any[]> {
        return this.angularFirestore.collection("cocktails", ref => ref.where('id', '==', cocktailId).where('sharedWith', 'array-contains', userId)).valueChanges();
    }

    isUserCocktail(cocktailId: number): Observable<any> {
        return this.angularFirestore.collection("cocktails", ref => ref.where('id', '==', cocktailId).where('user_id', '==', this.auth.userID)).valueChanges();
    }

    getCocktailById(cocktailId: number): Observable<any> {
        return this.angularFirestore.doc(`cocktails/${cocktailId.toString()}`).valueChanges();
    }
}
