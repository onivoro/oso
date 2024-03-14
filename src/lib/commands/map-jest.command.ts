import { Command, CommandRunner, Option } from 'nest-commander';
import { mapJest } from '../functions/map-jest.function';

type IParams = any;

@Command({ name: MapJest.name })
export class MapJest extends CommandRunner {
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
      await mapJest();
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
