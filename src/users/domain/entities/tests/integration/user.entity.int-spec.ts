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

            props = {
                ...userDataBuilder({}),
                name: 1 as any,
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
        })

        it('should throw an error when creating an user with invalid email', () => {
            let props: UserProps = { ...userDataBuilder({}), email: null };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                email: '',
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                email: 'a'.repeat(101),
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                email: 1 as any,
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
        })

        it('should throw an error when creating an user with invalid password', () => {
            let props: UserProps = { ...userDataBuilder({}), password: null };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                password: '',
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                password: 'a'.repeat(101),
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                password: 1 as any,
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
        })

        it('should throw an error when creating an user with invalid createdAt', () => {
            let props: UserProps = { ...userDataBuilder({}), name: null };
            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                createdAt: '2023' as any,
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

            props = {
                ...userDataBuilder({}),
                createdAt: 1 as any,
            }

            expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
        })

        it('should a valid user', () => {
            expect.assertions(0);
            const props: UserProps = { ...userDataBuilder({}) };
            new UserEntity(props);
        })
    })
})
