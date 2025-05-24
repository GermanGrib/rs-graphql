import { GraphQLSchema } from 'graphql/type/index.js';
import { RootQueryType } from './types/root-query.type.js';
import { MutationType } from './types/mutation.type.js';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
