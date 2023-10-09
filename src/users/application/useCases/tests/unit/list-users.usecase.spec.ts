import { UserInMemoryRepository } from "@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository";
import { ListUsersUseCase } from "../../list-users.usecase";
import { UserRepository } from "@/users/domain/repositories/use.repository";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { userDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";

describe('ListUsersUseCase unit tests', () => {
    let sut: ListUsersUseCase.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(async () => {
        repository = new UserInMemoryRepository();
        sut = new ListUsersUseCase.UseCase(repository);
    });
    it('toOutput method', () => {
        let result = new UserRepository.SearchResult({
            items: [] as any,
            total: 1,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: 'fake'
        })
        let output = sut['toOutput'](result);
        expect(output).toStrictEqual({
            items: [],
            total: 1,
            currentPage: 1,
            lastPage: 1,
            perPage: 2,
        })

        const entity = new UserEntity(userDataBuilder({}));
        result = new UserRepository.SearchResult({
            items: [entity] as any,
            total: 1,
            currentPage: 1,
            perPage: 2,
            sort: null,
            sortDir: null,
            filter: 'fake'
        })
        output = sut['toOutput'](result);
        expect(output).toStrictEqual({
            items: [entity.toJSON()],
            total: 1,
            currentPage: 1,
            lastPage: 1,
            perPage: 2,
        })
    })

    it('should return the users sorted by createdAt', async () => {
        const createdAt = new Date();
        const items = [
            new UserEntity(userDataBuilder({ createdAt })),
            new UserEntity(userDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) })),

        ]
        repository.items = items;
        const output = await sut.execute({});
        expect(output).toStrictEqual({
            items: [...items.reverse()].map(item => item.toJSON()),
            total: 2,
            currentPage: 1,
            lastPage: 1,
            perPage: 15,
        })
    })

    it('should return the users using pagination, sort and filter', async () => {
        const items = [
            new UserEntity(userDataBuilder({ name: 'a' })),
            new UserEntity(userDataBuilder({ name: 'AA' })),
            new UserEntity(userDataBuilder({ name: 'Aa' })),
            new UserEntity(userDataBuilder({ name: 'b' })),
            new UserEntity(userDataBuilder({ name: 'c' })),
        ]
        repository.items = items;
        const output = await sut.execute({
            page: 1,
            perPage: 2,
            sort: 'name',
            sortDir: 'asc',
            filter: 'a',
        });
        console.log(output);
        expect(output).toStrictEqual({
            items: [items[1].toJSON(), items[2].toJSON()],
            total: 3,
            currentPage: 1,
            lastPage: 2,
            perPage: 2,
        })
    })
})
