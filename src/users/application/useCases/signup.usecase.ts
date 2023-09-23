import { UserEntity } from "@/users/domain/entities/user.entity";
import { BadRequestError } from "../errors/bad-request-error";
import { UserRepository } from "@/users/domain/repositories/use.repository";
import { HashProvider } from "@/shared/application/providers/hash-provider";
import { UserOutput } from "../dtos/user-output";
import { UseCase as DefaultUseCase } from "@/shared/application/useCases/use-cases";

export namespace SingUpUseCase {
    export type Input = {
        name: string;
        email: string;
        password: string;
    }

    export type Output = UserOutput;

    export class UseCase implements DefaultUseCase<Input, Output> {
        constructor(
            private userRepository: UserRepository.Repository,
            private hashProvider: HashProvider,
        ) {}

        async execute(input: SingUpUseCase.Input): Promise<SingUpUseCase.Output> {
            const { name, email, password } = input;

            if (!name || !email || !password) {
                throw new BadRequestError('Input data not provided');
            }

            await this.userRepository.emailExists(email);

            const hashPassword = await this.hashProvider.generateHash(password);
            const entity = new UserEntity(
                Object.assign(input, { password: hashPassword })
            );
            await this.userRepository.insert(entity);
            return entity.toJSON();
        }
    }
}


