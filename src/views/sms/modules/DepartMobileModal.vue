<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位编码">
          <a-input disabled placeholder="单位编码" v-decorator="['departCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位名称">
          <a-input disabled placeholder="单位名称" v-decorator="['departName', {}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导姓名">
          <a-input placeholder="请输入领导姓名" v-decorator="['mobileLeaderName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机">
          <a-input placeholder="请输入手机" v-decorator="['mobileLeader', {rules: [{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请输入正确的手机号码' }]}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :label="name">
          <a-input :placeholder="'请输入'+name" v-decorator="['mobileHeadName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机">
          <a-input placeholder="请输入手机" v-decorator="['mobileHead', {rules: [{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请输入正确的手机号码' }]}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承办人员">
          <a-input placeholder="请输入承办人员" v-decorator="['mobileName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="手机">
          <a-input placeholder="请输入手机" v-decorator="['mobile', {rules: [{ pattern: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/, message: '请输入正确的手机号码' }]}]" />
        </a-form-item>

        <!--<a-form-item-->
          <!--:labelCol="labelCol"-->
          <!--:wrapperCol="wrapperCol"-->
          <!--label="领导姓名">-->
          <!--<a-input placeholder="领导姓名" v-decorator="['mobileLeader2Name', {}]" />-->
        <!--</a-form-item>-->
        <!--<a-form-item-->
          <!--:labelCol="labelCol"-->
          <!--:wrapperCol="wrapperCol"-->
          <!--label="手机">-->
          <!--<a-input placeholder="手机" v-decorator="['mobileLeader2', {rules: [{ pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号码' }]}]" />-->
        <!--</a-form-item>-->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import Vue from 'vue'
  import {USER_INFO} from "@/store/mutation-types"
  import { httpUsercenterAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "DepartMobileModal",
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
          add: "/sysdepart/sysDepart/add",
          edit: "/sysdepart/sysDepart/edit",
        },
        name:'办公室主任',
      }
    },
    created () {
      //获取登陆用户信息
      const userInfo = Vue.ls.get(USER_INFO);
      if(userInfo.username.indexOf('secretary')!=-1){
        this.name = '处室负责人';
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
          this.form.setFieldsValue(pick(this.model,'departCode','departName','mobile','mobileHead','mobileLeader','mobileLeader2','mobileName','mobileHeadName','mobileLeaderName','mobileLeader2Name'));
        });

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
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            
            console.log(formData)
            httpUsercenterAction(httpurl,formData,method).then((res)=>{
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

<style scoped>

</style>