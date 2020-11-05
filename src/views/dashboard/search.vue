<template>
  <a-card :bordered="false" style="padding:40px 60px;">
    <div style="width:1200px;margin:0 auto;border:1px solid #bb261a;border-radius:10px;padding:35px 40px;">
      <!-- 查询区域 -->
      <div style="padding:0 0 10px;box-sizing:border-box;display: flex;">
        <div style="flex: 1;">
          <a-input placeholder="请输入标题" v-model="keyWord" style="width:400px;margin-right:20px;"></a-input>
          <a-button type="primary" @click="getList">搜索</a-button>
        </div>
      </div>
      <div class="_li" @click="clickDetail(item.id,item.type)"  v-for="(item,index) in list">
        <a-row :gutter="8">
          <a-col :span="2">
            标题：
          </a-col>
          <a-col :span="22">
            {{ item.title }}
          </a-col>
        </a-row>
      </div>
    </div>
  </a-card>
</template>

<script>
  import { getAction,postAction } from '@/api/manage';

  export default {
    name: "search",
    data() {
      return {
        description: '搜索页面',
        list:[],
        keyWord:'',
      }
    },
    watch:{
      $route(to,from){
        if(to.name=="search"){
          this.keyWord = decodeURI(this.$route.params.keyWord)
          this.getList()
        }
      }
    },
    created() {
      let word = decodeURI(this.$route.params.keyWord);
      this.keyWord = word
      this.getList()
    },
    methods: {
      getList(){
        var url = '/health/healthIndex/list';
        let obj = {}
        obj.name = this.keyWord
        getAction(url,obj).then((res) => {
        	this.list = res.result;
        })
      },
      clickDetail(id,type){
        // this.$router.push({path: '/dashboard/HealthModal/'+id+'/'+type})
        let routeData = this.$router.resolve({path: '/dashboard/HealthModal/'+id+'/'+type});
        window.open(routeData.href, '_blank');
      },
    }
  }
</script>
<style scoped>
  ._li{
    cursor:pointer;border-bottom:1px solid #CC0000;padding:10px 0;
  }
</style>
