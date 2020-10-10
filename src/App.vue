<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <!--<router-view v-if="isAlive"/>-->
      <keep-alive>
        <router-view :key="$route.fullPath" v-if="$route.meta.keepalived&&isAlive">
          <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
        </router-view>
      </keep-alive>

      <router-view :key="$route.fullPath" v-if="!$route.meta.keepalived&&isAlive">
        <!-- 这里是不被缓存的视图组件，比如 page3 -->
      </router-view>
    </div>
  </a-locale-provider>
</template>
<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import enquireScreen from '@/utils/device'

  export default {
    data () {
      return {
        locale: zhCN,
        isAlive:true
      }
    },
    provide() {
      return {
        reload: this.reload
      }
    },
    methods:{
      reload() {
        this.isAlive = false;
        this.$nextTick(function () {
          this.isAlive = true
        })
      }
    },
    created () {
      let that = this
      enquireScreen(deviceType => {
        // tablet
        if (deviceType === 0) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        // mobile
        else if (deviceType === 1) {
          that.$store.commit('TOGGLE_DEVICE', 'mobile')
          that.$store.dispatch('setSidebar', false)
        }
        else {
          that.$store.commit('TOGGLE_DEVICE', 'desktop')
          that.$store.dispatch('setSidebar', true)
        }

      })
    }
  }
</script>
<style>
  .ant-radio-button-wrapper{
    border-radius: 3px;
  }
  .ant-menu-dark .ant-menu-sub{
    background: #FFFFFF !important;
  }
  .ant-menu-submenu-content> .ant-menu-item > a{
    color: #000 !important;
  }
  #app {
    height: 100%;
  }
  .colAppend{
    display: flex;
    border-width:0px 1px 1px 1px;
    border-style: solid;
    border-color: #FBD2D2 !important;
  }
  .ant-table-thead > tr > th{
    font-weight:bold !important;
  }
  .ant-radio-button-wrapper:hover{
    background:#CC0000;
    color:#fff !important;
  }
</style>