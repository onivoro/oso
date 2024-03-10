import { TProjectParams } from "../types/project-params.type";

export function buildNodeProjectJson(params: TProjectParams): Record<string, any> {
  const { name, projectType, directory } = params;

  const outputPath = params.outputPath || `dist/${directory}`;
  return {
    name,
    $schema: "../../../node_modules/nx/schemas/project-schema.json",
    sourceRoot: `${directory}/src`,
    projectType,
    targets: (projectType === 'application')
      ? {
        "build": {
          "executor": "@nx/webpack:webpack",
          "outputs": ["{options.outputPath}"],
          "defaultConfiguration": "production",
          "options": {
            "target": "node",
            "compiler": "tsc",
            outputPath,
            "main": `${directory}/src/main.ts`,
            "tsConfig": `${directory}/tsconfig.app.json`,
            "generatePackageJson": true,
            "assets": [`${directory}/src/assets`],
            "isolatedConfig": true,
            "webpackConfig": `${directory}/webpack.config.js`
          },
          "configurations": {
            "development": {},
            "production": {}
          }
        },
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