import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ColorListModule } from './colorlist/colorlist.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ColorListModule, AuthModule, ConfigModule.forRoot({
    envFilePath: '.development.env', isGlobal: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
