#! /usr/bin/env node

import { CommandFactory } from 'nest-commander';

import { OsoModule } from './lib/oso.module';

async function bootstrap() {
    await CommandFactory.run(OsoModule, ['warn', 'error']);
}

void bootstrap();

const mod = OsoModule;

export default mod;
