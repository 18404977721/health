export const getAttachmentList = (attachmentList) => {
  let returnList = [];  
  for(let i = 0;i < attachmentList.length;i++){
    if(window.location.host.indexOf('localhost') > -1){
      attachmentList[i]['url'] = 'http://182.92.107.90:8082'+attachmentList[i]['url'];
    }else if(window.location.host.indexOf('112') > -1){
       attachmentList[i]['url'] = 'http://59.195.205.101:8080'+attachmentList[i]['url'];
    }else if(window.location.host.indexOf('192.167.107.26') > -1){
	   attachmentList[i]['url'] = 'http://192.167.107.23:8080'+attachmentList[i]['url'];
	}else{
      attachmentList[i]['url'] = 'http://'+window.location.host+attachmentList[i]['url'];
    }
  }
  returnList = attachmentList;
  return returnList;
};

export const getViewList = (path) => {
  let filePath = path;
  let host = window.location.host;
  let port = window.location.port;
  let hostname = "http://"+window.location.host;;
  let defaultHostname = "http://218.26.86.90:8000";
  if(filePath.indexOf("http")>-1){//存储了ip和端口
    if(host.indexOf('192.167.107')> -1||host.indexOf("59.195")>-1){ //通过vpn访问或通过政务外网访问时更改地址
      filePath = filePath.replace(defaultHostname,hostname);
    }
  }else{ //未存储ip和端口
    if(host.indexOf('192.167.107')> -1||host.indexOf("59.195")>-1){ //通过vpn访问或通过政务外网访问时更改地址
      filePath = hostname+filePath;
    }else{
      filePath = defaultHostname+filePath;
    }
  }
  
  return filePath;
}
