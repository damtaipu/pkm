import { Observable } from "rxjs";
import { PkmDataModel } from "../../domain/pokeon/pokemon-data.domain";

export abstract class GetPokemonListRepositorie {
    abstract getPokemonList(): Observable<PkmDataModel>;
    abstract getPokemonListPaginate(param: any): Observable<PkmDataModel>;
    abstract getPokemonDetail(param: number): Observable<PkmDataModel>;
}