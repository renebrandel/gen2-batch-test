import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  createManyTodos: a.mutation()
    .handler(a.handler.custom({
      entry: './createMany.js',
      dataSource: a.ref('Todo')
    }))
    .authorization(allow => allow.publicApiKey())
    .returns(a.ref('Todo').required().array())
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  },
});
