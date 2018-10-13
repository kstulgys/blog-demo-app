const { getUserId } = require('../../utils')

const post = {
  async createDraft(parent, { title, text }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createPost(
      {
        data: {
          title,
          text,
          isPublished: true,
          author: {
            connect: { id: userId },
          },
        },
      },
      info,
    )
  },

  async publish(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.updatePost(
      {
        where: { id },
        data: { isPublished: true },
      },
      info,
    )
  },

  async deletePost(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Post({
      id,
      author: { id: userId },
    })
    if (!postExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.db.mutation.deletePost({ where: { id } })
  },
  async createBookmark(parent, { postId }, ctx, info) {
    const userId = getUserId(ctx)
    const postExists = await ctx.db.exists.Bookmark({
      post: { id: postId },
      user: { id: userId },
    })
    if (postExists) {
      throw new Error(`Already bookedmarked post: ${postId}`)
    }

    return ctx.db.mutation.createBookmark(
      {
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
        },
      },
      info,
    )
  },

  async createLike(parent, { postId }, ctx, info) {
    const userId = getUserId(ctx)
    return await ctx.db.mutation.createLike(
      {
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
        },
      },
      info,
    )
  },
}

module.exports = { post }
