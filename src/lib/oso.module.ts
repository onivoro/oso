import { Module } from '@nestjs/common';
import { MapJest } from './commands/map-jest.command';

@Module({
  providers: [MapJest],
  imports: [],
})
export class OsoModule { }
