<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
		@ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
       <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="userID">
          <a-input  v-decorator="['userid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="钉钉名称">
          <a-input  v-decorator="['name', {}]" />
        </a-form-item>
				<!-- <a-form-item
				  :labelCol="labelCol"
				  :wrapperCol="wrapperCol"
				  label="电话">
				  <a-input  v-decorator="['mobile', {}]" />
				</a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpUsercenterAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
	import {
		getUsercenterAction,
		putUsercenterAction,
		postUsercenterAction
	} from '@/api/manage';
  export default {
    name: "DdUserModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },

        confirmLoading: false,
        form: this.$form.createForm(this),
        validatorRules:{
        },
        url: {
          add: "/sys/dduser/add",
          edit: "/sys/dduser/edit",
        },
      }
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'userid','name','mobile'))
		  //时间格式化
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
			handleSubmit(){
				const that = this;
				// 触发表单验证
				this.form.validateFields((err,values) => {
        if (!err) {
          console.info('success');
						let url = "/sys/dduser/adduser";
					postUsercenterAction(url,values).then((res) => {
						if (res.success) {
							
							that.$message.success(res.message);
							that.$emit('ok');
						} else {
							that.$message.warning(res.message);
						}
					}).finally(() => {
						that.confirmLoading = false;
						that.close();
					})
        }
      });
				
				
			},
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style scoped>

</style>