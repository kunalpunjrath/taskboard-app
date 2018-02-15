
## Getting started


### 1. Clone repository

```sh
git clone https://github.com/howtographql/graphql-js
cd graphql-js
```

### 2. Deploy the Prisma database service
```sh
prisma deploy
```
OR
```sh
yarn prisma deploy
```

When prompted where (i.e. to which _cluster_) you want to deploy your service, choose any of the public clusters, e.g. `public-us1` or `public-eu1`. (If you have Docker installed, you can also deploy locally.)

Set the Prisma service endpoint

From the output of the previous command, copy the `HTTP` endpoint and paste it into `src/index.js` where it's used to instantiate the `Prisma` binding. You need to replace the current placeholder `__PRISMA_ENDPOINT`:

```js
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: "__PRISMA_ENDPOINT__",
      secret: 'mysecret123',
    }),
  }),
})
```

For example:

```js
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: "http://eu1.prisma.sh/public-scratchflier-618/taskboard-graphql-js/dev",
      secret: 'mysecret123',
    }),
  }),
})
```

### 3. Navigate into the `server` directory of the new project
cd my-app/server

### 4. Start the server
yarn start # the server is now running on http://localhost:4000

### 5. Open a new tab in the terminal and navigate back into my-app; then run the app
cd ..
yarn start

#### 6. Open http://localhost:4000 in your browser


## Documentation

### Commands

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.

### Server structure

![](https://imgur.com/95faUsa.png)

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>| 
| :--  | :--         |
| `├── .graphqlconfig.yml` | Configuration file based on [`graphql-config`](https://github.com/prisma/graphql-config) (e.g. used by GraphQL Playground).|
| `└── database ` (_directory_) | _Contains all files that are related to the Prisma database service_ |\
| `　　├── prisma.yml` | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `　　└── datamodel.graphql` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.js` | The entry point for your GraphQL server |
| `　　├── schema.graphql` | The **application schema** defining the API exposed to client applications  |
| `　　└── generated` (_directory_) | _Contains generated files_ |
| `　　　　└── prisma.grapghql` | The **Prisma database schema** defining the Prisma GraphQL API  |


