<template>
  <div class="footer">
    <div class="footer-mod">
      <div class="footer-com Center">
        <ul class="footer-top-con Clear">
          <li class="footer-top-item Fl" style="padding-right:30px">
            <div class="footer-logo"></div>
            <p class="footer-tit">大健康产业联盟</p>
            <img src="@assets/er_img.png">
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">公共资源</li>
              <li><a href="#foo">需求库</a></li>
              <li><a href="#foo">供给库</a></li>
              <li><a href="#foo">人脉</a></li>
              <li><a href="#foo">行业资讯</a></li>
              <li><a href="#foo">行业动态</a></li>
            </ul>
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">活动</li>
              <li><a href="#foo">公益</a></li>
              <li><a href="#foo">展会</a></li>
              <li><a href="#foo">高峰</a></li>
              <li><a href="#foo">考察</a></li>
              <li><a href="#foo">路演</a></li>
            </ul>
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">会员中心</li>
              <li><a href="#foo">会员注册</a></li>
              <li><a href="#foo">会员须知</a></li>
              <li><a href="#foo">会员服务</a></li>
            </ul>
          </li>
          <li class="footer-top-item Fl" style="width: 200px;">
            <ul>
              <li class="footer-top-lif">关于我们</li>
              <li><a href="#foo">大健康产业联盟介绍</a></li>
              <li><a href="#foo">联系我们</a></li>
              <li><a href="#foo">意见反馈</a></li>
            </ul>
          </li>
        </ul>
        <div class="link-txt Bold">友情链接</div>
        <ul class="footer-btm-con Clear">
          <li v-if="list1!=[]">
            <span class="Bold">政府部门</span>
            <a v-for="(item, index) in list1" :key="index" :href="item.url" target="_blank">{{item.name}}</a>
          </li>
          <li v-if="list2!=[]">
            <span class="Bold">会员单位</span>
            <a v-for="(item, index) in list2" :key="index" :href="item.url" target="_blank">{{item.name}}</a>
          </li>
          <li v-if="list3!=[]">
            <span class="Bold">国际机构</span>
            <a v-for="(item, index) in list3" :key="index" :href="item.url" target="_blank">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
	import "@/assets/less/base.css"
	import "@/assets/less/home.css"
  import {
  	getAction,
  	postAction
  } from '@/api/manage';
  export default {
    name: "LayoutFooter",
    data(){
      return{
        list1:[],
        list2:[],
        list3:[]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
      	var url = '/health/healthLinks/listInfo';
      	getAction(url,{}).then((res) => {
      		let list = res.result;
          for(var i=0;i<list.length;i++){
            if(list[i].typeValue=="政府部门"){
              this.list1 = list[i].healthLinksList
            }else if(list[i].typeValue=="会员单位"){
              this.list2 = list[i].healthLinksList
            }else if(list[i].typeValue=="国际机构"){
              this.list3 = list[i].healthLinksList
            }
          }
      	})
      },
    },
  }
</script>

<style lang="scss" scoped>
  .footer {

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
  }
</style>