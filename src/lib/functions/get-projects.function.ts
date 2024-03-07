import { execSync } from "child_process";
import { getWorkspace } from "./get-workspace.function";
import { readFileAsJson } from "@onivoro/server-common";

export async function getProjects() {
    try {
        const { projects } = await getWorkspace();

        return projects;
    } catch (e: any) {
        const projectJsonPaths = execSync(`git grep --name-only '' | grep project.json`).toString().split('\n').filter(Boolean);

        const namesAndPaths = await Promise.all(projectJsonPaths.map(async (_) => {
            const path = _.replace('/project.json', '');
            const name = (await readFileAsJson(_)).name;

            return { path, name };
        }));

        return namesAndPaths.reduce((acc, { path, name }) => {
            acc[name] = path;
            return acc;
        }, {});
    }
}
