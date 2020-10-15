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
          label="单位">
          <a-cascader :showSearch="filter" :options="options"  :placeholder='regionCode' changeOnSelect  v-decorator="['regionCode1', {rules: [{ required: false, message: '请选择单位' }],}]"/>
        </a-form-item>
        <!--<a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="行政区划编码">
          <a-input placeholder="行政区划编码" v-decorator="['regionCode', {rules: [{ required: true, message: '行政区划编码' }],}]" />
        </a-form-item>-->
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类编码">
          <a-input placeholder="分类编码" v-decorator="['code', {rules: [{ required: true, message: '分类编码' }],}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分类名称">
          <a-input placeholder="分类名称" v-decorator="['name', {rules: [{ required: true, message: '分类名称' }],}]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上级分类">
          <a-input placeholder="上级分类" v-decorator="['parentId', {rules: [{ required: true, message: '上级分类' }],}]" />
        </a-form-item>

       <!-- <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导级别">
          <a-select   v-decorator="[ 'level', {}]" placeholder="请选择领导级别">
            <a-select-option :value="1">正职</a-select-option>
            <a-select-option :value="2">副职</a-select-option>
            <a-select-option :value="3">秘书长/办公室主任</a-select-option>
          </a-select>
        </a-form-item>-->

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="展示排序">
          <a-input-number v-decorator="[ 'sortOrder', {rules: [{ required: true, message: '请输入' }],}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-input placeholder="描述" v-decorator="['description', {rules: [{ required: true, message: '描述' }],}]" />
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
  import { getAction } from '@/api/manage';

  export default {
    name: "BasicRectiAuditModal",
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
          add: "/common/audit/add",
          edit: "/common/audit/edit",
        },
        loading: false,
        imageUrl: '',
        headers:"",
        regionCode:'',
        filter:true
      }
    },
    created () {
      const token = Vue.ls.get(Authorization);
      this.headers = {"Authorization": 'bearer ' +token,'client_id':'admin','client_secret':'admin'}
      this.getMsg();
    },
    methods: {
      getMsg(){
        var that = this;
        var url = "/common/region/queryTreeListCascade";
        getAction(url).then((res) => {
          if (res.success) {
            that.options = res.result;
          }
        })
      },
      add () {

        this.edit({'level':1,'status':'1','display':'1'});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
         this.form.setFieldsValue(pick(this.model,'regionCode','code','name','parentId','status','level','sortOrder','description','display','totalNum','zcblNum','kdqNum','cqNum','dbNum','tbNum','bjNum'))//时间格式化
        })
        this.regionCode = pick(this.model,'regionCode').regionCode;
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
            if(values.regionCode1!=undefined){
              values.regionCode = values.regionCode1[values.regionCode1.length-1];
              //console.log("xxxxxxxxxxxx"+values)
            }
            let formData = Object.assign(this.model, values);


            //时间格式化
            //console.log(formData)
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
      //新增编辑框的取消
      handleCancel () {
        this.close()
      },
    }
  }
</script>

<style scoped>

</style>