import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { AuthService, CocktailService, RecipeService } from 'src/app/services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  public favorite: boolean | null = null;

  @Input() data: any;
  @Input() type: string | undefined;

  constructor(private recipeService: RecipeService,
    private cocktailService: CocktailService,
    private router: Router,
    private profileComponent: ProfileComponent,
    private auth: AuthService) { }

  ngOnInit(): void {
    const sub = this.auth.user.subscribe(user => {
      this.auth.userID = user?.uid;
      sub.unsubscribe();
      this.auth.userID? this.isFavorite(): this.favorite = false;
    });
  }

  takeAnAction(): void {
    this.favorite = !this.favorite;
    switch (this.type) {
      case 'recipe':
        this.favorite ? this.addRecipeToFavorite() : this.removeRecipeFromFavorite();
        break;
      case 'cocktail':
        this.favorite ? this.addCocktailToFavorite() : this.removeCocktailFromFavorite();
        break;
    }
  }

  addRecipeToFavorite(): void {
    this.recipeService.addToFavorites(this.data?.id).then(() => {
      this.updateFavoriteRecipes();
    });
  }

  addCocktailToFavorite(): void {
    this.cocktailService.addToFavorites(this.data?.id).then(() => {
      this.updateFavoriteCocktails();
    });
  }

  updateFavoriteRecipes(): void {
    if (this.router.url.includes('profile')) {
      this.profileComponent.getFavoriteRecipes();
    }
  }

  updateFavoriteCocktails(): void {
    if (this.router.url.includes('profile')) {
      this.profileComponent.getFavoriteCocktails();
    }
  }

  removeRecipeFromFavorite(): void {
    this.recipeService.removeFromFavorites(this.data?.id).then(() => {
      this.updateFavoriteRecipes();
    });
  }

  filterRecipes(recipeId: number): void {
    if (this.router.url.includes('profile') && !this.favorite) {
      this.profileComponent.filterUserFavoriteRecieps(recipeId);
    }
  }

  removeCocktailFromFavorite(): void {
    this.cocktailService.removeFromFavorites(this.data?.id).then(() => {
      this.filterCocktails(this.data?.id);
    });
  }

  filterCocktails(cocktailId: number): void {
    if (this.router.url.includes('profile') && !this.favorite) {
      this.profileComponent.filterUserFavoriteCocktails(cocktailId);
    }
  }

  isFavorite(): void {
    let sub: any;
    switch (this.type) {
      case 'recipe':
        sub = this.recipeService.isFavoriteRecipe(this.data?.id).subscribe(result => {
          this.favorite = result.length > 0 ? true : false;
          sub.unsubscribe();
        });
        break;
      case 'cocktail':
        sub = this.cocktailService.isFavoriteCocktail(this.data?.id).subscribe(result => {
          this.favorite = result.length > 0 ? true : false;
          sub.unsubscribe();
        });
        break;
    }
  }
}
