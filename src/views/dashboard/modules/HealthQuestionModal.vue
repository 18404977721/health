<template>
  <a-modal :title="title" :width="800" :visible="visible" @ok="handleCancel" @cancel="handleCancel" okText="确定"
    cancelText="关闭">
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
        let url = '/health/healthQuestion/queryById'
        getAction(url, formData).then((res) => {
          if (res.success) {
            console.log(res.result)
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

</style>
