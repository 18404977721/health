<template>
  <div class="logo">
    <router-link :to="{name:'homepage'}">
			<img style="margin:0 10px 11px 0;height:68px;width:68px;display:inline-block;" src="~@/assets/icon_logo.png" alt="logo">
      <h1 style="font-weight:bold;margin:0;font-size:24px;color:#d7bd63;" v-if="showTitle">大健康产业联盟</h1>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: {
      title: {
        type: String,
        default: '13710',
        required: false
      },
      showTitle: {
        type: Boolean,
        default: true,
        required: false
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*缩小首页布 局顶部的高度*/
  $height: 80px;

  .sider {
    box-shadow: none !important;
    .logo {
      height: $height !important;
      line-height: $height !important;
      box-shadow: none !important;
      transition: background 300ms;

      a {
        color: white;
        &:hover {
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    &.light .logo {
      background-color: #1890ff;
    }
  }
</style>