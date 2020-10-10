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
				 v-show = "false"
				  :labelCol="labelCol"
				  :wrapperCol="wrapperCol"
				
				  label="交办领导id">
				  <a-input placeholder="交办领导id" :disabled="leaderId" v-decorator="['leaderId', {rules: [{ required: true, message: '交办领导id' }],}]" />
				</a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"

          label="交办领导">
          <a-input placeholder="交办领导" :disabled="leaderNameFlag" v-decorator="['leaderName', {rules: [{ required: true, message: '交办领导' }],}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导日常工作内容">
          <a-input placeholder="领导日常工作内容" v-decorator="['name', {rules: [{ required: true, message: '分类名称' }],}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展示排序">
          <a-input-number v-decorator="[ 'sortOrder', {rules: [{ required: true, message: '请输入' }],}]" />
        </a-form-item>
				<!-- <a-form-item
				  :labelCol="labelCol"
				  :wrapperCol="wrapperCol"
				  label="历史标志">
				  <a-input-number v-decorator="[ 'historyFlag', {rules: [{ required: true, message: '请输入' }],}]" />
				</a-form-item> -->
				 <a-form-item
				   :labelCol="labelCol"
				   :wrapperCol="wrapperCol"
				   label="历史标志">
				   <a-select   v-decorator="[ 'historyFlag', {}]" placeholder="请选择是否换岗">
				     <a-select-option value="0">在职</a-select-option>
				     <a-select-option value="1">换岗</a-select-option>
				   </a-select>
				 </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import Vue from 'vue'
  import {Authorization} from "@/store/mutation-types"
  import { getUsercenterAction,httpUsercenterAction } from '@/api/manage';

  export default {
    name: "BasicLeaderWorkModal",
    data () {
      return {
        title:"操作",
        visible: false,
        model: {},
        leaderNameFlag:false,
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
          add: "/common/leaderWork/add",
          edit: "/common/leaderWork/edit",
        },
        loading: false,
        imageUrl: '',
        headers:"",
        regionCode:'',
        filter:true,
				leaderId:''
      }
    },
    created () {

      const token = Vue.ls.get(Authorization);
      this.headers = {"Authorization": 'bearer ' +token,'client_id':'admin','client_secret':'admin'}

    },
    methods: {
      getMsg(){
        var that = this;
        var url = "/common/region/queryTreeListCascade";
        getUsercenterAction(url).then((res) => {
          if (res.success) {
            that.options = res.result;
          }
        })
      },
      add () {

        this.edit({'level':1,'status':'1','display':'1'});
        this.leaderNameFlag = false;

      },
      addWithParam(leaderId,leaderName){
				this.leaderid = leaderId;
        this.form.resetFields();
        this.getMsg();
        this.visible = true;
        this.leaderNameFlag = true;
        this.$nextTick(() => {
        this.form.setFieldsValue({leaderName:leaderName});
				this.form.setFieldsValue({leaderId:leaderId});
        })
      },
      edit (record) {
				
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.leaderNameFlag = true;
        this.$nextTick(() => {
         this.form.setFieldsValue(pick(this.model,'leaderName','leaderId','name','status','level','sortOrder','historyFlag','display'))//时间格式化
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      //新增编辑框的提交
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
            //console.log("xxxxxxxxxxxx"+values)
            /*if(values.regionCode1!=undefined){
              values.regionCode = values.regionCode1[values.regionCode1.length-1];
              //console.log("xxxxxxxxxxxx"+values)
            }*/
            let formData = Object.assign(this.model, values);

            //时间格式化
            //console.log(formData)
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
      //新增编辑框的取消
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style scoped>

</style>