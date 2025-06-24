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
      resolve: (_, __, { prisma, loaders }) => {
        return prisma.memberType.findMany().then((memberTypes) => {
          memberTypes.forEach((mt) => loaders.memberType.prime(mt.id, mt));
          return memberTypes;
        });
      },
    },
    memberType: {
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdEnum),
        },
      },
      type: MemberType,
      resolve: (_, { id }, { loaders }) => loaders.memberType.load(id),
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (_, __, { prisma, loaders }) => {
        const users = await prisma.user.findMany();
        users.forEach((user) => loaders.user.prime(user.id, user));
        return users;
      },
    },
    user: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: UserType,
      resolve: async (_, { id }, { loaders }) => {
        try {
          return await loaders.user.load(id);
        } catch {
          return null;
        }
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (_, __, { prisma }) => prisma.post.findMany(),
    },
    post: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: PostType,
      resolve: async (_, { id }, { loaders }) => {
        try {
          return await loaders.post.load(id);
        } catch {
          return null;
        }
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
      resolve: (_, __, { prisma }) =>
        prisma.profile.findMany({
          include: { memberType: true },
        }),
    },
    profile: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: ProfileType,
      resolve: async (_, { id }, { loaders }) => {
        try {
          return await loaders.profile.load(id);
        } catch {
          return null;
        }
      },
    },
  }),
});
