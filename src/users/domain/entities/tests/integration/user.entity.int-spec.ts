import { userDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserEntity, UserProps } from "../../user.entity"
import { EntityValidationError } from "@/shared/infrastructure/domain/errors/validation-error"


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

    describe('Update Method', () => {
        it('should throw an error when update an user with invalid name', () => {
            const entity = new UserEntity(userDataBuilder({}));
            expect(() => entity.update(null)).toThrowError(EntityValidationError);
            expect(() => entity.update('')).toThrowError(EntityValidationError);
            expect(() => entity.update(1 as any)).toThrowError(EntityValidationError);
            expect(() => entity.update('a'.repeat(256))).toThrowError(EntityValidationError);
        })

        it('should update a valid user', () => {
            expect.assertions(0);
            const props: UserProps = { ...userDataBuilder({}) };
            const entity = new UserEntity(props);
            entity.update('other name');
        })
    })

    describe('Update Password method', () => {
        it('should throw an error when update invalid user password', () => {
            const entity = new UserEntity(userDataBuilder({}));
            expect(() => entity.updatePassword(null)).toThrowError(EntityValidationError);
            expect(() => entity.updatePassword('')).toThrowError(EntityValidationError);
            expect(() => entity.updatePassword(1 as any)).toThrowError(EntityValidationError);
            expect(() => entity.updatePassword('a'.repeat(101))).toThrowError(EntityValidationError);
        })

        it('should update a valid user', () => {
            expect.assertions(0);
            const props: UserProps = { ...userDataBuilder({}) };
            const entity = new UserEntity(props);
            entity.updatePassword('validpassword');
        })
    })
})
