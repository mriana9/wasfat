import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CocktailItemDetailsComponent } from './cocktail-item-details/cocktail-item-details.component';
import { RecipeItemDetailsComponent } from './recipe-item-details/recipe-item-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BigCardComponent } from '../components/cards/big-card/big-card.component';
import { SmallCardComponent } from '../components/cards/small-card/small-card.component';
import { SliderCardsComponent } from '../components/cards/slider-cards/slider-cards.component';
import { RouterModule } from '@angular/router';
import { CardDetailsComponent } from '../components/cards/card-details/card-details.component';
import { CardRateComponent } from '../components/cards/card-rate/card-rate.component';
import { CardCommentComponent } from '../components/cards/card-comment/card-comment.component';
import { FavoriteComponent } from '../components/icons-items/favorite/favorite.component';
import { DeleteItemComponent } from '../components/icons-items/delete-item/delete-item.component';
import { ShareItemComponent } from '../components/icons-items/share-item/share-item.component';
import { AddRecipeComponent } from '../components/buttons/add-recipe/add-recipe.component';
import { AddCocktailComponent } from '../components/buttons/add-cocktail/add-cocktail.component';
import { MasterCardComponent } from '../components/cards/master-card/master-card.component';
import { UserShareBoxComponent } from '../components/user-share-box/user-share-box.component';
import { FavoriteCardComponent } from '../components/cards/favorite-card/favorite-card.component';
import { RemoveSharedItemComponent } from '../components/icons-items/remove-shared-item/remove-shared-item.component';
import { PageLoadingComponent } from '../components/loading/page-loading/page-loading.component';
import { SeeMoreComponent } from '../components/see-more/see-more.component';
import { UserRecipeItemComponent } from '../components/user-recipe-item/user-recipe-item.component';
import { UserCocktailItemComponent } from '../components/user-cocktail-item/user-cocktail-item.component';
import { IconLoadingComponent } from '../components/loading/icon-loading/icon-loading.component';
import { NinjaRecipeItemComponent } from '../components/ninja-recipe-item/ninja-recipe-item.component';
import { NinjaCardDetailsComponent } from '../components/cards/ninja-card-details/ninja-card-details.component';
import { NinjaCocktailItemComponent } from '../components/ninja-cocktail-item/ninja-cocktail-item.component';
import { NinjaMasterCardComponent } from '../components/cards/ninja-master-card/ninja-master-card.component';
import { GenderPipe } from '../pipes/gender.pipe';
import { UsersRecipeItemComponent } from './users-recipe-item/users-recipe-item.component';
import { UsersCocktailItemComponent } from './users-cocktail-item/users-cocktail-item.component';
import { FakeFavoriteComponent } from '../components/icons-items/fake-favorite/fake-favorite.component';
import { FakeShareComponent } from '../components/icons-items/fake-share/fake-share.component';
import { LoginPopupComponent } from '../components/login-popup/login-popup.component';
import { FakeLoginButtonComponent } from '../components/icons-items/fake-login-button/fake-login-button.component';
import { FakeRateComponent } from '../components/icons-items/fake-rate/fake-rate.component';

@NgModule({
    declarations: [
        HomeComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        CocktailsComponent,
        RecipesComponent,
        FavoritesComponent,
        SuggestedComponent,
        ContactUsComponent,
        CocktailItemDetailsComponent,
        RecipeItemDetailsComponent,
        BigCardComponent,
        SmallCardComponent,
        SliderCardsComponent,
        RecipeItemDetailsComponent,
        CardDetailsComponent,
        CardRateComponent,
        CardCommentComponent,
        FavoriteComponent,
        DeleteItemComponent,
        ShareItemComponent,
        AddRecipeComponent,
        AddCocktailComponent,
        MasterCardComponent,
        UserShareBoxComponent,
        FavoriteCardComponent,
        RemoveSharedItemComponent,
        PageLoadingComponent,
        SeeMoreComponent,
        UserRecipeItemComponent,
        UserCocktailItemComponent,
        IconLoadingComponent,
        NinjaRecipeItemComponent,
        NinjaCardDetailsComponent,
        NinjaCocktailItemComponent,
        NinjaMasterCardComponent,
        GenderPipe,
        UsersRecipeItemComponent,
        UsersCocktailItemComponent,
        FakeFavoriteComponent,
        FakeShareComponent,
        LoginPopupComponent,
        FakeLoginButtonComponent,
        FakeRateComponent

    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        HomeComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        CocktailsComponent,
        RecipesComponent,
        FavoritesComponent,
        SuggestedComponent,
        ContactUsComponent,
        CocktailItemDetailsComponent,
        RecipeItemDetailsComponent,
    ]
})
export class PagesModule { }
