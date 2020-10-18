<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleCancel"
    @cancel="handleCancel"
    okText="确定"
    cancelText="关闭">
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="图片" v-if="list.picList&&list.picList.length>0">
        <a-carousel autoplay>
        	<div v-for="(item, index) in list.picList" :key="index" style="height: 420px;overflow:hidden;">
            <img v-if="item.type==1" class="carouselimg" :src="item.filePath" alt="">
            <video v-if="item.type!=1" class="carouselimg">
　　　　　　　　<source :src="item.filePath" type="video/mp4" />
　　　　　　　　<source :src="item.filePath" type="video/WebM">
　　　　　　 </video>
           </div>
        </a-carousel>
      </a-tab-pane>
      <a-tab-pane key="2" tab="视频" force-render v-if="list.videoList&&list.videoList.length>0">
        <a-carousel autoplay>
        	<div v-for="(item, index) in list.videoList" :key="index" style="height: 420px;overflow:hidden;"><img class="carouselimg" :src="item.filePath" alt=""></div>
        </a-carousel>
      </a-tab-pane>
    </a-tabs>
    <div>{{list.content}}</div>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'

  export default {
    name: "HealthInfoCircleModal",
    data () {
      return {
        title:"操作",
        visible: false,
        list:[],
      }
    },
    methods: {
      show(id){
        this.visible = true
        let formData = {}
        formData.id = id
        getAction('/health/healthInfoCircle/queryById',formData).then((res)=>{
          if(res.success){
            console.log(res.result)
            this.list = res.result
          }
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style lang="less" scoped>
  .carouselimg {
    width: 100%;
    height: inherit;
  }
</style>