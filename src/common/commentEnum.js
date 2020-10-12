var enumFunction = {
 
 getEnumName: function (enumCode) {
    let returnData = "";
    switch(enumCode){
      case 'normal':returnData = '正常';break;
      case  'good':returnData = '满意';break;
      case  'clear':returnData = '成效明显	';break;
      case  'quicken':returnData = '加速办理	';break;
      case  'dali':returnData = '加力突破	';break;
      case  'onehand':returnData = '一把手亲为研究	';break;
    }
    return returnData;
  },
 
}
export default enumFunction