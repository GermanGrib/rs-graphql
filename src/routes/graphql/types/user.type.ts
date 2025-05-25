import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index.js';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.type.js';
import { PostType } from './post.type.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (user, _, { prisma, loaders }) => {
        const profile = await prisma.profile.findUnique({
          where: { userId: user.id },
        });

        if (profile) {
          loaders.profile.prime(profile.id, profile);
          return profile;
        }
        return null;
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (user, _, { prisma }) => {
        return prisma.post.findMany({ where: { authorId: user.id } });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (user, _, { loaders }) => {
        const subscriptions = await loaders.subscriptionsBySubscriber.load(user.id);
        return Promise.all(subscriptions.map((sub) => loaders.user.load(sub.authorId)));
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (user, _, { loaders }) => {
        const subscriptions = await loaders.subscriptionsByAuthor.load(user.id);
        return Promise.all(
          subscriptions.map((sub) => loaders.user.load(sub.subscriberId)),
        );
      },
    },
  }),
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  },
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
