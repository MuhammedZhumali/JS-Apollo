const resolvers = {
  Query: {
    users: async (parent, args, context, info) => {
      const users = await context.prisma.user.findMany({
        include: {
          posts: true
        }
      });
      return users;
    },
    user: async (parent, args, context, info) => {
      const user = await context.prisma.user.findUnique({
        where: {
          id: args.id
        }
      });
      return user;
    },
    posts: async (parent, args, context, info) => {
      const posts = await context.prisma.post.findMany();
      return posts;
    },
    postsWhereAuthorId: async (parent, args, context, info) => {
      const posts = await context.prisma.post.findMany({
        where: {
          authorId: args.id
        }
      });
      return posts;
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      try {
        const user = await context.prisma.user.create({
          data: {
            first_name: args.first_name,
            avatar: args.avatar
          },
        })
        return user;
      } catch (e) {
        console.log(e);
        return null;
      }


    },
    updateUser: async (parent, args, context, info) => {
      try {
        const user = await context.prisma.user.update({
          where: {
            id: args.id
          },
          data: {
            first_name: args.first_name,
            avatar: args.avatar
          }
        });
        return user;
      } catch (error) {
        console.log(error);
        return null;
      }

    },
    deleteUser: async (parent, args, context, info) => {
      try {
        const user = await context.prisma.user.delete({
          where: {
            id: args.id
          }
        });
        return user;
      } catch (e) {
        console.log(e);
        return null
      }

    },
    createPost: async (parent, args, context, info) => {
      try {
        const post = await context.prisma.post.create({
          data: {
            title: args.title,
            content: args.content,
            authorId: args.authorId
          }
        });
        return post;
      } catch (e) {
        console.log(e);
        return null
      }

    },
    deletePost: async (parent, args, context, info) => {
      try {
        const post = await context.prisma.post.delete({
          where: {
            id: args.id
          }
        });
        return post;
      } catch (e) {
        console.log(e);
        return null
      }

    },
    updatePost: async (parent, args, context, info) => {
      try {
        const post = await context.prisma.post.update({
          where: {
            id: args.id
          },
          data: {
            title: args.title,
            content: args.content,
            authorId: args.authorId
          }
        });
        return post;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
  }
}
exports.resolvers = resolvers