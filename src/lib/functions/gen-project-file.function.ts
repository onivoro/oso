import { writeFileAsJson } from '@onivoro/server-disk';
import { buildNodeProjectJson } from '../functions/build-node-project-json.function';
import { TProjectParams } from '../types/project-params.type';
import { buildAngularProjectJson } from './build-angular-project-json.function';

export async function genProjectFile(params: TProjectParams): Promise<void> {
  const { directory, framework } = params;
  await writeFileAsJson(`${directory}/project.json`, framework === 'nest'
  ? buildNodeProjectJson(params)
  : buildAngularProjectJson(params));
}