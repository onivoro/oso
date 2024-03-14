import { Module } from '@nestjs/common';
import { ServerBuildWithS3Module } from '@onivoro/server-build';
import { moduleFactory } from '@onivoro/server-common';

import { env } from './config/env.function';
import { GenProjectFile } from './commands/gen-project-file.command';
import { MapEnvFileForTf } from './commands/map-env-file-for-tf.command';

@Module({})
export class OsoModule {
  static configure() {
    return moduleFactory({
      module: OsoModule,
      providers: [GenProjectFile, MapEnvFileForTf],
      imports: [
        ServerBuildWithS3Module.configure(env()),
      ],
    });
  }
}
