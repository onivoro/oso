import { TProjectParams } from "../types/project-params.type";

export function buildNodeProjectJson(params: TProjectParams): Record<string, any> {
  const { name, projectType, directory } = params;

  return {
    name,
    $schema: "../../../node_modules/nx/schemas/project-schema.json",
    sourceRoot: `${directory}/src`,
    projectType,
    targets: (projectType === 'application')
      ? {
        "serve": {
          "executor": "@nx/js:node",
          "defaultConfiguration": "development",
          "options": {
            "buildTarget": `${name}:build`
          },
          "configurations": {
            "development": {
              "buildTarget": `${name}:build:development`
            },
            "production": {
              "buildTarget": `${name}:build:production`
            }
          }
        }
      }
      : {},
    "tags": []
  };
}