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
        it('should no filter items when filter param is null', async () => {
            const items = [new StubEntity({ name: 'name value', price: 50 })];
            const spyFilterMethod = jest.spyOn(items, 'filter')
            const itemsFiltered = await sut['applyFilter'](items, null)
            expect(itemsFiltered).toStrictEqual(items);
            expect(spyFilterMethod).not.toHaveBeenCalled();
        });

        it('should filter using filter param', async () => {
            const items = [
                new StubEntity({ name: 'test', price: 50 }),
                new StubEntity({ name: 'TEST', price: 50 }),
                new StubEntity({ name: 'fake', price: 50 }),
            ];
            const spyFilterMethod = jest.spyOn(items, 'filter')
            let itemsFiltered = await sut['applyFilter'](items, 'TEST')
            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(1);

            itemsFiltered = await sut['applyFilter'](items, 'test')
            expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
            expect(spyFilterMethod).toHaveBeenCalledTimes(2);

            itemsFiltered = await sut['applyFilter'](items, 'no-filter')
            expect(itemsFiltered).toHaveLength(0);
            expect(spyFilterMethod).toHaveBeenCalledTimes(3);
        });
    })
    describe('applySort method', () => {})
    describe('applyPaginate method', () => {})
    describe('search method', () => {})
});
