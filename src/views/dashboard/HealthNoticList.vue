<template>
  <a-card :bordered="false" >
    <!-- 查询区域 -->
    <div style="width:80%;margin:0 auto;padding:0 0 10px;box-sizing:border-box;display: flex;">
      <div style="flex: 1;">
        <label style="width: 90px;">标题：</label>
        <a-input placeholder="请输入标题" v-model="titleContent" style="width:350px;margin-right:20px;"></a-input>
        <a-button type="primary" @click="getList">搜索</a-button>
      </div>
    </div>
    <div style="margin-top: 20px;"></div>
    <div style="width:80%;margin:0 auto;border:1px solid #D3D3D3;border-radius:20px;padding:30px 40px 20px 40px;">
     
      <div style="cursor:pointer;border-bottom:1px solid #efefef;padding:10px 0;display:flex;" @click="clickDetail(item.id)"  v-for="(item,index) in list">
        <div style="flex:1;">
          <a-row   style="font-size: 19px; font-weight: bold; color:#333333">
            {{ item.title }}
          </a-row>
          <a-row style="color:#D3D3D3;">
            <a-icon type="clock-circle" style="color:#666;margin-right:10px;margin-top:12px;" />{{ item.publishTime }}
          </a-row>
        </div>
      </div>     
    </div>
    <div style="text-align: right;width:80%;margin:0 auto;">
      <a-pagination show-quick-jumper @change="pageChange" v-model="currentNo" :defaultPageSize=5 :total="total"  style="margin-top: 10px;"/>
    </div>
  </a-card>
</template>

<script>
  import { getAction,postAction } from '@/api/manage';

  export default {
    name: "HealthInfoCircleList",
    data() {
      return {
        description: '公告栏',
        list:[],
        currentNo:1,
        total:1,
        titleContent:'',
      }
    },
    created() {
      this.getList()
    },
    methods: {
      clickDetail(id){
        // this.$router.push({path: '/dashboard/HealthModal/'+id+'/ggl'})
        let routeData = this.$router.resolve({path: '/dashboard/HealthModal/'+id+'/ggl'});
        window.open(routeData.href, '_blank');
      },
      getList(){
        this.list = [];
        let url = "/health/healthNotic/list";
        let params = {
          pageNo:this.currentNo,
          pageSize:5,
          title:this.titleContent,
        };
        getAction(url,params).then((res)=>{
          if(res.success){
            this.list = res.result.records;
            this.total = res.result.total;
          }
        })
      },
      pageChange(val){
        this.currentNo = val;
        this.getList()
      },
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
  
</style>
