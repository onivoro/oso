import { Module } from '@nestjs/common';
import { MapJest } from './commands/map-jest.command';
import { ServerBuildWithS3Module } from '@onivoro/server-build';
import { env } from './config/env.function';

@Module({
  providers: [MapJest],
  imports: [
    ServerBuildWithS3Module.configure(env())
  ],
})
export class OsoModule { }
