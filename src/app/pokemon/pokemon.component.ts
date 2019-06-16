import { Component, OnInit } from '@angular/core';
import { PokemonService } from "../pokemon.service"
import { PokemonModel } from '../pokemon-model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  pokemonIdOrName;
  pokemonDetails = new PokemonModel('','','','','','','');
  randomImg1;
  randomImg2;
  randomImg3;
  randomImg4;
  globalFour = [];
  errorMessage = false;


  constructor(
    private service: PokemonService,
  ) { }

  ngOnInit() {
  }

  getPokemonDetails(pokeId) {
    console.log('pokeId', this.globalFour[pokeId]);
    console.log(this.pokemonIdOrName);
    if (this.pokemonIdOrName === undefined) {
      this.errorMessage = true;
    } else {
      this.errorMessage = false;
    }
    if (pokeId !== "false") {
      this.pokemonIdOrName = this.globalFour[pokeId];
    }
    this.service.getPokemon(this.pokemonIdOrName).toPromise().then(response => {
      console.log(response);
      this.pokemonDetails.name = this.capFirstChar(response["name"]);
      this.pokemonDetails.id = response["id"];
      this.pokemonDetails.height = response["height"];
      this.pokemonDetails.weight = response["weight"];
      this.pokemonDetails.image = response["sprites"]["front_default"];
      this.pokemonDetails.type = this.getPokemonTypes(response["types"]);
      this.pokemonDetails.abilities = this.getPokemonAbilities(response["abilities"]);
    }, err => {
      console.log(err);
    });
  }

  getPokemonTypes(types) {
    let result = "";
    for (let i in types) {
      result += ", " + this.capFirstChar(types[i]["type"]["name"]);
    }
    return result.slice(2);
  }

  getPokemonAbilities(abilities) {
    let result = "";
    for (let i in abilities) {
      result += ", " + this.capFirstChar(abilities[i]["ability"]["name"]);
    }
    return result.slice(2);
  }

  capFirstChar(anyString) {
    return anyString.charAt(0).toUpperCase() + anyString.slice(1);
  }

  getRandomPokemon() {
    let pokeIdList = [];
    for (let i = 1; i < 808; i++) {
      pokeIdList.push(i);
    }
    let fourRandom = this.getRandomFour(pokeIdList);
    this.globalFour = fourRandom;
    console.log(fourRandom);
    for (let i in fourRandom) {
      this.service.getPokemon(fourRandom[i]).toPromise().then(response => {
        console.log(response);
        let imgId = "randomImg" + (parseInt(i)+1).toString();
        this[imgId] = response["sprites"]["front_default"];
        this
      }, err => {
        console.log(err);
      });
    }
  }

  getRandomFour(anyArray) {
    for (let i = anyArray.length - 1; i > 0; i --) {
        let switchNum = Math.floor(Math.random() * (i + 1));
        [anyArray[i], anyArray[switchNum]] = [anyArray[switchNum], anyArray[i]];
    }
    return anyArray.slice(0,4);
  }
}
