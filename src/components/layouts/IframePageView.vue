<template>

    <iframe  :id="id" :src="url" frameborder="0" width="100%" height="800px" scrolling="auto"></iframe>

</template>

<script>
  import PageLayout from '../page/PageLayout'
  import RouteView from './RouteView'
	import Vue from 'vue'
	import {Authorization} from "@/store/mutation-types"

  export default {
    name: "IframePageContent",
    data () {
      return {
        url: "",
        id:""
      }
    },
    created () {
      this.goUrl()
    },
    updated () {
      this.goUrl()
    },
    watch: {
      $route(to, from) {
        this.goUrl();
      }
    },
    methods: {
      goUrl () {
        let url = this.$route.meta.url
        let id = this.$route.path
        this.id = id
        //url = "http://www.baidu.com"
        if (url !== null && url !== undefined) {
          this.$router.go(-1)
          let oprnUrl = ""
          if(window.location.host.indexOf('localhost') > -1){
            if(this.$route.meta.title === "省政府13710"){
              oprnUrl = 'http://192.167.107.23:8080';
            }else if(this.$route.meta.title === "开发区展示"){
							const token = Vue.ls.get(Authorization);
              oprnUrl = 'http://218.26.86.90:8000/sw_13710_kfq/map.html?token='+token;
            }
          }else if(window.location.host.indexOf('59.195.205.231') > -1){//政务外网访问
						if(this.$route.meta.title === "开发区展示"){
								const token = Vue.ls.get(Authorization);
						    oprnUrl = 'http://59.195.205.231/sw_13710_kfq/map.html?token='+token;
						}else{
							oprnUrl = url;
						}
          }else if(window.location.host.indexOf('192.167.107.32') > -1){//VPN访问
            if(this.$route.meta.title === "开发区展示"){
            	const token = Vue.ls.get(Authorization);
              oprnUrl = 'http://192.167.107.32/sw_13710_kfq/map.html?token='+token;
            }else if(this.$route.meta.title === "省政府13710"){
            	oprnUrl = 'http://192.167.107.23:8080';
            }
          }
          //this.url = url
          window.open(oprnUrl);
        }
      }
    }
  }
</script>

<style>
</style>