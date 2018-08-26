# Metabubbles

Making Generative Art in Angular Framework.

## Introduction

This project uses Angular framework to generate circles (Metabubbles). The Metabubbles are circles generated as result of collisions between a number of moving circles in background. Note all circles are moving in background there is no static circles as it was in original post.

The original project was written and explained by Tero Parviainen on his webpage https://teropa.info/blog/2016/02/28/metabubbles-generative-art-with-angular-2.html using Angular 2. Also, you could fork it from githup.com. The reason I do not fork it from there is that I was following the topic explanation from his webpage while I want to start fresh source code from scratch with new project supported on new Angular 6 and above. Also, I add a lot of comments in the source code to explain the source code and the modification I made to the source codes.

## How it Work

The project consists of single Angular module with main Angular component, another two Angular components and one Angular service.  The first component with class name ___CanvasComponent___ creates the screen canvas to control the display and generates the circles (Metabubbles) by calling the second component with class name ___CircleComponent___. The service with class name ___CirclesService___ does the heavy-weight lifting of calculation to maintain two arrays of circles. The first array _sourceCircles_[] creates random number of circles (bubbles) of different sizes and locations. The second array _circles_[] will be generated as result of collision between the circles in first array and creates the Metabubbles.
The Metabubbles changes their size as result of the distance between the centers of two collided circles. As the collided circles get away from each other the Metabubbles get vanished and disappeared from canvas.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
