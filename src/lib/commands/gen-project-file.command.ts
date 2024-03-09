import { Command, Option } from 'nest-commander';
import { AbstractCommand } from '@onivoro/server-build';
import { TProjectParams } from '../types/project-params.type';
import { genProjectFile } from '../functions/gen-project-file.function';

@Command({ name: GenProjectFile.name })
export class GenProjectFile extends AbstractCommand<TProjectParams> {

  constructor() {
    super(GenProjectFile.name);
  }

  async main(args: string[], params: TProjectParams): Promise<void> {
    await genProjectFile(params)
  }

  @Option({
    flags: '-p, --prefix [prefix]',
    description:
      'angular prefix',
    required: false
  })
  parsePrefix(val?: string) {
    return val;
  }

  @Option({
    flags: '-n, --name [name]',
    description:
      'project name',
    required: true
  })
  parseName(val?: string) {
    return val;
  }

  @Option({
    flags: '-d, --directory [directory]',
    description:
      'project root directory',
    required: true
  })
  parseDirectory(val?: string) {
    return val;
  }

  @Option({
    flags: '-o, --outputPath [outputPath]',
    description:
      'output path defaults to dist/${directory}',
    required: false
  })
  parseOutputPath(val?: string) {
    return val;
  }

  @Option({
    flags: '-t, --projectType [projectType]',
    description:
      '"application" | "library"',
    required: true,
    choices: [
      'application',
      'library',
    ]
  })
  parseProjectType(val?: string) {
    return val;
  }

  @Option({
    flags: '-f, --framework [framework]',
    description:
      '"angular" | "node"',
    required: true,
    choices: [
      'angular',
      'node',
    ]
  })
  parseFormwork(val?: string) {
    return val;
  }
}
