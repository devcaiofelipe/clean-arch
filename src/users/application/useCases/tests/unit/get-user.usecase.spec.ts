import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { GetUserUseCase } from '../../get-user.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('GetUserUseCase', () => {
  let sut: GetUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(async () => {
    repository = new UserInMemoryRepository();
    sut = new GetUserUseCase.UseCase(repository);
  });

  it('should throw an error when the entity was not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(new NotFoundError('Entity not found'))
  });

  it('should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [
        new UserEntity(userDataBuilder({})),
    ]
    repository.items = items;
    const result = await sut.execute({ id: items[0].id })
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
        id: items[0].id,
        name: items[0].name,
        email: items[0].email,
        password: items[0].password,
        createdAt: items[0].createdAt,
    })
  });
});
