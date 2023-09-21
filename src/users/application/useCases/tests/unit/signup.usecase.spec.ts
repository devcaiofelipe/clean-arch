import { SingUpUseCase } from '../../signup.usecase';
import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { BCryptJSHashProvider } from '@/users/infrastructure/providers/hash-provider/bcryptjs-hash-provider';
import { userDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { BadRequestError } from '@/users/application/errors/bad-request-error';

describe('UsersController', () => {
  let sut: SingUpUseCase.UseCase;
  let repository: UserInMemoryRepository;
  let hashProvider: HashProvider;

  beforeEach(async () => {
    repository = new UserInMemoryRepository();
    hashProvider = new BCryptJSHashProvider();
    sut = new SingUpUseCase.UseCase(repository, hashProvider);
  });

  it('should create an user', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    const props = userDataBuilder({});
    const result = await sut.execute(
        {
            name: props.name,
            email: props.email,
            password: props.password,
        }
    )
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(spyInsert).toHaveBeenCalledTimes(1);
  });

  it('should not be able to register with same email twice', async () => {
    const props = userDataBuilder({ email: 'a@a.com' });
    await sut.execute(props)
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(ConflictError)
  });

  it('should throw error when name not provided', async () => {
    const props = Object.assign(userDataBuilder({}), { name: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  });

  it('should throw error when email not provided', async () => {
    const props = Object.assign(userDataBuilder({}), { email: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  });

  it('should throw error when password not provided', async () => {
    const props = Object.assign(userDataBuilder({}), { password: null })
    await expect(() => sut.execute(props)).rejects.toBeInstanceOf(BadRequestError)
  });
});
