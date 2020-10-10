import api from './index'
import { axios } from '@/utils/request'
//import {post} from './manage'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    //url: '/sys/login',
    baseURL:"/api-uaa",
    url: '/oauth/user/token',
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha(parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo() {
  return axios({
    url: '/api/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout(logoutToken) {
  return axios({
    baseURL:"/api-uaa",
    url: '/oauth/remove/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'client_id':'admin',
      'client_secret':'admin',
      'X-Access-Token':  logoutToken
    }
  })
}