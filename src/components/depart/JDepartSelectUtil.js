/**
 * 字典 util
 * author: scott
 * date: 20190109
 */

import {ajaxGetDepartItems} from '@/api/api'
// import {getAction} from '@/api/manage'

/**
 * 获取单位分组所包括的单位
 * @param groupCode 字典Code
 * @return
 */
export async function initDepartOptions(groupCode) {
  if (!groupCode) {
    return '单位分组Code不能为空!';
  }
  //获取字典数组
  console.log("groupCode="+groupCode)
  let res = await ajaxGetDepartItems(groupCode);
  return res;
}

/**
 * 字典值替换文本通用方法
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterDepartText(dictOptions, text) {
  let re = "";
  dictOptions.forEach(function (option) {
    if (text === option.departId) {
      re = option.departName;
    }
  });
  return re;
}

/**
 * 字典值替换文本通用方法(多选)
 * @param dictOptions  字典数组
 * @param text  字典值
 * @return String
 */
export function filterMultiDepartText(dictOptions, text) {
  if(!text){
    return ""
  }
  let re = "";
  let arr = text.split(",")
  dictOptions.forEach(function (option) {
    for(let i=0;i<arr.length;i++){
      if (arr[i] === option.departId) {
        re += option.departName+",";
        break;
      }
    }
  });
  if(re==""){
    return "";
  }
  return re.substring(0,re.length-1);
}
