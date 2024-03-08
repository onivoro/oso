#! /usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { OsoModule } from './lib/oso.module';
import { loadDotEnv } from '@onivoro/server-parameterization';
import { OSO_ENV } from './lib/config/oso-env.constant';
import { existsSync } from 'fs';

async function bootstrap() {
    const envFile = process.env[OSO_ENV] || '.env';

    console.log('\n');

    if (existsSync(envFile)) {
        console.log(`USING FILE "${envFile}" FOR ENVIRONMENT VARIABLES`);
    } else {
        console.log(`SET "${OSO_ENV}" TO LOAD ENVIRONMENT VARIABLES`);
    }

    console.log('\n');

    loadDotEnv(process.env[OSO_ENV]);

    await CommandFactory.run(OsoModule, ['warn', 'error']);
}

void bootstrap();

export default OsoModule;
