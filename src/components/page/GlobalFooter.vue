<template>
  <div class="footer">
    <div class="footer-mod">
      <div class="footer-com Center">
        <ul class="footer-top-con Clear">
          <li class="footer-top-item Fl" style="padding-right:30px">
            <div class="footer-logo"></div>
            <p class="footer-tit">大健康产业联盟</p>
            <img class="_img" src="@assets/er_img.png">
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif">公共资源</li>
              <li>需求库</li>
              <li>供给库</li>
              <li>人脉</li>
              <li>行业资讯</li>
              <li>行业动态</li>
            </ul>
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif" @click="clickhd('kong')">活动</li>
              <li @click="clickhd(gyId)">公益</li>
              <li @click="clickhd(zhId)">展会</li>
              <li @click="clickhd(gfId)">高峰</li>
              <li @click="clickhd(kcId)">考察</li>
              <li @click="clickhd(lyId)">路演</li>
            </ul>
          </li>
          <li class="footer-top-item Fl">
            <ul>
              <li class="footer-top-lif"><router-link to='/user/register'>会员中心</router-link></li>
              <li><router-link target="_blank" to='/user/register'>会员注册</router-link></li>
              <li><router-link target="_blank" to='/user/register'>会员须知</router-link></li>
              <li><router-link target="_blank" to='/user/register'>会员服务</router-link></li>
            </ul>
          </li>
          <li class="footer-top-item Fl" style="width: 220px;">
            <ul>
              <li class="footer-top-lif"><router-link to='/dashboard/us'>关于我们</router-link></li>
              <li><router-link target="_blank" to='/dashboard/us'>大健康产业联盟介绍</router-link></li>
              <li><router-link target="_blank" to='/dashboard/us'>联系我们</router-link></li>
              <li><router-link target="_blank" to='/dashboard/us'>意见反馈</router-link></li>
            </ul>
          </li>
          <li v-if="userInfo!=null" class="footer-top-item Fl">
            <img class="_img" src="@assets/er_img.png">
            <p style="text-align:center;">扫码入群</p>
          </li>
          <li v-if="userInfo!=null" class="Fl" style="width:120px;">
            <img class="_img" src="@assets/er_img.png">
            <p style="text-align:center;">扫码入群</p>
          </li>
          <li v-if="userInfo==null" class="Fl" style="width:174px;">
            <img src="@assets/share.png" style="display:inline-block;width:100%;height:81px;">
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
  import Vue from "vue"
  import { USER_INFO} from "@/store/mutation-types"
  export default {
    name: "LayoutFooter",
    data(){
      return{
        list1:[],
        list2:[],
        list3:[],
        gyId:'',
        zhId:'',
        gfId:'',
        kcId:'',
        lyId:'',
        userInfo:null,
      }
    },
    created() {
      this.getList()
      this.get()
      const userInfo = Vue.ls.get(USER_INFO);
      this.userInfo = userInfo?userInfo:null
    },
    methods: {
      get(){
        let formData = {}
        formData.typeCode = 'hdlx'
        formData.pageNo = 1
        formData.pageSize = 100
        getAction('/health/healthTypeValue/list',formData).then((res) => {
          let arr = res.result.records
          let gy = ''
          let zh = ''
          let gf = ''
          let kc = ''
          let ly = ''
          for(var i=0;i<arr.length;i++){
            if(arr[i].typeValue=='公益'){
              gy = arr[i].id
              this.gyId = gy
            }
            if(arr[i].typeValue=='展会'){
              zh = arr[i].id
              this.zhId = zh
            }
            if(arr[i].typeValue=='高峰'){
              gf = arr[i].id
              this.gfId = gf
            }
            if(arr[i].typeValue=='考察'){
              kc = arr[i].id
              this.kcId = kc
            }
            if(arr[i].typeValue=='路演'){
              ly = arr[i].id
              this.lyId = ly
            }
          }
        })
      },
      clickhd(activeType){
        // this.$router.push({path: '/dashboard/HealthActiveList/'+activeType})
        let routeData = this.$router.resolve({path: '/dashboard/HealthActiveList/'+activeType});
        window.open(routeData.href, '_blank');
      },
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