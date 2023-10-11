import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BCryptJSHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash-provider';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { BadRequestError } from '@/shared/application/errors/bad-request-error';
import { SingInUseCase } from '../../signin.usecase';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InvalidCredentialsError } from '@/shared/application/errors/invalid-credentials-error';

describe('SingInUseCase unit tests', () => {
  let sut: SingInUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(async () => {
    repository = new UserInMemoryRepository();
    hashProvider = new BCryptJSHashProvider();
    sut = new SingInUseCase.UseCase(repository, hashProvider);
  });

  it('should authentitice an user', async () => {
    const spyFindByEmail = jest.spyOn(repository, 'findByEmail');
    const hashPassword = await hashProvider.generateHash('1234');
    const entity = new UserEntity(userDataBuilder({ email: 'a@a.com', password: hashPassword }));
    repository.items = [entity];
    const result = await sut.execute(
        {
            email: entity.email,
            password: '1234',
        }
    )
    expect(spyFindByEmail).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(entity.toJSON());
  });

  it('should throw error when email not provided', async () => {
    const props = { email: null, password: '1234' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  });

  it('should throw error when password not provided', async () => {
    const props = { email: 'a@a.com', password: null };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  });

  it('should not be able to authentitcate with wrong email', async () => {
    const props = { email: 'a@a.com', password: '1234' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(NotFoundError)
  });

  it('should not be able to authentitcate with wrong email', async () => {
    const hash = await hashProvider.generateHash('1234')
    repository.items = [new UserEntity(userDataBuilder({ password: hash , email: 'a@a.com'}))]
    const props = { email: 'a@a.com', password: 'wrong password' };
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(InvalidCredentialsError)
  });
});
