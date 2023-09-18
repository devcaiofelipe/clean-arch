import { SearchParams } from "../../searchable-repository-contracts";

describe('Searchable Repository unit tests', () => {
    describe('SearchParams tests', () => {
        it('page prop', () => {
            const sut = new SearchParams();
            expect(sut.page).toBe(1);
            const params = [
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
            const params = [
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
    })
});
