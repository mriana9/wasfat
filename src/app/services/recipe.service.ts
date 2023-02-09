import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { Observable } from 'rxjs';
import { IUserRecipe } from '../interfaces/user-recipe';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    constructor(private angularFirestore: AngularFirestore, private auth: AuthService) { }

    addNewRecipe(recipe: IUserRecipe): Promise<void> {
        return this.angularFirestore.doc(`recipes/${recipe.id}`).set(recipe);
    }

    getRecipes(): Observable<any[]> {
        return this.angularFirestore.collection("recipes").valueChanges();
    }

    addToFavorites(recipeId: number): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            favorites: arrayUnion(this.auth.userID)
        });
    }

    removeFromFavorites(recipeId: number): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            favorites: arrayRemove(this.auth.userID)
        });
    }

    updateTitle(recipeId: number, title: string): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            title
        });
    }

    updateServings(recipeId: number, servings: string): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            servings
        });
    }

    updateIngredients(recipeId: number, ingredients: string): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            ingredients
        });
    }

    updateInstructions(recipeId: number, instructions: string): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            instructions
        });
    }

    deleteRecipe(recipeId: number): Promise<void> {
        return this.angularFirestore.doc(`recipes/${recipeId}`).delete();
    }

    getUserRecipes(): Observable<any[]> {
        return this.angularFirestore.collection("recipes", ref => ref.where('user_id', '==', this.auth.userID?.toString())).valueChanges();
    }

    getFavoriteRecipes(): Observable<any[]> {
        return this.angularFirestore.collection("recipes", ref => ref.where('favorites', 'array-contains-any', [this.auth.userID?.toString()])).valueChanges();
    }

    shareRecipeWith(recipeId: number, userId: string): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            sharedWith: arrayUnion(userId)
        });
    }

    removeSharedRecipe(recipeId: number): Promise<void> {
        return this.angularFirestore.collection("recipes").doc(recipeId.toString()).update({
            sharedWith: arrayRemove(this.auth.userID)
        });
    }

    getSharedRecipes(): Observable<any[]> {
        return this.angularFirestore.collection("recipes", ref => ref.where('sharedWith', 'array-contains-any', [this.auth.userID?.toString()])).valueChanges();
    }

    isFavoriteRecipe(recipeId: number): Observable<any[]> {
        return this.angularFirestore.collection("recipes", ref => ref.where('id', '==', recipeId).where('favorites', 'array-contains', this.auth.userID)).valueChanges();
    }

    isSharedWith(recipeId: number, userId: string): Observable<any[]> {
        return this.angularFirestore.collection("recipes", ref => ref.where('id', '==', recipeId).where('sharedWith', 'array-contains', userId)).valueChanges();
    }

    isUserRecipe(recipeId: number): Observable<any> {
        return this.angularFirestore.collection("recipes", ref => ref.where('id', '==', recipeId).where('user_id', '==', this.auth.userID)).valueChanges();
    }

    getRecipeById(recipeId: number): Observable<any> {
        return this.angularFirestore.doc(`recipes/${recipeId.toString()}`).valueChanges();
    }
}
