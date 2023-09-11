import { Injectable } from '@nestjs/common';
import { EnvConfig } from './env-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements EnvConfig {
    constructor(private configService: ConfigService) {}

    getAppPort(): number {
        console.log(Number(this.configService.get<number>('PORT')));
        return Number(this.configService.get<number>('PORT'));
    }

    getNodeEnv(): string {
        console.log('aaaa', this.configService.get<string>('NODE_ENV'));
        return this.configService.get<string>('NODE_ENV');
    }
}
