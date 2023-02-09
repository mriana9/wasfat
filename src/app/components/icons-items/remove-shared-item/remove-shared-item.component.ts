import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { CocktailService, RecipeService } from 'src/app/services';

@Component({
    selector: 'app-remove-shared-item',
    templateUrl: './remove-shared-item.component.html',
    styleUrls: ['./remove-shared-item.component.scss']
})
export class RemoveSharedItemComponent implements OnInit {

    @Input() data: any;
    @Input() type: string | undefined;
    public removeButton: boolean = false;
    public removeLoading: boolean = false;

    constructor(
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private profileComponent: ProfileComponent,
        private router: Router) { }

    ngOnInit(): void {
    }

    removeUserCardActivity(): void {
        this.removeButton = !this.removeButton;
    }

    closeRemoveBox(): void {
        this.removeButton = !this.removeButton;
    }

    removeItem(): void {
        this.removeLoading = true;
        this.type == 'recipe' ? this.removeRecipe(this.data.id) : this.removeCocktail(this.data.id);
    }

    removeRecipe(recipeId: number): void {
        this.recipeService.removeSharedRecipe(recipeId).then(() => {
            this.removeLoading = false;
            this.closeRemoveBox();
            this.filterRecipes(recipeId);
        });
    }

    removeCocktail(cocktailId: number): void {
        this.cocktailService.removeSharedCocktail(cocktailId).then(() => {
            this.removeLoading = false;
            this.closeRemoveBox();
            this.filterCocktails(cocktailId);
        });
    }

    filterRecipes(recipeId: number): void {
        if (this.router.url.includes('profile')) {
            this.profileComponent.filterUserSharedRecipes(recipeId);
        } else if (this.router.url.includes('recipes')) {
            this.router.navigateByUrl('/profile');
        }
    }

    filterCocktails(cocktailId: number): void {
        if (this.router.url.includes('profile')) {
            this.profileComponent.filterUserSharedCocktails(cocktailId);
        } else if (this.router.url.includes('cocktails')) {
            this.router.navigateByUrl('/profile');
        }
    }
}
