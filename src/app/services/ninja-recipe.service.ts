import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class NinjaRecipeService {

    constructor( private httpClient: HttpClient) { }

    get(query: string, options?: {headers?: HttpHeaders}) {
          return this.httpClient.get('https://api.api-ninjas.com/v1/recipe?query=' + query, { headers: options?.headers});
    }
}
