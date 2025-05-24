import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql/index.js';
import { MemberType, MemberTypeIdEnum } from './member.type.js';
import { UserType } from './user.type.js';
import { UUIDType } from './uuid.js';
import { PostType } from './post.type.js';
import { ProfileType } from './profile.type.js';

export const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: (_, __, { prisma }) => prisma.memberType.findMany(),
    },
    memberType: {
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdEnum),
        },
      },
      type: MemberType,
      resolve: (_, { id }, { prisma }) => prisma.memberType.findUnique({ where: { id } }),
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (_, __, { prisma }) => prisma.user.findMany(),
    },
    user: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: UserType,
      resolve: (_, { id }, { prisma }) => prisma.user.findUnique({ where: { id } }),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (_, __, { prisma }) => prisma.post.findMany(),
    },
    post: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: PostType,
      resolve: (_, { id }, { prisma }) => prisma.post.findUnique({ where: { id } }),
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: (_, __, { prisma }) => prisma.profile.findMany(),
    },
    profile: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: ProfileType,
      resolve: (_, { id }, { prisma }) => prisma.profile.findUnique({ where: { id } }),
    },
  }),
});
