import { BCryptJSHashProvider } from "../../bcryptjs-hash-provider";

describe('BCryptJSHashProvider unit tests', () => {
    let sut: BCryptJSHashProvider;

    beforeEach(async () => {
        sut = new BCryptJSHashProvider()
    });

    it('should return an encrypted password', async () => {
        const password = 'TestPassword123'
        const hash = await sut.generateHash(password);
        expect(hash).toBeDefined();
    });

    it('should return false on invalid password and hash comparison', async () => {
        const password = 'TestPassword123'
        const hash = await sut.generateHash(password);
        const result = await sut.compareHash('fake', hash);
        expect(result).toBeFalsy();
    });

    it('should return true on valid password and hash comparison', async () => {
        const password = 'TestPassword123'
        const hash = await sut.generateHash(password);
        const result = await sut.compareHash(password, hash);
        expect(result).toBeTruthy();
    });
  });
