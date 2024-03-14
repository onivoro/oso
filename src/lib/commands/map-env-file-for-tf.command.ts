import { Command, Option } from 'nest-commander';
import { AbstractCommand, mapDotEnvFileForTerraform } from '@onivoro/server-build';

type IParams = { input: string };

@Command({ name: MapEnvFileForTf.name })
export class MapEnvFileForTf extends AbstractCommand<IParams> {

  constructor() {
    super(MapEnvFileForTf.name);
  }

  async main(args: string[], { input }: any): Promise<void> {
    process.stdout.write(await mapDotEnvFileForTerraform(input));
  }

  @Option({
    flags: '-i, --input [input]',
    description:
      'relative path of the input .env file',
    required: false
  })
  parseInput(val?: string) {
    return val;
  }
}
