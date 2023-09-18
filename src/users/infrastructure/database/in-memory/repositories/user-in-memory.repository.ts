import { ConflictError } from "@/shared/infrastructure/domain/errors/conflict-error";
import { NotFoundError } from "@/shared/infrastructure/domain/errors/not-found-error";
import { InMemoryRepository } from "@/shared/infrastructure/domain/repositories/in-memory-repository";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/use.repository";

export class UserInMemoryRepository extends InMemoryRepository<UserEntity> implements UserRepository {
    async findByEmail(email: string): Promise<UserEntity> {
        const entity = this.items.find((item) => item.email === email);
        if (!entity) {
            throw new NotFoundError(`Entity not found using email ${email}`);
        }
        return entity;
    }

    async emailExists(email: string): Promise<void> {
        const entity = this.items.find((item) => item.email === email);
        if (entity) {
            throw new ConflictError('Email address already used email');
        }
    }
}
