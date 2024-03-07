import { readFileAsJson } from "@onivoro/server-common";

export async function getWorkspace() {
    return await readFileAsJson('workspace.json');
}