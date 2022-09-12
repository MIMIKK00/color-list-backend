import { Module } from '@nestjs/common';
import { ColorListController } from './colorlist.controller';
import FsColorRepository from './colorlist.fsRepository';

@Module({
    imports: [],
    controllers: [ColorListController],
    providers: [{
        provide: 'COLOR_REPOSITORY',
        useClass: FsColorRepository
    }],
})
export class ColorListModule { }
