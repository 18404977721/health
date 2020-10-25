<template>
  <a-card :bordered="false" style="padding:40px 60px;">

    <!-- 查询区域 -->
    <div style="padding:0 0 10px;box-sizing:border-box;display: flex;">
      <div style="flex: 1;">
        <label style="width: 90px;">标题：</label>
        <a-input placeholder="请输入标题" v-model="titleContent" style="width:350px;margin-right:20px;"></a-input>
        <label style="width: 90px;">类型：</label>
        <a-select v-model='type' style="width:350px;margin-right:20px;">
          <a-select-option value="">请选择</a-select-option>
        	<template v-for="item in typeList">
        		<a-select-option :value="item.id">{{item.typeValue}}</a-select-option>
        	</template>
        </a-select>
        <a-button type="primary" @click="getList">搜索</a-button>
      </div>
    </div>
    <div style="cursor:pointer;border-bottom:1px dashed #CC0000;padding:10px 0;" @click="clickDetail(item.id)"  v-for="(item,index) in list">
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
    
  </a-card>
</template>

<script>
  import { getAction,postAction } from '@/api/manage';

  export default {
    name: "HealthInfoCircleList",
    data() {
      return {
        description: '公共资源',
        list:[],
        currentNo:1,
        total:1,
        titleContent:'',
        type:'',
        typeList:[],
      }
    },
    watch:{
      $route(to,from){
        if(to.name=="HealthPubSourceList"){
          this.type = this.$route.params.type==undefined?'':this.$route.params.type=='kong'?'':this.$route.params.type
          this.getList()
        }
      }
    },
    created() {
      this.type = this.$route.params.type==undefined?'':this.$route.params.type=='kong'?'':this.$route.params.type
      this.getTypeList()
      this.getList()
    },
    methods: {
      getTypeList(){
        let formData = {}
        formData.typeCode = 'ggzy'
        formData.pageNo = 1
        formData.pageSize = 100
        getAction('/health/healthTypeValue/list',formData).then((res)=>{
          if(res.success){
            this.typeList = res.result.records
          }
        })
      },
      clickDetail(id){
        // this.$router.push({path: '/dashboard/HealthModal/'+id+'/ggzy'})
        let routeData = this.$router.resolve({path: '/dashboard/HealthModal/'+id+'/ggzy'});
        window.open(routeData.href, '_blank');
      },
      getList(){
        this.list = [];
        let url = "/health/healthPubSource/list";
        let params = {
          pageNo:this.currentNo,
          pageSize:10,
          title:this.titleContent,
          type:this.type
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
