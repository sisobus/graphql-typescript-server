import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { idArg, intArg, stringArg } from 'nexus'

export const signup = {
  args: {
    email: stringArg(),
    level: intArg(),
    name: stringArg({ nullable: true }),
    password: stringArg(),
  },
  resolve: async (parent, { name, email, password, level }, ctx) => {
    const hashedPassword = await hash(password, 10)
    const user = await ctx.prisma.createUser({
      email,
      level,
      name,
      password: hashedPassword,
    })
    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
  type: 'AuthPayload',
}

export const login = {
  args: {
    email: stringArg(),
    password: stringArg(),
  },
  resolve: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email })
    if (!user) {
      throw new Error(`No user found for email: ${email}`)
    }
    const passwordValid = await compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    }
  },
  type: 'AuthPayload',
}

export const deleteUser = {
  args: {
    id: idArg(),
  },
  resolve: async (parent, { id }, ctx) => {
    return await ctx.prisma.deleteUser({ id })
  },
  type: 'User',
}
