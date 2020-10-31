<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view v-if="isAlive"/>
    </div>
  </a-config-provider>
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
  #app {
    height: 100%;
  }
  .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
    background:rgba(0,0,0,0) !important;
  }
  .ant-menu-dark .ant-menu-item, .ant-menu-dark .ant-menu-item-group-title, .ant-menu-dark .ant-menu-item > a {
      color: rgba(255, 255, 255, 1) !important;
  }
</style>