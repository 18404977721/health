<template>
  <div class="user-wrapper" :class="theme">
    <!--<span class="action">-->
      <!--<a-icon type="question-circle-o"></a-icon>-->
    <!--</span>-->
    <!--<header-notice class="action"/>-->
    <a-dropdown>
      <span class="action action-full ant-dropdown-link user-dropdown-menu">
        <!--<a-avatar class="avatar" size="small" :src="getAvatar()"/>-->
        <!--<span v-if="isDesktop()">欢迎您，{{ nickname() }}</span>-->
        <span v-if="isDesktop()" style="font-size:18px;font-weight:bold;color:rgba(255, 255, 255, 0.65);">个人中心</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
        <!--<a-menu-item key="0">-->
          <!--<router-link :to="{ name: 'account-center' }">-->
            <!--<a-icon type="user"/>-->
            <!--<span>个人中心</span>-->
          <!--</router-link>-->
        <!--</a-menu-item>-->
        <!--<a-menu-item key="1">-->
          <!--<router-link :to="{ name: 'account-settings' }">-->
            <!--<a-icon type="setting"/>-->
            <!--<span>账户设置</span>-->
          <!--</router-link>-->
        <!--</a-menu-item>-->
        <!--<a-menu-item key="2" disabled>-->
          <!--<a-icon type="setting"/>-->
          <!--<span>测试</span>-->
        <!--</a-menu-item>-->
        <a-menu-item key="2" @click="updatePassword">
          <a-icon type="setting"/>
          <span>密码修改</span>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!--<span class="action">-->
      <!--<a class="logout_title" href="javascript:;" @click="handleLogout">-->
        <!--<a-icon type="logout"/>-->
        <!--<span v-if="isDesktop()" style="font-size:18px;font-weight:bold;">&nbsp;退出</span>-->
      <!--</a>-->
    <!--</span>-->
    <user-password ref="userPassword"></user-password>
  </div>
</template>

<script>
  import HeaderNotice from './HeaderNotice'
  import { mapActions, mapGetters } from 'vuex'
  import { mixinDevice } from '@/utils/mixin.js'
  import UserPassword from './UserPassword'
  export default {
    name: "UserMenu",
    mixins: [mixinDevice],
    components: {
      HeaderNotice,
      UserPassword
    },
    props: {
      theme: {
        type: String,
        required: false,
        default: 'dark',
      }
    },
    methods: {
      ...mapActions(["Logout"]),
      ...mapGetters(["nickname", "avatar","userInfo"]),
      getAvatar(){
        console.log('url = '+ window._CONFIG['imgDomainURL']+"/"+this.avatar())
        return window._CONFIG['imgDomainURL']+"/"+this.avatar()
      },
      handleLogout() {
        const that = this

        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk() {
            return that.Logout({}).then(() => {
                window.location.href="/";
              //window.location.reload()
            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          },
        });
      },
      updatePassword(){
        let username = this.userInfo().username
        this.$refs.userPassword.show(username)
      },
    }
  }
</script>

<style scoped>
  .logout_title {
    color: inherit;
    text-decoration: none;
  }
  .layout .top-nav-header-index.dark .user-wrapper .action:hover{
  }
</style>