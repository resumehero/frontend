# Ai resume

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.8.

## Config

You need a config files to run this project.
Please add file `token.client.json` into `src/assets/`.
Project has two scripts for converting it into base64 format and vice verse. \
Run `npm run config:encode` to convert json content of config file into base64. \
Run `npm run config:decode` to convert base64 content of config file into json.

The fields of the decoded `token.client.json` file are described in the [IAppConfig](src/app/misc/constants/app-config.constant.ts) interface.

## Development server

Run `npm run start:client` for a dev server for client application. Navigate to `http://localhost:64848/`. The app will automatically reload if you change any of the source files. \
Run `npm run start:client:ssl` for a dev server with ssl for client application. Navigate to `https://localhost:64848/`. The app will automatically reload if you change any of the source files.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build:client` to build the client project. The build artifacts will be stored in the `dist/client` directory. \
Run `npm run build:all` to build all projects. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Deployment script

You can run `npm run deploy:dev` to build and deploy code to dev or stage instance.
You need to add some configs for successful deployment (`.env.dev`).

Example of `.env.dev`
```shell
INSTANCE_USERNAME=
INSTANCE_KEY=
INSTANCE_HOST=
INSTANCE_DEPLOY_PATH=
```
or
```shell
INSTANCE_USERNAME=
INSTANCE_PASSWORD=
INSTANCE_HOST=
INSTANCE_DEPLOY_PATH=
```
