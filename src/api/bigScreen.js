/* eslint-disable */
import request from 'ig'
import { Loading } from 'element-ui';
export function getEffect(code) {
  return request({
    url: 'http://59.195.205.101:8080/overseer/screen/effect/' + code,
    method: 'get'
  })
}
export function getWorkTask(code) {
  return request({
    url: 'http://59.195.205.101:8080/overseer/screen/worktask/' + code,
    method: 'get'
  })
}
export function getMap(code) {
  return request({
    url: 'http://59.195.205.101:8080/overseer/screen/map/' + code,
    method: 'get'
  })
}
export function getScreenData(type) {
  return request({
    url: 'http://59.195.205.101:8080/overseer/api/json/' +type ,
    method: 'get'
  })
}
export function getScoreData(departId) {
  return request({
    url: 'http://59.195.205.101:8080/overseer/screen/detail/' + departId ,
    method: 'get'
  })
}
