import { ClassValidatorFields } from '../../class-validator-fields';
import * as libClassValidator from 'class-validator';

class StubClassValidatorFields extends ClassValidatorFields<{field: string}> {}

describe('ClassValidatorFields unit tests', () => {
    it('should initialize error and validatedDate variables with null', () => {
        const sut = new StubClassValidatorFields();
        expect(sut.errors).toBeNull();
        expect(sut.validatedData).toBeNull();
    })

    it('should validate with errors', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
        spyValidateSync.mockReturnValueOnce([
            {
                property: 'field',
                constraints: { isRequired: 'test error' }
            }
        ])
        const sut = new StubClassValidatorFields();
        expect(sut.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(sut.validatedData).toBeNull();
        expect(sut.errors).toStrictEqual({ field: ['test error'] });
    })

    it('should validate with no errors', () => {
        const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
        spyValidateSync.mockReturnValueOnce([])
        const sut = new StubClassValidatorFields();
        expect(sut.validate({ field: 'value' })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(sut.validatedData).toStrictEqual({ field: 'value' });
        expect(sut.errors).toBeNull();
    })
})
