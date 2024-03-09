import { TProjectParams } from "../types/project-params.type";
import { buildNodeProjectJson } from "./build-node-project-json.function";

export function buildAngularProjectJson(params: TProjectParams): Record<string, any> {
  const { name, projectType, directory, prefix = 'ngx', outputPath } = params;
  if (projectType === 'application') {
    return {
      name,
      prefix,
      $schema: "../../../node_modules/nx/schemas/project-schema.json",
      sourceRoot: `${directory}/src`,
      projectType,
      targets: (projectType === 'application')
        ? {
          "build": {
            "executor": "@angular-devkit/build-angular:browser",
            "outputs": ["{options.outputPath}"],
            "options": {
              outputPath: outputPath || `dist/${directory}`,
              "index": `${directory}/src/index.html`,
              "main": `${directory}/src/main.ts`,
              "polyfills": ["zone.js"],
              "tsConfig": `${directory}/tsconfig.app.json`,
              "inlineStyleLanguage": "scss",
              "assets": [
                `${directory}/src/favicon.ico`,
                `${directory}/src/assets`
              ],
              "styles": [`${directory}/src/styles.scss`],
              "scripts": []
            },
            "configurations": {
              "production": {
                "fileReplacements": [
                  {
                    "replace": `${directory}/src/environments/environment.ts`,
                    "with": `${directory}/src/environments/environment.prod.ts`
                  }
                ],
                "outputHashing": "all"
              },
              "staging": {
                "fileReplacements": [
                  {
                    "replace": `${directory}/src/environments/environment.ts`,
                    "with": `${directory}/src/environments/environment.stage.ts`
                  }
                ],
                "outputHashing": "all"
              },
              "development": {
                "buildOptimizer": false,
                "optimization": false,
                "vendorChunk": true,
                "extractLicenses": false,
                "sourceMap": true,
                "namedChunks": true
              }
            },
            "defaultConfiguration": "production"
          },
          "serve": {
            "executor": "@angular-devkit/build-angular:dev-server",
            "configurations": {
              "production": {
                "buildTarget": `${name}:build:production`
              },
              "development": {
                "buildTarget": `${name}:build:development`
              }
            },
            "defaultConfiguration": "development"
          },
          "extract-i18n": {
            "executor": "@angular-devkit/build-angular:extract-i18n",
            "options": {
              "buildTarget": `${name}:build`
            }
          }
        }
        : {},
      "tags": [],
    };
  } else {
    return { ...buildNodeProjectJson(params), prefix };
  }
}