import { SearchParams } from "../../searchable-repository-contracts";

describe('Searchable Repository unit tests', () => {
    describe('SearchParams tests', () => {
        it('page prop', () => {
            const sut = new SearchParams();
            expect(sut.page).toBe(1);
            [
                { page: null, expected: 1 },
                { page: undefined, expected: 1 },
                { page: '', expected: 1 },
                { page: 'test', expected: 1 },
                { page: 0, expected: 1 },
                { page: -1, expected: 1 },
                { page: 1.24, expected: 1 },
                { page: true, expected: 1 },
                { page: false, expected: 1 },
                { page: {}, expected: 1 },
                { page: 1, expected: 1 },
                { page: 2, expected: 2 },
            ].forEach((item) => {
                expect(new SearchParams({ page: item.page as any }).page).toBe(item.expected)
            })
        })

        it('perPage prop', () => {
            const sut = new SearchParams();
            expect(sut.perPage).toBe(15);
            [
                { perPage: null, expected: 15 },
                { perPage: undefined, expected: 15 },
                { perPage: '', expected: 15 },
                { perPage: 'test', expected: 15 },
                { perPage: 0, expected: 15 },
                { perPage: -1, expected: 15 },
                { perPage: 1.24, expected: 15 },
                { perPage: true, expected: 15 },
                { perPage: false, expected: 15 },
                { perPage: {}, expected: 15 },
                { perPage: 1, expected: 1 },
                { perPage: 2, expected: 2 },
                { perPage: 25, expected: 25 },
            ].forEach((item) => {
                expect(new SearchParams({ perPage: item.perPage as any }).perPage).toBe(item.expected)
            })
        })

        it('sort prop', () => {
          const sut = new SearchParams();
          expect(sut.sort).toBeNull();
          [
              { sort: null, expected: null },
              { sort: undefined, expected: null },
              { sort: '', expected: null },
              { sort: 'test', expected: 'test' },
              { sort: 0, expected: '0' },
          ].forEach((item) => {
              expect(new SearchParams({ sort: item.sort as any }).sort).toBe(item.expected)
          })
        })

        it('sortDir prop', () => {
          let sut = new SearchParams({ sort: null });
          expect(sut.sortDir).toBeNull();
          sut = new SearchParams({ sort: undefined });
          expect(sut.sortDir).toBeNull();
          sut = new SearchParams({ sort: '' });
          expect(sut.sortDir).toBeNull();

          [
              { sortDir: null, expected: 'desc' },
              { sortDir: undefined, expected: 'desc' },
              { sortDir: '', expected: 'desc' },
              { sortDir: 'test', expected: 'desc' },
              { sortDir: 0, expected: 'desc' },
              { sortDir: 'asc', expected: 'asc' },
              { sortDir: 'desc', expected: 'desc' },
              { sortDir: 'ASC' , expected: 'asc' },
              { sortDir: 'DESC', expected: 'desc' },
          ].forEach((item) => {
              expect(new SearchParams({ sort: 'field', sortDir: item.sortDir as any }).sortDir).toBe(item.expected)
          })
        })

        it('filter prop', () => {
          const sut = new SearchParams();
          expect(sut.filter).toBeNull();
          [
              { filter: null, expected: null },
              { filter: undefined, expected: null },
              { filter: '', expected: null },
              { filter: 'test', expected: 'test' },
              { filter: 0, expected: '0' },
              { filter: -1, expected: '-1' },
              { filter: 1.24, expected: '1.24' },
              { filter: true, expected: 'true' },
              { filter: false, expected: 'false' },,
          ].forEach((item) => {
              expect(new SearchParams({ filter: item.filter as any }).filter).toBe(item.expected)
          })
      })
    })
});
