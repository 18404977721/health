import * as dd from 'dingtalk-jsapi'
import { httpAction,getAction } from '@/commons/requet'

export function getddConfig () {
  let url = '/wpzf_system/videoCallApi/authinfo?reqUrl=' + window.location.href;
  httpAction(url,{},"GET").then((res) => {
  	let data = res.data;
  	var info = JSON.parse(data);
  	var _config_signature = info.signature;
  	var _config_timeStamp = info.timeStamp;
  	var _config_corpId = info.corpId;
  	dd.config({
  		agentId : info.agentId,
  		corpId : info.corpId,
  		timeStamp : info.timeStamp,
  		nonceStr : info.nonceStr,
  		signature : info.signature,
  		jsApiList : [ 'runtime.info', 'biz.contact.choose',
  			'device.notification.confirm', 'device.notification.alert',
  			'device.notification.prompt', 'biz.ding.post',
  			'biz.util.openLink','biz.telephone.call','biz.contact.complexPicker',
			'biz.telephone.showCallMenu','biz.microApp.openApp','biz.chat.pickConversation','biz.chat.chooseConversationByCorpId']
  	});
  	dd.ready(function() {
  		dd.runtime.info({
  			onSuccess : function(info) {
  				logger.e('runtime info: ' + JSON.stringify(info));
  			},
  			onFail : function(err) {
  				logger.e('fail: ' + JSON.stringify(err));
  			}
  		});
  		dd.runtime.permission.requestAuthCode({
  			corpId : _config_corpId,
  			onSuccess : function(info) {
  				alert('authcode: ' + info.code);
  			},
  			onFail : function(err) {
  				alert('fail: ' + JSON.stringify(err));
  			}
  		});
  	});
  	dd.error(function(err) {
  	});
  })
  return dd;
}