import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NinjaCocktailService {

    constructor(private httpClient: HttpClient) { }

    get(query: string, options?: { headers?: HttpHeaders }) {
        return this.httpClient.get('https://api.api-ninjas.com/v1/cocktail?name=' + query, { headers: options?.headers });
    }
}
