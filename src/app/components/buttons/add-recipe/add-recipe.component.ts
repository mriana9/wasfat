import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from 'src/app/common/utils';
import { IUser } from 'src/app/interfaces/user';
import { IUserRecipe } from 'src/app/interfaces/user-recipe';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { AuthService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

    public addRecipeBox: boolean = false;
    public imagePath: string = '';
    public addButtonLoading: boolean = false;
    @Input() currentUser: IUser | undefined;

    recipeForm: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        servings: new FormControl('', Validators.required),
        ingredients: new FormControl('', Validators.required),
        instructions: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
    });

    constructor(
        private angularFireStorage: AngularFireStorage,
        private auth: AuthService,
        private recipeService: RecipeService,
        private profileComponent: ProfileComponent,
        private router: Router) { }

    ngOnInit(): void {
    }

    closeBox(): void {
        this.resetForm();
        this.addRecipeBox = !this.addRecipeBox;
    }

    showAddRecipeForm(): void {
        this.addRecipeBox = !this.addRecipeBox;
    }

    uploadImage($event: any): void {
        this.imagePath = $event.target.files[0];
    }

    resetForm(): void {
        this.recipeForm.reset();
    }

    addRecipe(): void {
        this.recipeForm.disable()
        this.addButtonLoading = true;
        const imageName: string = Utils.generateRandomId().toString();
        const recipe: IUserRecipe = {
            id: Utils.generateRandomId(),
            user_id: this.auth.userID as string,
            title: this.recipeForm.value.title,
            ingredients: this.recipeForm.value.ingredients,
            servings: this.recipeForm.value.servings,
            instructions: this.recipeForm.value.instructions,
            sharedWith: [],
            favorites: [],
            image: imageName.toString()
        }
        this.angularFireStorage.upload(`/${imageName}`, this.imagePath).then(() => {
            this.recipeService.addNewRecipe(recipe).then(() => {
                this.closeBox();
                this.resetForm();
                this.updateRecipes();
                this.addButtonLoading = false;
                this.recipeForm.enable();
            });
        });
    }

    updateRecipes(): void {
        if(this.router.url.includes('profile')){
            this.profileComponent.getUserRecipes();
        }
    }
}
