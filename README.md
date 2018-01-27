# rest-api-node-typescript

[![CircleCI](https://circleci.com/gh/mariocoski/rest-api-node-typescript.svg?style=svg)](https://circleci.com/gh/mariocoski/rest-api-node-typescript)
[![codecov](https://codecov.io/gh/mariocoski/rest-api-node-typescript/branch/master/graph/badge.svg)](https://codecov.io/gh/mariocoski/rest-api-node-typescript)
RESTful API with node, express, typescript and jest!

## API with following requirements in mind:
1. Handle CRUD (create, read, update, delete) on resources (posts, comments, users, roles, permissions)
2. Access to the API will be secured with JWT auth + RBAC (Role-based access control)
3. Data will be returned in JSON format
4. All requests will be logged to the console

It is a great starting point for blogging platform.

## Technologies used:
- Typescript
- Express.js
- Sequelize
- JWT
- jest
- codecov

## Setup
1. Install dependencies
```
npm install or yarn
```
2. Build your api
```
npm run build or yarn build
```
3. Start your api
```
npm run start or yarn start
```

## Development
```
npm run test or yarn test

//watch mode
npm run test:watch or yarn test:watch
```

## Credits
Big thanks to Ryan Smith and his introduction to 3 layer architecture [https://medium.com/@ryansmith/3la-introduction-b45219e323d8]
