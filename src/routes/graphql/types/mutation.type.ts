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
      type: new GraphQLNonNull(UserType),
      resolve: (_, { id }, { prisma }) => prisma.user.delete({ where: { id } }),
    },
    deletePost: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(GraphQLString),
      resolve: (_, args, context) => context.prisma.post.delete({ id: args.id }),
    },
    deleteProfile: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(GraphQLString),
      resolve: (_, args, context) => context.prisma.profile.delete({ id: args.id }),
    },
    subscribeTo: {
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(UserType),
      resolve: async (_, args, context) => {
        await context.prisma.subscribedToUser.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return context.prisma.user.findUnique({ where: { id: args.userId } });
      },
    },
    unsubscribeFrom: {
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: async (_, args, context) => {
        await context.prisma.subscribedToUser.deleteMany({
          where: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return true;
      },
    },
  }),
});
