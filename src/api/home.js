import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 修改个人资料列表
export function ajaxEditMyInfo(name,id,pwd,imgurl) {
  return request({
    url: '/UpdateUserInfo',
    method: 'post',
    params: {
      token: getToken(),
      name: name,
      id: id,
      passWord: pwd,
      img: imgurl
    }
  })
}
