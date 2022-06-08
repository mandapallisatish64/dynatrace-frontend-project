# Software Engineer - Interview project

In order to assess your skills as a software engineering candidate, we would like you to complete a sample web application using the following guide, design document, REST API, client, and simulated infrastructure. Through this assignment, you will be assuming the temporary role of one of our software engineers. Be prepared to present the application to us and explain your code and design choices.

## Overview

The Dynatrace Sales Leads application is a small Single Page Application designed to retrieve, display, and add sales leads. A sales lead is a record of a possible sale of a product to a potential customer or new feature to a current customer. Customers can be large companies with multiple units, so multiple salespeople may have leads with different divisions of the same company.

The application comprises 3 components, the frontend client, backend server, and a database. Your job is to complete the implementation of the application, including:

- resolving any infrastructure issues preventing the application from working in the simulated "production" mode (see below).
- complete any missing components in the application.
- refactor any code that is inefficient, exhibits low maintainability, or doesn't respect separation of concerns.

## Getting started

For the specific requirements for the component of the application you have selected to implement, see the `README.md` file inside the folder for that component (`client` or `server`).

## Next steps

Upon completion of the project, your next task will be to present your project to a team of engineers and Leaders. Think of this is a sprint demo, the team will expect you to lead this session. Take the given time to show your application, your code, and anything else you deem necessary.

## Development environment configuration and setup

#### POSIX-like systems

- ensure you have `docker` and `docker-compose` installed on your Mac or Linux distribution.
- ensure you have `npm 6+`, `node 14 (LTS)` installed.
- ensure you have `git` installed.

#### Windows (using Windows Subsystem for Linux)

- install Windows 10, version 2004 or higher.
- enable WSL 2 feature on Windows (https://docs.microsoft.com/en-us/windows/wsl/install-win10).
- install the Linux kernel update package (https://docs.microsoft.com/windows/wsl/wsl2-kernel).
- download Docker Desktop (https://hub.docker.com/editions/community/docker-ce-desktop-windows/).
- enable WSL2 and WSL integration engine in Docker Desktop (https://docs.docker.com/docker-for-windows/wsl/).
- ensure you have `npm 6+`, `node 14 (LTS)` installed in your WSL environment.
- ensure you have `git` installed.

## Install

Run `npm run install:all` to install the dependencies for root, client, and server.

## Development mode

Run `npm start` to start client, server, and the database. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Ensure you are running Docker or else this will fail!

## Build (production)

Run `docker-compose build` to test and build the project. This will generate the required docker images (client, server, database) in order to run the full-stack application in a simulated production mode.

## Running (production)

Run `docker-compose up` to run the application in a simulated production mode.

## Help

If you run into any issues during the project, please reach out to [Evan Bradley](mailto:evan.bradley@dynatrace.com) or [Cody Potter](mailto:cody.potter@dynatrace.com).
