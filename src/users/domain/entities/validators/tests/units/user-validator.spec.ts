import { userDataBuilder } from "@/users/domain/testing/helpers/user-data-builder";
import { UserRules, UserValidator, UserValidatorFactory } from "../../user-validator"

let sut: UserValidator;

describe('UserValidator unit tests', () => {
    beforeEach(() => {
        sut = UserValidatorFactory.create();
    })

    it('valid cases for use validator class field', () => {
        const props = userDataBuilder({});
        const isValid = sut.validate(props);
        expect(isValid).toBeTruthy();
        expect(sut.validatedData).toStrictEqual(new UserRules(props));
    })

    describe('Name Field', () => {
        it('invalidation cases for name field', () => {
            let isValid = sut.validate(null as any);
            expect(isValid).toBeFalsy();
            expect(sut.errors['name']).toStrictEqual([
                'name should not be empty',
                'name must be a string',
                'name must be shorter than or equal to 255 characters'
            ])

            isValid = sut.validate({ ...userDataBuilder({}), name: '' as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors['name']).toStrictEqual([
                'name should not be empty',
            ])

            isValid = sut.validate({ ...userDataBuilder({}), name: 1 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors['name']).toStrictEqual([
                'name must be a string',
                'name must be shorter than or equal to 255 characters',
            ])

            isValid = sut.validate({ ...userDataBuilder({}), name: 'a'.repeat(256) });
            expect(isValid).toBeFalsy();
            expect(sut.errors['name']).toStrictEqual([
                'name must be shorter than or equal to 255 characters',
            ])
        })
    })

    describe('Email Field', () => {
        it('invalidation cases for email field', () => {
            let isValid = sut.validate(null as any);
            expect(isValid).toBeFalsy();
            expect(sut.errors['email']).toStrictEqual([
                'email should not be empty',
                'email must be an email',
                'email must be shorter than or equal to 255 characters'
            ])

            isValid = sut.validate({ ...userDataBuilder({}), email: '' as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors['email']).toStrictEqual([
                'email should not be empty',
                'email must be an email',
            ])

            isValid = sut.validate({ ...userDataBuilder({}), email: 1 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors['email']).toStrictEqual([
                'email must be an email',
                'email must be shorter than or equal to 255 characters',
            ])

            isValid = sut.validate({ ...userDataBuilder({}), email: 'a'.repeat(256) });
            expect(isValid).toBeFalsy();
            expect(sut.errors['email']).toStrictEqual([
                'email must be an email',
                'email must be shorter than or equal to 255 characters',
            ])
        })
    })

    describe('Password Field', () => {
        it('invalidation cases for password field', () => {
            let isValid = sut.validate(null as any);
            expect(isValid).toBeFalsy();
            expect(sut.errors['password']).toStrictEqual([
                'password should not be empty',
                'password must be a string',
                'password must be shorter than or equal to 100 characters'
            ])

            isValid = sut.validate({ ...userDataBuilder({}), password: '' as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors['password']).toStrictEqual([
                'password should not be empty',
            ])

            isValid = sut.validate({ ...userDataBuilder({}), password: 1 as any });
            expect(isValid).toBeFalsy();
            expect(sut.errors['password']).toStrictEqual([
                'password must be a string',
                'password must be shorter than or equal to 100 characters',
            ])

            isValid = sut.validate({ ...userDataBuilder({}), password: 'a'.repeat(101) });
            expect(isValid).toBeFalsy();
            expect(sut.errors['password']).toStrictEqual([
                'password must be shorter than or equal to 100 characters',
            ])
        })
    })
})
