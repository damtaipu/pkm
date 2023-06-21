import { Injectable } from "@angular/core";
import { UseCase } from "../../domain/usecase/usecase.domain";
import { PkmDataModel } from "../../domain/pokeon/pokemon-data.domain";
import { GetPokemonListRepositorie } from "../../repositorie/pokemon/get-pokemon-list.repositorie";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RequestPokemonDetaiUsesCase implements UseCase<number, PkmDataModel> {

    constructor(private getList: GetPokemonListRepositorie) { }

    execute(param: number): Observable<PkmDataModel> {
        return this.getList.getPokemonDetail(param);
    }
}