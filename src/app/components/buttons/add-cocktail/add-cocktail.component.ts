import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/common/utils';
import { IUserCocktail } from 'src/app/interfaces/user-cocktail';
import { AuthService, CocktailService } from 'src/app/services';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { IUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-cocktail',
    templateUrl: './add-cocktail.component.html',
    styleUrls: ['./add-cocktail.component.scss']
})
export class AddCocktailComponent implements OnInit {

    private imagePath: string = '';
    public addCocktailBox: boolean = false;
    public addButtonLoading: boolean = false;
    @Input() currentUser: IUser | undefined;

    public cocktailForm: FormGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        ingredients: new FormArray([new FormGroup({
            ingredientItem: new FormControl('', Validators.required)
        })]),
        instructions: new FormControl('', Validators.required),
        image: new FormControl('', Validators.required)
    });

    constructor(
        private auth: AuthService,
        private cocktailService: CocktailService,
        private angularFireStorage: AngularFireStorage,
        private profileComponent: ProfileComponent,
        private router: Router) { }

    ngOnInit(): void {
    }

    showAddCocktailForm(): void {
        this.addCocktailBox = !this.addCocktailBox;
    }

    closeBox(): void {
        this.resetForm();
        this.addCocktailBox = !this.addCocktailBox;
    }

    addNewIngredientItem(): void {
        (this.cocktailForm.get('ingredients') as FormArray).push(new FormGroup({
            ingredientItem: new FormControl('', Validators.required)
        }));
    }

    getIngredientsArray(): FormGroup[] {
        const array = this.cocktailForm.get('ingredients') as FormArray;
        return array.controls as FormGroup[];
    }

    getIngredientsArrayValues(): string[] {
        const array: string[] = [];
        for (let item of this.getIngredientsArray()) {
            array.push(item.value.ingredientItem);
        }
        return array;
    }

    resetForm(): void {
        this.cocktailForm.reset();
        const ingredientsArray = this.cocktailForm.get('ingredients') as FormArray;
        while (ingredientsArray.length > 1) {
            ingredientsArray.removeAt(0);
        }
    }

    uploadImage($event: any): void {
        this.imagePath = $event.target.files[0];
    }

    addNewCocktail(): void {
        this.cocktailForm.disable();
        this.addButtonLoading = true;
        const imageName: string = Utils.generateRandomId().toString();
        const cocktail: IUserCocktail = {
            id: Utils.generateRandomId(),
            user_id: this.auth.userID as string,
            ingredients: this.getIngredientsArrayValues(),
            instructions: this.cocktailForm.value.instructions,
            name: this.cocktailForm.value.name,
            image: imageName.toString(),
            sharedWith: [],
            favorites: []
        }

        this.angularFireStorage.upload(`/${imageName}`, this.imagePath).then(() => {
            this.cocktailService.addNewCocktail(cocktail).then(() => {
                this.cocktailForm.reset();
                this.closeBox();
                this.updateCocktails();
                this.addButtonLoading = false;
                this.cocktailForm.enable();
            });
        });
    }

    updateCocktails(): void {
        if(this.router.url.includes('profile')){
            this.profileComponent.getUserCocktails();
        }
    }

    removeIngredientItem(index: number): void {
        const ingredientsArray = this.cocktailForm.get('ingredients') as FormArray;
        if (ingredientsArray.length > 1) {
            ingredientsArray.removeAt(index);
        }
    }
}
