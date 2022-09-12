import { Module } from '@nestjs/common';
import { ColorListModule } from './colorlist/colorlist.module';

@Module({
  imports: [ColorListModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
