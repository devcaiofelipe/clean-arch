import { validate as validateUIID } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
    prop1: string,
    prop2: number;
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
    it('Should set props and id', () => {
        const props = { prop1: 'value1', prop2: 15 }
        const entity = new StubEntity(props);
        expect(entity.props).toStrictEqual(props);
        expect(entity._id).not.toBeNull();
        expect(validateUIID(entity._id)).toBeTruthy();
    });

    it('Should accept a valid uuid', () => {
        const fakeUUID = '5fd28b0d-cc29-4c4e-b2d5-87db1f5d5cf5';
        const props = { prop1: 'value1', prop2: 15 }
        const entity = new StubEntity(props, fakeUUID);
        expect(entity.props).toStrictEqual(props);
        expect(entity._id).toEqual(fakeUUID);
        expect(validateUIID(entity._id)).toBeTruthy();
    });

    it('Should convert an entity to a JavaScript Object', () => {
        const fakeUUID = '5fd28b0d-cc29-4c4e-b2d5-87db1f5d5cf5';
        const props = { prop1: 'value1', prop2: 15 }
        const entity = new StubEntity(props, fakeUUID);
        expect(entity.toJSON()).toStrictEqual({
            fakeUUID,
            ...props,
        })
    });
});
