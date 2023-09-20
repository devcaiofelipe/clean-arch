import { userDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { UserInMemoryRepository } from "../../user-in-memory.repository";
import { UserEntity } from "@/users/domain/entities/user.entity";
import { NotFoundError } from "@/shared/infrastructure/domain/errors/not-found-error";
import { ConflictError } from "@/shared/infrastructure/domain/errors/conflict-error";

describe('InMemoryRepository unit tests', () => {
    let sut: UserInMemoryRepository;

    beforeEach(() => {
        sut = new UserInMemoryRepository();
    })

    it('should throw error when not found - findByEmail method', async () => {
        await expect(sut.findByEmail('2@2.com')).rejects.toThrow(new NotFoundError('Entity not found using email 2@2.com'))
    });

    it('should find an entity by email - findByEmail method', async () => {
        const entity = new UserEntity(userDataBuilder({}))
        await sut.insert(entity);
        const result = await sut.findByEmail(entity.email);
        expect(entity.toJSON()).toStrictEqual(result.toJSON());
    });

    it('should throw error when not found - emailExists method', async () => {
        const entity = new UserEntity(userDataBuilder({}))
        await sut.insert(entity);
        await expect(sut.emailExists(entity.email)).rejects.toThrow(new ConflictError('Email address already used'))
    });

    it('should throw error when not found - emailExists method', async () => {
        expect.assertions(0);
        await sut.emailExists('a@a.com');
    });

    it('should not filter items when filter object is null', async () => {
        const entity = new UserEntity(userDataBuilder({}))
        await sut.insert(entity);
        const result = await sut.findAll();
        const spyFilter = jest.spyOn(result, 'filter')
        const itemsFiltered = await sut['applyFilter'](result, null);
        expect(spyFilter).not.toHaveBeenCalled();
        expect(itemsFiltered).toStrictEqual(result);
    });

    it('should filter name using filter param', async () => {
        const items = [
            new UserEntity(userDataBuilder({ name: 'Test' })),
            new UserEntity(userDataBuilder({ name: 'TEST' })),
            new UserEntity(userDataBuilder({ name: 'fake' }))
        ]
        const spyFilter = jest.spyOn(items, 'filter')
        const itemsFiltered = await sut['applyFilter'](items, 'TEST');
        expect(spyFilter).toHaveBeenCalledTimes(1);
        expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
    });

    it('should sort by createdAt when sort param is null', async () => {
        const createdAt = new Date();
        const items = [
            new UserEntity(userDataBuilder({ name: 'Test', createdAt })),
            new UserEntity(userDataBuilder({ name: 'TEST', createdAt: new Date(createdAt.getTime() + 10) })),
            new UserEntity(userDataBuilder({ name: 'fake', createdAt: new Date(createdAt.getTime() + 20) }))
        ]
        const itemsSorted = await sut['applySort'](items, null, null);
        expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    });

    it('should sort by name field', async () => {
        const items = [
            new UserEntity(userDataBuilder({ name: 'c' })),
            new UserEntity(userDataBuilder({ name: 'd' })),
            new UserEntity(userDataBuilder({ name: 'a' }))
        ]
        let itemsSorted = await sut['applySort'](items, 'name', 'asc');
        expect(itemsSorted).toStrictEqual([items[2], items[0], items[1]]);

        itemsSorted = await sut['applySort'](items, 'name', null);
        expect(itemsSorted).toStrictEqual([items[1], items[0], items[2]]);
    });
})
