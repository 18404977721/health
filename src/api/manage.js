import { axios } from '@/utils/request'

const api = {
  user: '/api/user',
  role: '/api/role',
  service: '/api/service',
  permission: '/api/permission',
  permissionNoPager: '/api/permission/no-pager'
}

export default api

//  使用默认的业务地址前缀
//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
//post
export function postAction(url,parameter) {
  return axios({
    url: url,
    method:'post' ,
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url,parameter,method) {
  return axios({
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putAction(url,parameter) {
  return axios({
    url: url,
    method:'put',
    data: parameter
  })
}

//deleteAction
export function deleteAction(url,parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}


//  使用用户中心的业务地址前缀
//用户中心get
export function getUsercenterAction(url,parameter) {
  return axios({
    baseURL:"/api-user",
    url: url,
    method: 'get',
    params: parameter
  })
}
//用户中心post
export function postUsercenterAction(url,parameter) {
  return axios({
    baseURL:"/api-user",
    url: url,
    method:'post' ,
    data: parameter
  })
}
//用户中心post method= {post | put}
export function httpUsercenterAction(url,parameter,method) {
  return axios({
    baseURL:"/api-user",
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putUsercenterAction(url,parameter) {
  return axios({
    baseURL:"/api-user",
    url: url,
    method:'put',
    data: parameter
  })
}

//deleteAction
export function deleteUsercenterAction(url,parameter) {
  return axios({
    baseURL:"/api-user",
    url: url,
    method: 'delete',
    params: parameter
  })
}

//省委get
export function getSwAction(url,parameter) {
  return axios({
    baseURL:"/api-sw13710",
    url: url,
    method: 'get',
    params: parameter
  })
}
//省委post
export function postSwAction(url,parameter) {
  return axios({
    baseURL:"/api-sw13710",
    url: url,
    method:'post' ,
    data: parameter
  })
}

//  使用开发区建设的业务地址前缀
//开发区get
export function getDevareaAction(url,parameter) {
  return axios({
    baseURL:"/api-devarea",
    url: url,
    method: 'get',
    params: parameter
  })
}
//开发区post
export function postDevareaAction(url,parameter) {
  return axios({
    baseURL:"/api-devarea",
    url: url,
    method:'post' ,
    data: parameter
  })
}
//开发区post method= {post | put}
export function httpDevareaAction(url,parameter,method) {
  return axios({
    baseURL:"/api-devarea",
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putDevareaAction(url,parameter) {
  return axios({
    baseURL:"/api-devarea",
    url: url,
    method:'put',
    data: parameter
  })
}

//deleteAction
export function deleteDevareaAction(url,parameter) {
  return axios({
    baseURL:"/api-devarea",
    url: url,
    method: 'delete',
    params: parameter
  })
}


//  使用鉴权中心的业务地址前缀
//鉴权中心get
export function getUaaAction(url,parameter) {
  return axios({
    baseURL:"/api-uaa",
    url: url,
    method: 'get',
    params: parameter
  })
}
//鉴权中心post
export function postUaaAction(url,parameter) {
  return axios({
    baseURL:"/api-uaa",
    url: url,
    method:'post' ,
    data: parameter
  })
}
//鉴权中心post method= {post | put}
export function httpUaaAction(url,parameter,method) {
  return axios({
    baseURL:"/api-uaa",
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putUaaAction(url,parameter) {
  return axios({
    baseURL:"/api-uaar",
    url: url,
    method:'put',
    data: parameter
  })
}

//deleteAction
export function deleteUaaAction(url,parameter) {
  return axios({
    baseURL:"/api-uaa",
    url: url,
    method: 'delete',
    params: parameter
  })
}


//  使用api的业务地址前缀
//getApi
export function getApiAction(url,parameter) {
  return axios({
    baseURL:'api',
    url: url,
    method: 'get',
    params: parameter
  })
}


export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id == 0 ? 'post' : 'put',
    data: parameter
  })
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url,parameter){
  return axios({
    url: url,
    params: parameter,
    method:'get' ,
    responseType: 'blob'
  })
}

