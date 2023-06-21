import { GetPokemonListRepositorie } from "../core/repositorie/pokemon/get-pokemon-list.repositorie"
import { GetPokemonListRepository } from "../data/repository/pokemon/get-pokemon-list.repository"

export const dependencyInjection = [
    {
        provide: GetPokemonListRepositorie, useClass: GetPokemonListRepository
    }
]