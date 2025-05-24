import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql/index.js';
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
    },
    createProfile: {
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInputType),
        },
      },
      type: new GraphQLNonNull(ProfileType),
    },
    createPost: {
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInputType),
        },
      },
      type: new GraphQLNonNull(PostType),
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
    },
    deleteUser: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(GraphQLString),
    },
    deletePost: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(GraphQLString),
    },
    deleteProfile: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: new GraphQLNonNull(GraphQLString),
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
      type: new GraphQLNonNull(GraphQLString),
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
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
