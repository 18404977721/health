<template>
  <a-modal :title="title" :width="800" :visible="visible" @ok="handleCancel" @cancel="handleCancel" okText="确定"
    cancelText="关闭">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="图片" v-if="list.picList&&list.picList.length>0">
        <a-carousel autoplay arrows>
          <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
            <a-icon type="left-circle" />
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
            <a-icon type="right-circle" />
          </div>
          <div v-for="(item, index) in list.picList" :key="index" style="height: 420px;overflow:hidden;">
            <img v-if="item.showType==1" class="carouselimg" :src="item.filePath" alt="">
            <video v-if="item.showType==2" class="carouselimg">
              <source :src="item.filePath" type="video/mp4" />
              <source :src="item.filePath" type="video/WebM">
            </video>
          </div>
        </a-carousel>
      </a-tab-pane>
      <a-tab-pane key="2" tab="视频" force-render v-if="list.videoList&&list.videoList.length>0">
        <a-carousel autoplay>
          <div v-for="(item, index) in list.videoList" :key="index" style="height: 420px;overflow:hidden;"><img class="carouselimg"
              :src="item.filePath" alt=""></div>
        </a-carousel>
      </a-tab-pane>
    </a-tabs>
    <div v-html='list.content' style="margin-top:20px;"></div>
  </a-modal>
</template>

<script>
  import {
    httpAction,
    getAction
  } from '@/api/manage'

  export default {
    name: "HealthModal",
    data() {
      return {
        title: "详情",
        visible: false,
        list: [],
      }
    },
    methods: {
      show(id,type) {
        this.visible = true
        let formData = {}
        formData.id = id
        let url = ''
        if(type=='xxq'){//信息圈
          url = '/health/healthInfoCircle/queryById'
        }else if(type=='hd'){//活动
          url = '/health/healthActive/queryById'
        }else if(type=='ggl'){//公告栏
          url = '/health/healthNotic/queryById'
        }else if(type=='ggzy'){//公共资源
          url = '/health/healthPubSource/queryById'
        }
        getAction(url, formData).then((res) => {
          if (res.success) {
            console.log(res.result)
            if(type=='hd'){
              res.result.content = res.result.activeContent
            }
            this.list = res.result
          }
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleCancel() {
        this.close()
      },
    }
  }
</script>

<style scoped>
  .carouselimg {
    /* width: 100%;
    height: inherit; */
    height:100%;width:auto;
    margin:0 auto;
  }

  .ant-carousel>>>.slick-slide {
    text-align: center;
    height: 420px;
    line-height: 420px;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel>>>.custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
  }

  .ant-carousel>>>.custom-slick-arrow:before {
    display: none;
  }

  .ant-carousel>>>.custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .ant-carousel>>>.slick-slide h3 {
    color: #fff;
  }
</style>
