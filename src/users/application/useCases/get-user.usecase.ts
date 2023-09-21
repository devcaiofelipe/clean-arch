import { UserRepository } from "@/users/domain/repositories/use.repository";
import { UserOutput } from "../dtos/user-output";

export namespace GetUserUseCase {
    export type Input = {
        id: string;
    }

    export type Output = UserOutput;


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


