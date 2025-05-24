import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/index.js';
import { UUIDType } from './uuid.js';
import { MemberType } from './member.type.js';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
