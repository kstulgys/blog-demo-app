const { getUserId } = require('../utils')
const { forwardTo } = require('prisma-binding')

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  // bookmarks(parent, args, ctx, info) {
  //   return ctx.db.query.bookmarks({}, info)
  // },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id,
      },
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  async me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    if (!id) {
      return null
    }
    return await ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
