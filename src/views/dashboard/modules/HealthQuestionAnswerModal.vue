<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    cancelText="关闭">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="问题">
          <a-input placeholder="请输入问题" v-decorator="['question', { rules: [{ required: true, message: '请输入问题' }] } ]" />
        </a-form-item>
        <a-form-item
          v-if="adminFlag"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="回答">
          <a-input placeholder="请输入回答" v-decorator="['reply', { rules: [{ required: true, message: '请输入回答' }] }]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import Vue from "vue"
  import { USER_INFO} from "@/store/mutation-types"

  export default {
    name: "HealthQuestionAnswerModal",
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
        url: {
          add: "/health/healthQuestion/add",
          edit: "/health/healthQuestion/edit",
        },
        adminFlag:false,
      }
    },
    created () {
      
    },
    methods: {
      edit (id) {
        const userInfo = Vue.ls.get(USER_INFO);
        if(userInfo.username=='admin'){
          this.adminFlag = true
        }else{
          this.adminFlag = false
        }
        
        this.id = id
        console.log(id)
        if(id==''){//新建
          
        }else{//管理员进行回答
          let formData = {}
          formData.id = id
          let url = '/health/healthQuestion/queryById'
          getAction(url, formData).then((res) => {
            if (res.success) {
              this.form.setFieldsValue({question:res.result.question})
              this.form.setFieldsValue({reply:res.result.reply})
            }
          })
        }
        this.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = values;
            formData.id = this.id
            
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })



          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>