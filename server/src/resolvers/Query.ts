import { queryType } from 'nexus'
import {
  me,
  user,
  users,
} from './queries'

export const Query = queryType({
  definition(t) {
    t.field('me', me)
    t.field('user', user)
    t.list.field('users', users)
  },
})
