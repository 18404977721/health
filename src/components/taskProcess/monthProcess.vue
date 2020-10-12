<template>
  <div style="padding: 0 0.3rem 0.3rem 0.3rem;">
    <van-row v-if="sourceType == '01'">
      <van-col class="detailTitle" span="6">交办领导</van-col>
      <van-col class="detailContent" span="18" v-if="processData.startNode">{{processData.startNode.leader}}</van-col>
    </van-row>
    <van-divider v-if="sourceType == '01'"/>
    <van-row type="flex" align="center">
      <van-col span="4">
        <van-icon name="clock-o" size="0.62rem" color="#2F54EB" style="font-weight: bold;"/>
      </van-col>
      <van-col style="font-size: 0.34rem;" span="20">
        <span v-if="currentState=='isover'">此任务已办结.办理时间持续了<span style="color: red;">{{durationTime}} </span></span>
        <span v-else-if="currentState=='normal'">此任务已办理{{durationTime}},距离要求时限<span style="color: red;">{{remainingTime}}</span>。</span>
        <span v-else-if="currentState=='delay'">此任务已办理{{durationTime}},距离<span style="color: red;">延期办结</span><span style="color: red;">{{remainingTime}}。</span></span>
        <span v-else-if="currentState=='supervise'">此任务已办理{{durationTime}},已经<span style="color: red;">延期仍未办结</span>，离<span style="color: red;">督办</span>办结要求时限<span style="color: red;">{{remainingTime}}</span>。</span>
      </van-col>
    </van-row>
    <van-divider />
    <!-- <light-timeline :items='items'></light-timeline> -->
  </div>
</template>

<script>
  export default {
    name: "monthProcess",
    props: {
      processData:{
        type: Object,
        require: true
      }
    },
    data() {
      return {
        //processData:{},
        currentState:"normal",
        durationTime:"",
        remainingTime:"",
        sourceType:"",
        
        items: [
                {
                  tag: '2018-01-12',
                  content: 'ggg'
                },
                {
                  tag: '2018-01-13',
                  color: '#dcdcdc',
                  type: 'circle',
                  content: 'world'
                },
                {
                  type: 'star',
                  tag: '2018-01-14',
                  htmlMode: true,
                  content: `ss`
                }
              ]
      };
    },
    created() {
      this.getProcessData();
    },
    mounted() {
      
    },
    methods: {
      getProcessData(){
        //获取任务进度数据
        if(Object.keys(this.processData) != 0){
          let startNode = this.processData.startNode;  //开始节点
          let normalNodes = this.processData.normalNodes; //正常办理周期节点
          let delayNodes = this.processData.delayNodes; //延期节点
          let superviseNodes = this.processData.superviseNodes;//督办节点
          let overNode = this.processData.overNode; //办结清零节点
          
          this.sourceType = this.processData.sourceType;
          
          if(this.processData.normalNodes.show){
            this.currentState = "normal";
          }else if(this.processData.delayNodes.show){
            this.currentState = "delay";
          }else if(this.processData.superviseNodes.show){
            this.currentState = "supervise";
          }else if(this.processData.overNode.date!=null && overNode.date !=""){
            this.currentState = "isover";
          }                     
          if(this.currentState=="isover"){
            this.durationTime = this.get_time_diff(Date.parse(new Date(startNode.date)),Date.parse(new Date(overNode.date)));
          }else{
            this.durationTime = this.get_time_diff(Date.parse(new Date(startNode.date)),new Date().getTime());
          }
          var remainingTimeStr  = "";
          if(new Date().getTime()<Date.parse(new Date(startNode.endDate))){
            remainingTimeStr= this.get_time_diff(new Date().getTime(),Date.parse(new Date(startNode.endDate)));
            this.remainingTime = "还有"+remainingTimeStr;
          }else{
            remainingTimeStr= this.get_time_diff(Date.parse(new Date(startNode.endDate)),new Date().getTime());
            this.remainingTime = "已超出"+remainingTimeStr;
          }          
        }        
      },
      
      
      get_time_diff(startTime,endTime) {
        var diff = '';
        var time_diff = endTime - startTime; //时间差的毫秒数    
        //计算出相差天数
        var days = Math.floor(time_diff / (24 * 3600 * 1000));
        if (days > 0) {
          diff += days + '天';
        }
        //计算出小时数
        var leave1 = time_diff % ( 24 * 3600 * 1000);
        var hours = Math.floor(leave1 / (3600 * 1000));
        if (hours > 0) {
          diff += hours + '小时';
        } else {
          if (diff !== '') {
            diff += hours + '小时';
          }
        }
        //小时和分种都没有的话则计算分钟数
        if(diff==''||diff==null){
          //计算出分钟数
          var leavel2 = time_diff % ( 24 * 3600 *60 * 1000);
          var minutes = Math.floor(leavel2 / (60 * 1000));
          if (minutes > 0) {
            diff += minutes + '分钟';
          } else {
            if (diff !== '') {
              diff += minutes + '分钟';
            }
          }
        }
        return diff;
      }
    }
  };
</script>

<style scoped>
  .detailTitle{
    font-size: 0.26rem;
    color: #999999;
  }
  .detailContent{
    font-size: 0.30rem;
    text-align:right;
  }
</style>
