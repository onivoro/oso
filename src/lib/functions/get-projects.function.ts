import { getWorkspace } from "./get-workspace.function";

export async function getProjects() {
    const { projects } = await getWorkspace();

    return projects;
}
