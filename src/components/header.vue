<template>
<div>
  <div class="wrapper">
    <div class="header">
      <div class=top>
        <div class="search-box">
          <router-link :to="{ path: `/task` }" active-class="_active">
           <i class="icon-search"></i>
           <input class="box" :placeholder="placeholder">
          </router-link>
        </div>
        <div class="mine">
          <div class="icon"></div>
          <div class="text">
            <router-link :to="{ path: `/me/Index` }" active-class="_active">我的</router-link>
          </div>
        </div>
      </div>
      <div class="bottom">
        <span class="icon"></span>
        <span class="notice">公告</span>
        <div class="wrap">
          <!-- <van-notice-bar class="box" :speed="50" :text="notice">
          </van-notice-bar> -->
        </div>
      </div>
    </div>
  </div>
  <div class="copy"></div>
</div>
</template>
<script>
export default {
 props:{
    placeholder:{
      type:String,
      default:'搜索'
    },
 },
 data(){
   return{
     notice:'上线消息：厅局直通功能已经全面上线！'
   }
 },
}
</script>
<style scoped lang="scss">
.wrapper{
  
}

</style>
