import { UserRepository } from "@/users/domain/repositories/use.repository";
import { UseCase as DefaultUseCase } from "@/shared/application/useCases/use-cases";

export namespace DeleteUserUseCase {
    export type Input = {
        id: string;
    }

    export type Output = void;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private userRepository: UserRepository.Repository,
        ) {}

        async execute(input: Input): Promise<void> {
            await this.userRepository.delete(input.id);
        }
    }
}


