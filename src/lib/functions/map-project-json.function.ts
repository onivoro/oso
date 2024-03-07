import { projectJsonName } from "../constants/paths.constant";
import { getProjects } from "./get-projects.function";
import { readFileAsJson } from "@onivoro/server-common";
import { buildProjectJson } from "./build-project-json.function";
import { TProject } from "../types/project.type";
import { writeFile } from "fs/promises";

export async function mapProjectJson(filter?: string) {
    const projects = await getProjects();

    const kvps = Object.entries(projects);

    return await Promise.all(kvps.map(async ([name, path]: [string, string]) => {
        const isAngular = path.includes('ui/');
        const pjjPath = `${path}/${projectJsonName}`;
        const ogPjj: TProject['projectJson'] = await readFileAsJson(pjjPath);
        await writeFile(pjjPath, buildProjectJson(ogPjj, name, path, isAngular));
    }));
}
