import { buildJestConfigTs } from "./build-jest-config-ts.function";
import { writeFile } from "fs/promises";
import { jestConfigTsName } from "../constants/paths.constant";
import { getProjects } from "./get-projects.function";

export async function mapJest(filter?: string) {
    const projects = await getProjects();

    const kvps = Object.entries(projects);

    return await Promise.all(kvps.map(async ([name, path]: [string, string]) => {
        const isAngular = path.includes('ui/');

        await writeFile(`${path}/${jestConfigTsName}`, buildJestConfigTs(name, path, isAngular));
    }));
}
