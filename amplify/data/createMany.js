import { util } from '@aws-appsync/utils';

export function request(ctx) {
  console.log(ctx)
  const todos = [
    util.dynamodb.toMapValues({ id: util.autoId(), content: 'todo1', createdAt: util.time.nowISO8601(), updatedAt: util.time.nowISO8601() }),
    util.dynamodb.toMapValues({ id: util.autoId(), content: 'todo2', createdAt: util.time.nowISO8601(), updatedAt: util.time.nowISO8601() }),
  ]
  
  return {
    operation: 'BatchPutItem',
    tables: {
      "Todo-avlejnbdi5cklprukkarg4cnmy-NONE": todos,
    },
  };
}

export function response(ctx) {
  if (ctx.error) {
    util.error(ctx.error.message, ctx.error.type);
  }
  return ctx.result.data["Todo-avlejnbdi5cklprukkarg4cnmy-NONE"];
}