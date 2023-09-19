import { Entity } from '../../../entities/entity';
import { NotFoundError } from '../../../errors/not-found-error';
import { InMemoryRepository } from '../../in-memory-repository';
import { InMemorySearchableRepository } from '../../in-memory-repository-searchable';

type StubEntityProps = {
    name: string;
    price: number;
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
    sortableFields: string[] = ['name'];

    protected async applyFilter(items: StubEntity[], filter: string | null): Promise<StubEntity[]> {
        if (!filter) return items;
        return items.filter(item => item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }
}

describe('InMemoryRepository unit tests', () => {
    let sut: StubInMemorySearchableRepository;

    beforeEach(() => {
        sut = new StubInMemorySearchableRepository();
    })

    describe('applyFilter method', () => {
        it('', async () => {
            const entity = new StubEntity({ name: 'test name', price: 50 });
            await sut.insert(entity);
            expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON());
        });
    })
    describe('applySort method', () => {})
    describe('applyPaginate method', () => {})
    describe('search method', () => {})
});
