import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ColorListModule } from './colorlist/colorlist.module';

@Module({
  imports: [ColorListModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
