import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  private baseUrl = "https://pokeapi.co/api/v2/";

  getPokemon(idOrName) {
    let url = this.baseUrl + "pokemon/" + idOrName +  "/";
    console.log('here', url);
    return this.http.get(url);
  }
}
