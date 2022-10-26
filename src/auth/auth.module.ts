import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FakeAuthRepository } from './auth.fakeRepository';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [{
        provide: 'AUTH_REPOSITORY',
        useClass: FakeAuthRepository
    }],
})
export class AuthModule { }


// providers: [{
//     provide: 'COLOR_REPOSITORY',
//     useClass: FsColorRepository
// }],