<template>
  <a-card :bordered="false" style="padding:40px 60px;">
    <div style="width:1200px;margin:0 auto;border:1px solid #bb261a;border-radius:10px;padding:35px 40px;">
      <!-- 查询区域 -->
      <div style="padding:0 0 10px;box-sizing:border-box;display: flex;">
        <div style="flex: 1;">
          <label style="width: 90px;">标题：</label>
          <a-input placeholder="请输入标题" v-model="titleContent" style="width:350px;margin-right:20px;"></a-input>
          <a-button type="primary" @click="getList">搜索</a-button>
        </div>
      </div>
      <div style="cursor:pointer;border-bottom:1px solid #efefef;padding:10px 0;display:flex;" @click="clickDetail(item.id)"  v-for="(item,index) in list">
        <div style="flex:1;">
          <a-row>
            {{ item.title }}
          </a-row>
          <a-row>
            <a-icon type="clock-circle" style="color:#666;margin-right:10px;" />{{ item.publishTime }}
          </a-row>
        </div>
      </div>
      <div style="margin-top: 15px;text-align: right;">
        <a-pagination show-quick-jumper @change="pageChange" v-model="currentNo" :defaultPageSize=5 :total="total" />
      </div>
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
