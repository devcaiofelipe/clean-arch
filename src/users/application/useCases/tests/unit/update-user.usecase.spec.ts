import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { UpdateUserUseCase } from '../../update-user.usecase';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';

describe('UpdateUserUseCase', () => {
    let sut: UpdateUserUseCase.UseCase;
    let repository: UserInMemoryRepository;

    beforeEach(async () => {
        repository = new UserInMemoryRepository();
        sut = new UpdateUserUseCase.UseCase(repository);
    });

    it('should throw an error when the entity was not found', async () => {
        await expect(() => sut.execute({ id: 'fakeId', name: 'test name' })).rejects.toThrow(new NotFoundError('Entity not found'))
    });

    it('should throw an error when the name was not found', async () => {
        await expect(() => sut.execute({ id: 'fakeId', name: '' })).rejects.toThrow(new BadRequestError('Name not provided'))
    });

    it('should update user', async () => {
        const spyUpdate = jest.spyOn(repository, 'update');
        const items = [
            new UserEntity(userDataBuilder({})),
        ]
        repository.items = items;
        const result = await sut.execute({ id: items[0].id, name: 'new name' })
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(result).toMatchObject({
            id: items[0].id,
            name: 'new name',
            email: items[0].email,
            password: items[0].password,
            createdAt: items[0].createdAt,
        })
    });
});
