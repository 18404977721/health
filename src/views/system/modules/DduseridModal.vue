<template>
  <a-modal
    title="设定ddUserId"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    cancelText="关闭"
    style="top:20px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="用户ddUserId" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入用户ddUserId" v-decorator="[ 'ddUserId']" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {changDdUserId} from '@/api/api'

  export default {
    name: "DduseridModal",
    data () {
      return {
        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        model: {},

        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form:this.$form.createForm(this)
      }
    },
    created () {
      console.log("created");
    },

    methods: {
      show (id,ddUserId) {
				debugger;
        this.form.resetFields();
        this.visible = true;
        this.model.id = id;
        this.model.ddUserId = ddUserId;
        this.$nextTick(() => {
          this.form.setFieldsValue({ddUserId:ddUserId});
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedRole = [];
      },
      handleSubmit () {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.confirmLoading = true;
						debugger;
            let formData = Object.assign(this.model, values);
            changDdUserId(formData).then((res)=>{
              if(res.success){
                this.$message.success(res.message);
                this.$emit('ok');
              }else{
                this.$message.warning(res.message);
              }
            }).finally(() => {
              this.confirmLoading = false;
              this.close();
            });
          }
        })
      },
      handleCancel () {
        this.close()
      },
    }
  }
</script>