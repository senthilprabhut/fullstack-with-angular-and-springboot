# Todo
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.9.

## Docker Container

Execute the below commands to build a docker container and run it locally
```shell
docker rm -f todo-ui
docker rmi -f senthilprabhut/todo-ui:10

docker build -t senthilprabhut/todo-ui:10 .
docker run -d -p 4200:80 --name todo-ui senthilprabhut/todo-ui:10 
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run webdriver-manager-start` to start the webdriver for firefox.

Then Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

