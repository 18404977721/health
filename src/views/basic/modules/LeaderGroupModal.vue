<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
    wrapClassName="ant-modal-cust-warp"
    style="top:5%;height: 85%;overflow-y: hidden">

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导分组名称">
          <a-input placeholder="请输入领导分组名称" v-decorator="[ 'groupName', validatorRules.groupName]" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导分组编码">
          <a-input placeholder="请输入领导分组编码" :disabled="groupDisabled" v-decorator="[ 'groupCode', validatorRules.groupCode]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分组归属行政区">
          <a-input placeholder="请输入分组归属行政区"  v-decorator="[ 'regionCode', validatorRules.regionCode]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input placeholder="请输入排序"  type="number"   v-decorator="[ 'sortNo']" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="描述">
          <a-textarea :rows="5" placeholder="..." v-decorator="[ 'description', {} ]" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import pick from 'lodash.pick'
  import {addLeaderGroup,editLeaderGroup,checkLeaderGroupCode } from '@/api/api'

  export default {
    name: "LeaderGroupModal",
    data () {
      return {
        title:"操作",
        visible: false,
        groupDisabled: false,
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
          groupName:{rules: [{ required: true, message: '请输入领导分组名称!' }]},
          groupCode:{
            rules: [
              {required: true, message: '请输入领导分组编码!'},
              {validator: this.validategroupCode}
            ]},
          regionCode:{
            rules: [
              {required: true, message: '请输入分组归属行政区编码!'}
            ]}
        },
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;

        //编辑页面禁止修改领导分组编码
        if(this.model.id){
          this.groupDisabled = true;
        }else{
          this.groupDisabled = false;
        }
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'groupName', 'description','groupCode',"regionCode","sortNo"))
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
            let formData = Object.assign(this.model, values);
            let obj;
            console.log(formData)
            if(!this.model.id){
              obj=addLeaderGroup(formData);
            }else{
              obj=editLeaderGroup(formData);
            }
            obj.then((res)=>{
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
      validategroupCode(rule, value, callback){
        if(/[\u4E00-\u9FA5]/g.test(value)){
          callback("领导分组编码不可输入汉字!");
        }else{
          var params = {
            id:this.model.id,
            groupCode:value
          };
          checkLeaderGroupCode(params).then((res)=>{
            if(res.success){
              callback();
            }else{
              callback("领导分组编码已存在！");
            }
          });
        }
      }

    }
  }
</script>

<style scoped>

</style>