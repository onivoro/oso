import { Env } from "./env.enum";

export function env(): { [key in Env]: any } {
    return Object.values(Env).reduce((_, key) => {
        _[key] = process.env[key];

        return _;
    }, {} as any);
}