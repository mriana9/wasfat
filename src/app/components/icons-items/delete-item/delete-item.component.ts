import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { CocktailService, RecipeService } from 'src/app/services';
import { UserCocktailItemComponent } from '../../user-cocktail-item/user-cocktail-item.component';
import { UserRecipeItemComponent } from '../../user-recipe-item/user-recipe-item.component';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {

  @Input() data: any;
  @Input() type: string | undefined;
  public deleteLoading: boolean = false;
  public deleteButton: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private cocktailService: CocktailService,
    private profileComponent: ProfileComponent,
    private userCocktailComponent: UserCocktailItemComponent,
    private userRecipeComponent: UserRecipeItemComponent,
    private router: Router) { }

  ngOnInit(): void {
  }

  deleteUserCardActivity(): void {
    this.deleteButton = !this.deleteButton;
  }

  closeDeleteBox(): void {
    this.deleteButton = !this.deleteButton;
  }

  deleteItem(): void {
    this.deleteLoading = true;
    this.type == 'recipe'? this.deleteRecipe(this.data.id): this.deleteCocktail(this.data.id);
  }

  deleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).then(() => {
      this.deleteLoading = false;
      this.closeDeleteBox();
      this.filterRecipes(recipeId);
    });
  }

  deleteCocktail(cocktailId: number): void {
    this.cocktailService.deleteCocktail(cocktailId).then(() => {
      this.deleteLoading = false;
      this.closeDeleteBox();
      this.filterCocktails(cocktailId);
    });
  }

  filterCocktails(cocktailId: number): void {
    if (this.router.url.includes('profile')) {
      this.profileComponent.filterUserCocktails(cocktailId);
      this.profileComponent.filterUserFavoriteCocktails(cocktailId);
    } else if (this.router.url.includes('user-cocktails')) {
      this.userCocktailComponent.filterUserCocktails(cocktailId);
      this.userCocktailComponent.paginate();
    } else if (this.router.url.includes('cocktails')) {
      this.router.navigateByUrl('/profile');
    }
  }

  filterRecipes(recipeId: number): void {
    if (this.router.url.includes('profile')) {
      this.profileComponent.filterUserRecipes(recipeId);
      this.profileComponent.filterUserFavoriteRecieps(recipeId);
    } else if (this.router.url.includes('user-recipes')) {
      this.userRecipeComponent.filterUserRecipes(recipeId);
      this.userRecipeComponent.paginate();
    } else if (this.router.url.includes('recipes')) {
      this.router.navigateByUrl('/profile');
    }
  }
}
