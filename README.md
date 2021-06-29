<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Initial Configs

<br />

### Docker

Start a postgres image and created a database called `task-management`

```bash
$ docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

<br />

## Postman Collections

You can import the collections from the folder `./postman`

<br />

## Installation

```bash
$ npm install
```

<br />

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
