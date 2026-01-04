import { find, omit, pick } from 'lodash-es'
import { userList } from '../data'
import { generateToken } from '../utils/jwt'
import { error, success } from '../utils/result'

export default [
  {
    url: '/mock/login',
    method: 'post',
    response({ body }) {
      const user = find(userList, body)
      if (user) {
        let omitUser = omit(user, ['id', 'password'])
        let token = generateToken(pick(user, ['id', 'username']))
        return success({
          ...omitUser,
          uid: token,
        })
      } else {
        return error('用户名或密码错误')
      }
    },
  },
  {
    url: '/mock/logout',
    method: 'post',
  },
]
