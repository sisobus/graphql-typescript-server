import { idArg, stringArg } from 'nexus'
import { getUserId } from '../../utils'

export const me = {
  resolve: async (parent, args, ctx) => {
    const userId = getUserId(ctx)
    return await ctx.prisma.user({ id: userId })
  },
  type: 'User',
}

export const users = {
  resolve: async (parent, args, ctx) => {
    return await ctx.prisma.users()
  },
  type: 'User',
}

export const user = {
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, ctx) => {
    return await ctx.prisma.user({ id })
  },
  type: 'User',
}
