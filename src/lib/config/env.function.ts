import { Env } from "./env.enum";

export function env(): { [key in Env]: any } {
    // return Object.values(Env).reduce((_, key) => {
    //     _[key] = process.env[key];

    //     return _;
    // }, {} as any);

    const resolved = {
        AWS_ACCESS_KEY_ID: process.env['AWS_ACCESS_KEY_ID'],
        AWS_BUCKET: process.env['AWS_BUCKET'],
        AWS_REGION: process.env['AWS_REGION'],
        AWS_SECRET_ACCESS_KEY: process.env['AWS_SECRET_ACCESS_KEY'],
    };

    return resolved;
}