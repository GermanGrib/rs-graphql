import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { UUIDType } from './uuid.js';
import { ChangeUserInputType, CreateUserInputType, UserType } from './user.type.js';
import {
  ChangeProfileInputType,
  CreateProfileInputType,
  ProfileType,
} from './profile.type.js';
import { ChangePostInputType, CreatePostInputType, PostType } from './post.type.js';

export const MutationType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInputType),
        },
      },
      type: new GraphQLNonNull(UserType),
      resolve: (_, args, context) => context.prisma.user.create({ data: args.dto }),
    },
    createProfile: {
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInputType),
        },
      },
      type: new GraphQLNonNull(ProfileType),
      resolve: (_, args, context) => context.prisma.profile.create({ data: args.dto }),
    },
    createPost: {
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInputType),
        },
      },
      type: new GraphQLNonNull(PostType),
      resolve: (_, args, context) => context.prisma.post.create({ data: args.dto }),
    },
    changePost: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangePostInputType),
        },
      },
      type: new GraphQLNonNull(PostType),
      resolve: (_, args, context) =>
        context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        }),
    },
    changeProfile: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInputType),
        },
      },
      type: new GraphQLNonNull(ProfileType),
      resolve: (_, args, context) =>
        context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        }),
    },
    changeUser: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangeUserInputType),
        },
      },
      type: new GraphQLNonNull(UserType),
      resolve: (_, args, context) =>
        context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        }),
    },
    deleteUser: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (_, { id }, { prisma }) => {
        await prisma.user.delete({ where: { id } });
        return id;
      },
    },
    deletePost: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (_, { id }, { prisma }) => {
        await prisma.post.delete({ where: { id } });
        return id;
      },
    },
    deleteProfile: {
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      type: new GraphQLNonNull(GraphQLString),
      resolve: async (_, { id }, { prisma }) => {
        await prisma.profile.delete({ where: { id } });
        return id;
      },
    },
    subscribeTo: {
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (_, { userId, authorId }, { prisma }) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: userId,
            authorId,
          },
        });
        return true;
      },
    },
    unsubscribeFrom: {
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (_, { userId, authorId }, { prisma }) => {
        await prisma.subscribersOnAuthors.deleteMany({
          where: {
            subscriberId: userId,
            authorId,
          },
        });
        return true;
      },
    },
  }),
});
