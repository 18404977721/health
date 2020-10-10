<template>
  <a-modal
    title="重新设定密码"
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

        <a-form-item label="用户账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input placeholder="请输入用户账号" v-decorator="[ 'username', validatorRules.username]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {changUsername,checkUsername} from '@/api/api'

  export default {
    name: "UsernameModal",
    data () {
      return {
        visible: false,
        confirmLoading: false,
        confirmDirty: false,
        validatorRules: {
          username: {
            rules: [{
              required: true, message: '请输入用户账号!'
            }, {
              validator: this.validateUsername,
            }]
          },
        },
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
      show (id,username) {
        this.form.resetFields();
        this.visible = true;
        this.model.id = id;
        this.model.username = username;
        this.$nextTick(() => {
          this.form.setFieldsValue({username:username});
        });
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedRole = [];
      },
      validateUsername(rule, value, callback){
        var params = {
          id:this.model.id,
          username:value
        };
        checkUsername(params).then((res)=>{
          if(res.success){
            callback();
          }else{
            callback("用户账号已存在！");
          }
        });
      },
      handleSubmit () {
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            this.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            changUsername(formData).then((res)=>{
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
      handleConfirmBlur  (e) {
        const value = e.target.value
        this.confirmDirty = this.confirmDirty || !!value
      }

    }
  }
</script>