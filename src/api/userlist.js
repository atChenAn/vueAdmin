import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 请求用户列表
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

// 删除用户
export function ajaxDelUser(id,rid,state) {
  return request({
    url: '/UpdateUserInfoByAdmin',
    method: 'post',
    params: {
      token: getToken(),
      roleid: rid,
      id: id,
      startstatus: state 
    }
  })
}

// 添加用户
export function ajaxAddUser(username,name,rid,imgurl) {
  return request({
    url: '/AddUserInfo',
    method: 'post',
    params: {
      token: getToken(),
      account: username,
      roleid: rid,
      img: imgurl,
      name: name 
    }
  })
}

// 上传图片
export var ajaxUploadUrl = process.env.BASE_API + "/UpdatePassword";
