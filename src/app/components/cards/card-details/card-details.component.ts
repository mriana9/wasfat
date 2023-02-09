import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/common/utils';
import { IComment } from 'src/app/interfaces/comment';
import { AuthService, CocktailService, CommentService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-card-details',
    templateUrl: './card-details.component.html',
    styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

    @Input() data: any;
    @Input() type: string | undefined;
    @Input() imageUrl: string | undefined;
    @Input() comments: IComment[] | undefined;
    @Input() isUserCard: boolean | undefined;
    @Input() category: string | undefined;
    @Input() shared: boolean | undefined;

    public isLoggedIn: boolean | null = null;

    editRecipeInputTitle: boolean = false;
    editRecipeInputServings: boolean = false;
    editRecipeInputIngredients: boolean = false;
    editRecipeInputInstructions: boolean = false;

    editCocktailInputTitle: boolean = false;
    editCocktailInputIngredients: boolean = false;
    editCocktailInputInstructions: boolean = false;

    recipeTitleLoading: boolean = false;
    cocktailTitleLoading: boolean = false;
    recipeServingsLoading: boolean = false;
    recipeIngredientsLoading: boolean = false;
    cocktailIngredientsLoading: boolean = false;
    recipeInstructionsLoading: boolean = false;
    cocktailInstructionsLoading: boolean = false;

    ingredientsForm: FormGroup = new FormGroup({
        ingredients: new FormArray([])
    });

    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('', Validators.required)
    });

    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private commentService: CommentService,
        public auth: AuthService) {}

    ngOnInit(): void {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            this.isLoggedIn = this.auth.userID? true: false;
            sub.unsubscribe();
        });
    }

    getIngredientsFormArray(): FormGroup[] {
        const array = this.ingredientsForm.get('ingredients') as FormArray;
        return array.controls as FormGroup[];
    }

    setIngredientsArray(): void {
        for (let item of this.data?.ingredients) {
            this.addNewIngredientItem(item);
        }
    }

    getIngredientsFormArrayValues(): string[] {
        const array: string[] = [];
        for (let item of this.getIngredientsFormArray()) {
            array.push(item.value.ingredients);
        }
        return array;
    }

    addNewIngredientItem(item?: string): void {
        item = item ? item : '';
        (this.ingredientsForm.get('ingredients') as FormArray).push(new FormGroup({
            ingredients: new FormControl(item, Validators.required)
        }));
    }

    removeIngredientItem(index: number): void {
        const ingredientsArray = this.ingredientsForm.get('ingredients') as FormArray;
        if (ingredientsArray.length > 1) {
            ingredientsArray.removeAt(index);
        }
    }

    //Recipes//

    showEditRecipeInputTitle(): void {
        this.editRecipeInputTitle = !this.editRecipeInputTitle;
    }

    showEditRecipeInputServings(): void {
        this.editRecipeInputServings = !this.editRecipeInputServings;
    }

    showEditRecipeInputIngredients(): void {
        this.editRecipeInputIngredients = !this.editRecipeInputIngredients;
    }

    showEditRecipeInputInstructions(): void {
        this.editRecipeInputInstructions = !this.editRecipeInputInstructions;
    }

    updateRecipeTitle(title: string): void {
        if (title) {
            this.recipeTitleLoading = true;
            this.recipeService.updateTitle(this.data?.id as number, title).then(() => {
                this.data.title = title;
                this.showEditRecipeInputTitle();
                this.recipeTitleLoading = false;
            });
        }
    }

    updateRecipeServings(servings: string): void {
        if (servings) {
            this.recipeServingsLoading = true;
            this.recipeService.updateServings(this.data?.id as number, servings).then(() => {
                this.data.servings = servings;
                this.showEditRecipeInputServings();
                this.recipeServingsLoading = false;
            });
        }
    }

    updateRecipeIngredients(ingredients: string): void {
        if (ingredients) {
            this.recipeIngredientsLoading = true;
            this.recipeService.updateIngredients(this.data?.id, ingredients).then(() => {
                this.data.ingredients = ingredients;
                this.showEditRecipeInputIngredients();
                this.recipeIngredientsLoading = false;
            });
        }
    }

    updateRecipeInstructions(instructions: string): void {
        if (instructions) {
            this.recipeInstructionsLoading = true;
            this.recipeService.updateInstructions(this.data?.id, instructions).then(() => {
                this.data.instructions = instructions;
                this.showEditRecipeInputInstructions();
                this.recipeInstructionsLoading = false;
            });
        }
    }

    addNewComment(): void {
        const comment: IComment = {
            type: this.type as string,
            type_id: this.data.id,
            comment: this.commentForm.value.comment,
            user_id: this.auth.userID as string,
            date: Utils.GetCurrentDate()
        }
        this.comments?.push(comment);
        this.commentForm.reset();
        this.commentService.addNewComment(comment);
    }

    // Cocktails

    showEditCocktailInputTitle(): void {
        this.editCocktailInputTitle = !this.editCocktailInputTitle;
    }

    showEditCocktailInputIngredients(): void {
        this.setIngredientsArray();
        this.editCocktailInputIngredients = true;
    }

    hideEditCocktailInputIngredients(): void {
        this.editCocktailInputIngredients = false;
    }

    showEditCocktailInputInstructions(): void {
        this.editCocktailInputInstructions = !this.editCocktailInputInstructions;
    }

    updateCocktailTitle(title: string): void {
        if (title) {
            this.cocktailTitleLoading = true;
            this.cocktailService.updateName(this.data?.id as number, title).then(() => {
                this.data.name = title;
                this.showEditCocktailInputTitle();
                this.cocktailTitleLoading = false;
            });
        }
    }

    updateCocktailIngredients(): void {
        const newIngredients = this.getIngredientsFormArrayValues();
        const isEmpty = newIngredients.some(item => {
            return item == '';
        });
        if (!isEmpty) {
            this.ingredientsForm.disable();
            this.cocktailIngredientsLoading = true;
            this.cocktailService.updateIngredients(this.data?.id, newIngredients).then(() => {
                this.data.ingredients = newIngredients;
                this.resetForm();
                this.hideEditCocktailInputIngredients();
                this.cocktailIngredientsLoading = false;
                this.ingredientsForm.enable();
            });
        }
    }

    UpdateCocktailInstructions(instructions: string): void {
        if (instructions) {
            this.cocktailInstructionsLoading = true;
            this.cocktailService.updateInstructions(this.data?.id, instructions).then(() => {
                this.data.instructions = instructions;
                this.showEditCocktailInputInstructions();
                this.cocktailInstructionsLoading = false;
            });
        }
    }


    //General//

    updateTitle(title: string): void {
        this.type == 'recipe' ? this.updateRecipeTitle(title) : this.updateCocktailTitle(title);
    }

    updateServings(servings: string): void {
        this.type == 'recipe' ? this.updateRecipeServings(servings) : null;
    }

    updateIngredients(ingredients?: string): void {
        this.type == 'recipe' ? this.updateRecipeIngredients(ingredients as string) : this.updateCocktailIngredients();
    }

    updateInstructions(instructions: string): void {
        this.type == 'recipe' ? this.updateRecipeInstructions(instructions) : this.UpdateCocktailInstructions(instructions);
    }

    resetForm(): void {
        this.ingredientsForm.reset();
        const ingredientsArray = this.ingredientsForm.get('ingredients') as FormArray;
        while (ingredientsArray.length > 0) {
            ingredientsArray.removeAt(0);
        }
    }

}
