import DataLoader from 'dataloader';
import { PrismaClient, User, Post, Profile, MemberType } from '@prisma/client';

export function createLoaders(prisma: PrismaClient) {
  const userLoader = new DataLoader<string, User | null>(async (ids) => {
    const users = await prisma.user.findMany({ where: { id: { in: [...ids] } } });
    const userMap = new Map(users.map((user) => [user.id, user]));
    return ids.map((id) => userMap.get(id) ?? null);
  });

  const postLoader = new DataLoader<string, Post | null>(async (ids) => {
    const posts = await prisma.post.findMany({
      where: { id: { in: [...ids] } },
    });
    const postMap = new Map(posts.map((post) => [post.id, post]));
    return ids.map((id) => postMap.get(id) ?? null);
  });

  const profileLoader = new DataLoader<string, Profile | null>(async (ids) => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: [...ids] } },
      include: { memberType: true },
    });
    const profileMap = new Map(profiles.map((profile) => [profile.id, profile]));
    return ids.map((id) => profileMap.get(id) ?? null);
  });

  const memberTypeLoader = new DataLoader<string, MemberType | null>(async (ids) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: [...ids] } },
    });
    const map = new Map(memberTypes.map((mt) => [mt.id, mt]));
    return ids.map((id) => map.get(id) ?? null);
  });

  const subscriptionsBySubscriber = new DataLoader<string, any[]>(
    async (subscriberIds) => {
      const subscriptions = await prisma.subscribersOnAuthors.findMany({
        where: { subscriberId: { in: [...subscriberIds] } },
        include: { author: true },
      });
      const grouped = subscriberIds.map((id) =>
        subscriptions.filter((sub) => sub.subscriberId === id),
      );
      return grouped;
    },
  );

  const subscriptionsByAuthor = new DataLoader<string, any[]>(async (authorIds) => {
    const subscriptions = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: [...authorIds] } },
      include: { subscriber: true },
    });
    const grouped = authorIds.map((id) =>
      subscriptions.filter((sub) => sub.authorId === id),
    );
    return grouped;
  });

  return {
    user: userLoader,
    post: postLoader,
    profile: profileLoader,
    memberType: memberTypeLoader,
    subscriptionsBySubscriber,
    subscriptionsByAuthor,
  };
}
