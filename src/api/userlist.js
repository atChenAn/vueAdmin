import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

export function getUserList(name, account, page, pagesize,state) {
  return request({
    url: '/GetUserInfo',
    method: 'post',
    params: {
      token: getToken(),
      pageindex: page,
      pagesize: pagesize,
      name: name,
      account: account,
      startstatus: state,
    }
  })
}
