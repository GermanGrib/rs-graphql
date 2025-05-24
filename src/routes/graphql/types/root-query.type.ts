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
    },
    memberType: {
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdEnum),
        },
      },
      type: MemberType,
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
    },
    user: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: UserType,
    },
    posts: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))) },
    post: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: PostType,
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
    },
    profile: {
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      type: ProfileType,
    },
  }),
});
