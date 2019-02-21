import { GraphQLServer } from 'graphql-yoga'
import { makePrismaSchema } from 'nexus-prisma'
import * as path from 'path'
import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'
import { permissions } from './permissions'
import * as allTypes from './resolvers'

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: allTypes,

  // Configure the interface to Prisma
  prisma: {
    client: prisma,
    datamodelInfo,
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    contextType: 'utils.Context',
    sources: [
      {
        alias: 'utils',
        source: path.join(__dirname, './utils.ts'),
      },
    ],
  },
})

const server = new GraphQLServer({
  context: request => ({
    ...request,
    prisma,
  }),
  middlewares: [permissions],
  schema,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
