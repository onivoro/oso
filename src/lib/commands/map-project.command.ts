import { Command, CommandRunner, Option } from 'nest-commander';
import { mapProjectJson } from '../functions/map-project-json.function';

type IParams = any;

@Command({ name: MapProject.name })
export class MapProject extends CommandRunner {
  async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    await this.main(passedParams, options);
  }
  constructor() {
    super();
  }

  async main(
    _args: string[],
    { }: IParams
  ): Promise<void> {
    try {
      await mapProjectJson();
    } catch (error) {
      console.log('ERRRRRRR', error);
    }
  }

  @Option({
    flags: '-x, --prefix [prefix]',
    description:
      'common prefix of the cluster and service',
    required: false
  })
  parsePrefix(val?: string) {
    return val;
  }
}
