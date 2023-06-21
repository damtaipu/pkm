import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of } from "rxjs";
import { PkmDataModel } from "src/app/core/domain/pokeon/pokemon-data.domain";
import { GetPokemonListRepositorie } from "src/app/core/repositorie/pokemon/get-pokemon-list.repositorie";

@Injectable({
    providedIn: 'root'
})

export class GetPokemonListRepository extends GetPokemonListRepositorie {

    constructor(private http: HttpClient) {
        super();
    }

    getPokemonList() {
        return this.http.get<PkmDataModel>('https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0').pipe(map(e => {
            let mapper = e.results.map(r => {
                return { ...r, id: r.url.slice(1, -1).split('/')[6] }
            })

            return {
                ...e,
                results: mapper
            }
        }));
    }

    getPokemonListPaginate(param: any) {
        return this.http.get<PkmDataModel>(`https://pokeapi.co/api/v2/pokemon/?limit=${param.limit}&offset=${param.offSet}`).pipe(map(e => {
            let mapper = e.results.map(r => {
                return { ...r, id: r.url.slice(1, -1).split('/')[6] }
            })

            return {
                ...e,
                results: mapper
            }
        }));
    }

}