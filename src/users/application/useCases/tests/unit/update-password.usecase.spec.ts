import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { UpdatePasswordUseCase } from '../../update-password-user.usecase';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BCryptJSHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash-provider';

describe('UpdatePasswordUseCase', () => {
    let sut: UpdatePasswordUseCase.UseCase;
    let repository: UserInMemoryRepository;
    let hashProvider: HashProvider;

    beforeEach(async () => {
        repository = new UserInMemoryRepository();
        hashProvider = new BCryptJSHashProvider();
        sut = new UpdatePasswordUseCase.UseCase(repository, hashProvider);
    });

    it('should throw an error when the entity was not found', async () => {
        await expect(() => sut.execute({ id: 'fakeId', password: 'test password', oldPassword: 'old password' })).rejects.toThrow(new NotFoundError('Entity not found'))
    });

    it('should throw an error when the old password was not found', async () => {
        const entity = new UserEntity(userDataBuilder({}));
        repository.items = [entity];
        await expect(() => sut.execute({ id: entity.id, password: 'test password', oldPassword: '' })).rejects.toThrow(new BadRequestError('Old password and new password is required'))
    });

    it('should throw an error when the new password was not found', async () => {
        const entity = new UserEntity(userDataBuilder({ password: '1234' }));
        repository.items = [entity];
        await expect(() => sut.execute({ id: entity.id, password: '', oldPassword: '1234' })).rejects.toThrow(new BadRequestError('Old password and new password is required'))
    });

    it('should throw an error when the new old password does not match', async () => {
        const hashPassword = await hashProvider.generateHash('1234')
        const entity = new UserEntity(userDataBuilder({ password: hashPassword }));
        repository.items = [entity];
        await expect(() => sut.execute({ id: entity.id, password: '4567', oldPassword: '123456' })).rejects.toThrow(new BadRequestError('Old password does not match'))
    });

    it('should update password', async () => {
        const hashPassword = await hashProvider.generateHash('1234')
        const spyUpdate = jest.spyOn(repository, 'update');
        const items = [
            new UserEntity(userDataBuilder({ password: hashPassword })),
        ]
        repository.items = items;
        const result = await sut.execute({ id: items[0].id, password: '4567', oldPassword: '1234' })
        const checkNewPassword = await hashProvider.compareHash('4567', result.password);
        expect(spyUpdate).toHaveBeenCalledTimes(1);
        expect(checkNewPassword).toBeTruthy();
    })
});

