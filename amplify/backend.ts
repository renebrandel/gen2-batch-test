import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { PolicyStatement, Role } from 'aws-cdk-lib/aws-iam';
import { Stack } from 'aws-cdk-lib';
import { CfnTable, Table } from 'aws-cdk-lib/aws-dynamodb';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const ddbTable = backend.data.resources.tables["Todo"]
const ddbDataSourceRoleArn = backend.data.resources.cfnResources.cfnDataSources["TodoTable"].serviceRoleArn
if (ddbDataSourceRoleArn) {
  const ddbDataSourceRole = Role.fromRoleArn(Stack.of(backend.data), "DynamoDBServiceRoleArn", ddbDataSourceRoleArn)
  ddbDataSourceRole.addToPrincipalPolicy(new PolicyStatement({
    actions: ["dynamodb:BatchWriteItem"],
    resources: [ddbTable.tableArn]
  }))
}

// backend.data.resources.cfnResources.cfnGraphqlApi.environmentVariables = {
//   "TODO_TABLE": ddbTable.tableName
// }