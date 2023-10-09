import { UserRepository } from "@/users/domain/repositories/use.repository";
import { UseCase as DefaultUseCase } from "@/shared/application/useCases/use-cases";
import { SearchInput } from "@/shared/application/dtos/search-inputs";

export namespace ListUsersUseCase {
    export type Input = SearchInput;
    export type Output = void;


    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private userRepository: UserRepository.Repository,
        ) {}

        async execute(input: Input): Promise<Output> {
            const params = new UserRepository.SearchParams(input);
            const searchResult = await this.userRepository.search(params);
            return;
        }
    }
}


