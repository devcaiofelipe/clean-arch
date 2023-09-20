import { ConflictError } from "@/shared/infrastructure/domain/errors/conflict-error";
import { NotFoundError } from "@/shared/infrastructure/domain/errors/not-found-error";
import { InMemorySearchableRepository } from "@/shared/infrastructure/domain/repositories/in-memory-repository-searchable";
import { SortDirection } from "@/shared/infrastructure/domain/repositories/searchable-repository-contracts";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { UserRepository } from "@/users/domain/repositories/use.repository";

export class UserInMemoryRepository extends InMemorySearchableRepository<UserEntity> implements UserRepository.Repository {
    sortableFields: string[] = ['name', 'createdAt'];
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
            throw new ConflictError('Email address already used');
        }
    }

    protected async applyFilter(items: UserEntity[], filter: UserRepository.Filter): Promise<UserEntity[]> {
        if (!filter) return items;
        return items.filter(item => {
            return item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        })
    }

    protected async applySort(items: UserEntity[], sort: string, sortDir: SortDirection | null): Promise<UserEntity[]> {
        return !sort ? super.applySort(items, 'createdAt', 'desc') : super.applySort(items, sort, sortDir);
    }
}
