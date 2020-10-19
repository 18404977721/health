<template>
  <a-card :bordered="false" style="padding:40px 60px;">

    <!-- 查询区域 -->
    <div style="padding:0 0 10px;box-sizing:border-box;display: flex;">
      <div style="flex: 1;">
        <label style="width: 90px;">标题：</label>
        <a-input placeholder="请输入标题" v-model="titleContent" style="width:350px;margin-right:20px;"></a-input>
        <a-button type="primary" @click="getList">搜索</a-button>
      </div>
    </div>
    <div style="cursor:pointer;border-bottom:1px solid #CC0000;padding:10px 0;" @click="clickDetail(item.id)"  v-for="(item,index) in list">
      <a-row :gutter="8">
      	<a-col :span="2">
      		标题：
      	</a-col>
      	<a-col :span="22">
      		{{ item.title }}
      	</a-col>
      </a-row>
      <a-row :gutter="8">
      	<a-col :span="2">
      		发布时间：
      	</a-col>
      	<a-col :span="22">
      		{{ item.publishTime }}
      	</a-col>
      </a-row>
    </div>
    <div style="margin-top: 15px;text-align: right;">
      <a-pagination simple @change="pageChange" v-model="currentNo" :defaultPageSize=10 :total="total" />
    </div>
    
    <health-modal ref="HealthModal"></health-modal>
  </a-card>
</template>

<script>
  import HealthModal from './modules/HealthModal'
  import { getAction,postAction } from '@/api/manage';

  export default {
    name: "HealthInfoCircleList",
    components: {
      HealthModal
    },
    data() {
      return {
        description: '信息圈页面',
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
        this.$refs.HealthModal.show(id,'ggl')
      },
      getList(){
        this.list = [];
        let url = "/health/healthNotic/list";
        let params = {
          pageNo:this.currentNo,
          pageSize:10,
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
