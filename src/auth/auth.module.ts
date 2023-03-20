import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmRepository } from './auth.typeOrmRepository';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [{
        provide: 'AUTH_REPOSITORY',
        useClass: TypeOrmRepository
    }],
})
export class AuthModule { }


// providers: [{
//     provide: 'COLOR_REPOSITORY',
//     useClass: FsColorRepository
// }],