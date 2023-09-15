import { Entity } from '../../../entities/entity';
import { NotFoundError } from '../../../errors/not-found-error';
import { InMemoryRepository } from '../../in-memory-repository';

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
    let sut: StubInMemoryRepository;

    beforeEach(() => {
        sut = new StubInMemoryRepository();
    })

    it('should insert a new entity', async () => {
        const entity = new StubEntity({ name: 'test name', price: 50 });
        await sut.insert(entity);
        expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
    });

    it('should throw an error when entity was not found', async () => {
        await expect(sut.findById('fakeId')).rejects.toThrow(new NotFoundError('Entity not found'));
    });

    it('should find an entity by id', async () => {
        const entity = new StubEntity({ name: 'test name', price: 50 });
        await sut.insert(entity);
        const result = await sut.findById(entity.id);
        expect(entity.toJSON()).toStrictEqual(result.toJSON());
    });

    it('should return all entitys', async () => {
        const entity = new StubEntity({ name: 'test name', price: 50 });
        await sut.insert(entity);
        const result = await sut.findAll();
        expect([entity]).toStrictEqual(result);
    });

    it('should throw an error when entity was not found on update', async () => {
        const entity = new StubEntity({ name: 'test name', price: 50 });
        await expect(sut.update(entity)).rejects.toThrow(new NotFoundError('Entity not found'));
    });

    it('should update an entity by id', async () => {
        const entity = new StubEntity({ name: 'test name', price: 50 });
        await sut.insert(entity);
        const newEntity = new StubEntity({ name: 'new-name', price: 51 }, entity.id)
        await sut.update(newEntity);
        expect(sut.items[0]).toStrictEqual(newEntity);
    });

});
