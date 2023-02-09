import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NinjaCocktailItemComponent } from './components/ninja-cocktail-item/ninja-cocktail-item.component';
import { NinjaRecipeItemComponent } from './components/ninja-recipe-item/ninja-recipe-item.component';
import { UserCocktailItemComponent } from './components/user-cocktail-item/user-cocktail-item.component';
import { UserRecipeItemComponent } from './components/user-recipe-item/user-recipe-item.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { CocktailItemDetailsComponent } from './pages/cocktail-item-details/cocktail-item-details.component';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecipeItemDetailsComponent } from './pages/recipe-item-details/recipe-item-details.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RegisterComponent } from './pages/register/register.component';
import { SuggestedComponent } from './pages/suggested/suggested.component';
import { UsersCocktailItemComponent } from './pages/users-cocktail-item/users-cocktail-item.component';
import { UsersRecipeItemComponent } from './pages/users-recipe-item/users-recipe-item.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [GuestGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contact-us',
        component: ContactUsComponent,
    },
    {
        path: 'cocktails',
        component: CocktailsComponent,
    },
    {
        path: 'recipes',
        component: RecipesComponent,
    },
    {
        path: 'suggested',
        component: SuggestedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cocktails/:id',
        component: CocktailItemDetailsComponent,
    },
    {
        path: 'recipes/:id',
        component: RecipeItemDetailsComponent,
    },
    {
        path: 'recipe',
        component: NinjaRecipeItemComponent,
    },
    {
        path: 'cocktail',
        component: NinjaCocktailItemComponent,
    },
    {
        path: 'user-recipes',
        component: UserRecipeItemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user-cocktails',
        component: UserCocktailItemComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users-recipes',
        component: UsersRecipeItemComponent,
    },
    {
        path: 'users-cocktails',
        component: UsersCocktailItemComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
