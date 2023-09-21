import { UserRepository } from "@/users/domain/repositories/use.repository";

export namespace GetUserUseCase {
    export type Input = {
        id: string;
    }

    export type Output = {
        id: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
    }

    export class UseCase {
        constructor(
            private userRepository: UserRepository.Repository,
        ) {}

        async execute(input: GetUserUseCase.Input): Promise<GetUserUseCase.Output> {
            const entity = await this.userRepository.findById(input.id);
            return entity.toJSON();
        }
    }
}


