<template>
  <a-modal
    :title="title"
    :visible="visible"
		:footer="null"
    @ok="handleCancel"
    @cancel="handleCancel">
    <div>
			<h2 style="text-align:center;">大健康产业联盟</h2>
			<p>大健康产业联盟大健康产业联盟大健康产业联盟大健康产业联盟大健康产业联盟大健康产业联盟大健康产业联盟大健康产业联盟</p>
		</div>
  </a-modal>
</template>

<script>

  export default {
    name: 'tip',
    data () {
      return {
        description: '提示',
        visible:false,
        title:"大健康产业联盟",
      }
    },
    methods: {
			showModal(){
				this.visible = true
			},
      handleCancel() {
        this.visible = false;
        this.close()
      },
      close() {
        this.visible = false;
      },
    },
  }
</script>

<style scoped>
  .tit{
		font-size:38px;
		text-align:center;
	}
	.content{
		font-size:18px;
		text-indent:35px;
		line-height: 33px;
	}
</style>