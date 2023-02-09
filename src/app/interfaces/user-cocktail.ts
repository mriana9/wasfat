export interface IUserCocktail {
    id: number,
    user_id: string,
    ingredients: string[],
    instructions: string,
    name: string,
    sharedWith: number[],
    favorites: number[] | string[],
    image: string,
}