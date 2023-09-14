import { userDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/users/domain/errors/validation-errors"

describe('User Entity integration tests', () => {
    describe('Constructor method', () => {
        it('should throw an error when creating an user with invalid name', () => {
            let props: UserProps = { ...userDataBuilder({}), name: null };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                name: '',
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                name: 'a'.repeat(256),
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
        })

    })
})
