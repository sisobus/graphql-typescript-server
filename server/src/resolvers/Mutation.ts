import { mutationType } from 'nexus'
import {
  login,
  signup,
} from './mutations'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', signup)
    t.field('login', login)
  },
})
