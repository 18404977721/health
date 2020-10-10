<template>

    <a :href="url"  :id="id" ></a>

</template>

<script>

  export default {
    name: "OpenWindowPageContent",
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
        console.log("------url------"+url)
        if (url !== null && url !== undefined) {
          //this.url = url;
          window.open(url);
        }
      }
    }
  }
</script>

<style>
</style>