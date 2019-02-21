import { rule, shield } from 'graphql-shield'
import { getUserId } from '../utils'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
}

export const permissions = shield({
  Mutation: {
  },
  Query: {
    me: rules.isAuthenticatedUser,
    user: rules.isAuthenticatedUser,
    users: rules.isAuthenticatedUser,
  },
})
