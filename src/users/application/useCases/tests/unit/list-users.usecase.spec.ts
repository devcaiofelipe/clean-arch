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
})
