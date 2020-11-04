<template>
  <div class="cardWrap">
		<div v-if="!wdqFlag">
			<h2 style="text-align:center;margin:0;">{{list.title}}</h2>
			<p v-if="list.source" style="text-align:center;font-size: 18px;color: #999;line-height: 50px;margin:0;">发布时间: {{list.publishTime}} <span style="padding-left: 20px;"></span>来源: {{list.source}}</p>
      <p v-else style="text-align:center;font-size: 18px;color: #999;line-height: 50px;margin:0;">发布时间: {{list.publishTime}}</p>
			<a-tabs default-active-key="1" v-if="list.picList||list.videoList">
			  <a-tab-pane key="1" tab="图片" v-if="list.picList&&list.picList.length>0">
			    <a-carousel arrows>
			      <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
			        <a-icon type="left-circle" />
			      </div>
			      <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
			        <a-icon type="right-circle" />
			      </div>
			      <div v-for="(item, index) in list.picList" :key="index" style="height: 420px;overflow:hidden;">
			        <img v-if="item.showType==1" class="carouselimg" :src="item.filePath" alt="">
			        <video controls="controls" v-if="item.showType==2" class="carouselimg" style="width= 100%; height=100%; object-fit: fill">
			          <source :src="item.filePath" type="video/mp4" />
			          <source :src="item.filePath" type="video/WebM">
			        </video>
			      </div>
			    </a-carousel>
			  </a-tab-pane>
			  <a-tab-pane key="2" tab="视频" force-render v-if="list.videoList&&list.videoList.length>0">
			    <a-carousel arrows>
			      <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
			        <a-icon type="left-circle" />
			      </div>
			      <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
			        <a-icon type="right-circle" />
			      </div>
			      <div v-for="(item, index) in list.videoList" :key="index" style="height: 420px;overflow:hidden;">
			        <img v-if="item.showType==1" class="carouselimg" :src="item.filePath" alt="">
			        <video controls="controls" v-if="item.showType==2" class="carouselimg" style="width= 100%; height=100%; object-fit: fill">
			          <source :src="item.filePath" type="video/mp4" />
			          <source :src="item.filePath" type="video/WebM">
			        </video>
			      </div>
			    </a-carousel>
			  </a-tab-pane>
			</a-tabs>
			<div v-html='list.content' style="margin-top:20px;line-height: 36px;"></div>
		</div>
		<div v-if="wdqFlag">
			<a-row :gutter="8">
				<a-col :span="2">
					问题：
				</a-col>
				<a-col :span="22">
					{{ list.question }}
				</a-col>
			</a-row>
			<a-row :gutter="8" v-if="list.reply">
				<a-col :span="2">
					回答：
				</a-col>
				<a-col :span="22">
					{{ list.reply }}
				</a-col>
			</a-row>
		</div>
  </div>
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
        list: [],
				wdqFlag:false,
      }
    },
    watch:{
      $route(to,from){
        if(to.name=="HealthModal"){
          this.id = this.$route.params.id;
          this.type = this.$route.params.type;
          if(this.$route.params.type=='wdq'){
            this.wdqFlag = true
          }else{
            this.wdqFlag = false
          }
          this.show()
        }
      }
    },
    created() {
      this.id = this.$route.params.id;
      this.type = this.$route.params.type;
			if(this.$route.params.type=='wdq'){
				this.wdqFlag = true
			}else{
				this.wdqFlag = false
			}
      this.show()
    },
    methods: {
      show() {
        let formData = {}
        formData.id = this.id
        let url = ''
        let type = this.type
        if(type=='xxq'){//信息圈
          url = '/health/healthInfoCircle/queryById'
        }else if(type=='hd'){//活动
          url = '/health/healthActive/queryById'
        }else if(type=='ggl'){//公告栏
          url = '/health/healthNotic/queryById'
        }else if(type=='ggzy'){//公共资源
          url = '/health/healthPubSource/queryById'
        }else if(type=='wdq'){//问答区
          url = '/health/healthQuestion/queryById'
        }
        getAction(url, formData).then((res) => {
          if (res.success) {
            if(type=='hd'){
              res.result.content = res.result.activeContent
              res.result.publishTime = res.result.startTime+' 至 '+res.result.endTime
            }
            this.list = res.result
          }
        })
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
  
  .cardWrap{
    width:1200px;
    background-color: #f8f8f8;
    padding: 10px 20px;
    min-height: 450px;
    margin:40px auto 40px;
    border-radius: 4px;
    border: 1px solid #e40002;
  }
</style>
