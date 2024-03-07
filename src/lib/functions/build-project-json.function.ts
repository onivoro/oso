import { TProject } from "../types/project.type";

export function buildProjectJson(ogPjj: TProject['projectJson'], name: string, path: string, isAngular?: boolean) {
  const prefix = ogPjj.prefix;
  if (isAngular) {
    if (ogPjj.projectType === 'application') {
      return `{
"name": "${name}",
"$schema": "../../../node_modules/nx/schemas/project-schema.json",
"projectType": "application",
"prefix": "${prefix}",
"sourceRoot": "${path}/src",
"tags": [],
"targets": {
  "build": {
    "executor": "@angular-devkit/build-angular:browser",
    "outputs": ["{options.outputPath}"],
    "options": {
      "outputPath": "dist/${path}",
      "index": "${path}/src/index.html",
      "main": "${path}/src/main.ts",
      "polyfills": ["zone.js"],
      "tsConfig": "${path}/tsconfig.app.json",
      "inlineStyleLanguage": "scss",
      "assets": [
        "${path}/src/favicon.ico",
        "${path}/src/assets"
      ],
      "styles": ["${path}/src/styles.scss"],
      "scripts": []
    },
    "configurations": {
      "production": {
        "fileReplacements": [
          {
            "replace": "${path}/src/environments/environment.ts",
            "with": "${path}/src/environments/environment.prod.ts"
          }
        ],
        "outputHashing": "all"
      },
      "staging": {
        "fileReplacements": [
          {
            "replace": "${path}/src/environments/environment.ts",
            "with": "${path}/src/environments/environment.staging.ts"
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
        "buildTarget": "browser:build:production"
      },
      "development": {
        "buildTarget": "browser:build:development"
      }
    },
    "defaultConfiguration": "development"
  },
  "extract-i18n": {
    "executor": "@angular-devkit/build-angular:extract-i18n",
    "options": {
      "buildTarget": "browser:build"
    }
  }
}
}`;
    } else {
      return `{
  "name": "${name}",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "${path}/src",
  "prefix": "${prefix}",
  "tags": [],
  "projectType": "library",
  "targets": {}
}`;
    }
  } else {
    if (ogPjj.projectType === 'application') {
      return `{
"name": "${name}",
"$schema": "../../../node_modules/nx/schemas/project-schema.json",
"sourceRoot": "${path}/src",
"projectType": "application",
"targets": {
  "serve": {
    "executor": "@nx/js:node",
    "defaultConfiguration": "development",
    "options": {
      "buildTarget": "${name}:build"
    },
    "configurations": {
      "development": {
        "buildTarget": "${name}:build:development"
      },
      "production": {
        "buildTarget": "${name}:build:production"
      }
    }
  }
},
"tags": []
}`;
    } else {
      return `{
  "name": "${name}",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "${path}/src",
  "projectType": "library",
  "targets": {},
  "tags": []
}`
    }
  }
}