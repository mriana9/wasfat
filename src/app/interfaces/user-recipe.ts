export interface IUserRecipe {
    id: number,
    user_id: string,
    title: string,
    ingredients: string,
    servings: string,
    instructions: string,
    sharedWith: number[],
    favorites: number[] | string[],
    image: string,
}