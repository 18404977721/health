<template>
  <a-card :bordered="false" style="padding:40px 60px;">

    <!-- 查询区域 -->
    <div style="padding:0 0 10px;box-sizing:border-box;display: flex;">
      <div style="flex: 1;">
        <label style="width: 90px;">问题：</label>
        <a-input placeholder="请输入问题" v-model="question" style="width:350px;margin-right:20px;"></a-input>
        <a-button type="primary" @click="getList">搜索</a-button>
        <a-button type="primary" @click="clickQuestion('')" style="margin-left:20px;">新建</a-button>
      </div>
    </div>
    <div style="display:flex;cursor:pointer;border-bottom:1px solid #efefef;padding:10px 0;"  v-for="(item,index) in list">
      <div style="flex:1;" @click="clickDetail(item.id)">
        <a-row :gutter="8">
        	<a-col :span="2">
        		问题：
        	</a-col>
        	<a-col :span="22">
        		{{ item.question }}
        	</a-col>
        </a-row>
        <a-row :gutter="8" v-if="item.reply">
        	<a-col :span="2">
        		回答：
        	</a-col>
        	<a-col :span="22">
        		{{ item.reply }}
        	</a-col>
        </a-row>
      </div>
      <!-- <a-button v-if="adminFlag" style="width:100px;" type="primary" @click="clickQuestion(item.id)">回答</a-button>
      <a-popconfirm title="确定删除吗?"  @confirm="clickDel(item.id)">
        <a-button v-if="adminFlag" style="width:100px;margin-left:20px;" type="primary">删除</a-button>
      </a-popconfirm> -->
    </div>
    <div style="margin-top: 15px;text-align: right;">
      <a-pagination show-quick-jumper @change="pageChange" v-model="currentNo" :defaultPageSize=10 :total="total" />
    </div>
    
    <health-question-answer-modal ref="HealthQuestionAnswerModal" @ok="currentPageReload"></health-question-answer-modal>
  </a-card>
</template>

<script>
  import HealthQuestionAnswerModal from './modules/HealthQuestionAnswerModal'
  import { getAction,postAction,deleteAction } from '@/api/manage';
  import Vue from "vue"
  import { USER_INFO} from "@/store/mutation-types"

  export default {
    name: "HealthInfoCircleList",
    components: {
      HealthQuestionAnswerModal
    },
    data() {
      return {
        description: '',
        list:[],
        currentNo:1,
        total:1,
        question:'',
        adminFlag:false,//管理员为true
      }
    },
    created() {
      this.getList()
      
      const userInfo = Vue.ls.get(USER_INFO);
      //console.log(userInfo)
      if(userInfo){
        let sysRoleList = userInfo.sysRoleList
        if(sysRoleList!=[]&&sysRoleList!=undefined){
          let result = sysRoleList.some(function(item) {
              if (item.roleName == "管理员") {
                  return true;
              }
          })
          this.adminFlag = result
        }else{
          this.adminFlag = false
        }
      }else{
        this.adminFlag = false
      }
    },
    methods: {
      currentPageReload() {
        this.getList()
      },
      clickDetail(id){
        // this.$router.push({path: '/dashboard/HealthModal/'+id+'/wdq'})
        let routeData = this.$router.resolve({path: '/dashboard/HealthModal/'+id+'/wdq'});
        window.open(routeData.href, '_blank');
      },
      clickQuestion(id){
        let that = this
        const userInfo = Vue.ls.get(USER_INFO);
        if(!userInfo){
          this.$message.warning('请登录后再进行回答');
          // setTimeout(function(){
          //   that.$router.push({path: '/user/login'})
          // },1000)
          return
        }
        this.$refs.HealthQuestionAnswerModal.edit(id)
      },
      clickDel(id){
        let that = this
        const userInfo = Vue.ls.get(USER_INFO);
        if(!userInfo){
          this.$message.warning('请登录后再进行删除');
          // setTimeout(function(){
          //   that.$router.push({path: '/user/login'})
          // },1000)
          return
        }
        let url = "/health/healthQuestion/delete";
        let params = {
          id:id,
        };
        deleteAction(url,params).then((res)=>{
          if(res.success){
            that.getList()
          }
        })
      },
      getList(){
        this.list = [];
        let url = "/health/healthQuestion/list";
        let params = {
          pageNo:this.currentNo,
          pageSize:10,
          question:this.question,
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
