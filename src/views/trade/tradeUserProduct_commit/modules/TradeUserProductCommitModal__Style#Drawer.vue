<template>
  <a-drawer
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible">
  
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="我的用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'myUserId', validatorRules.myUserId]" placeholder="请输入我的用户ID"></a-input>
        </a-form-item>
        <a-form-item label="我的产品ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'myProductId', validatorRules.myProductId]" placeholder="请输入我的产品ID"></a-input>
        </a-form-item>
        <a-form-item label="我的产品数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'myProductNum', validatorRules.myProductNum]" placeholder="请输入我的产品数量" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="我的确认状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'myUserCommit', validatorRules.myUserCommit]" placeholder="请输入我的确认状态" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="我的交易条件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'myTradeDesc', validatorRules.myTradeDesc]" placeholder="请输入我的交易条件"></a-input>
        </a-form-item>
        <a-form-item label="别人的用户ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'otherUserId', validatorRules.otherUserId]" placeholder="请输入别人的用户ID"></a-input>
        </a-form-item>
        <a-form-item label="别人的产品ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'otherProductId', validatorRules.otherProductId]" placeholder="请输入别人的产品ID"></a-input>
        </a-form-item>
        <a-form-item label="别人的产品数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'otherProductNum', validatorRules.otherProductNum]" placeholder="请输入别人的产品数量" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="别人的确认状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'otherUserCommit', validatorRules.otherUserCommit]" placeholder="请输入别人的确认状态" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="别人的交易条件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'otherTradeDesc', validatorRules.otherTradeDesc]" placeholder="请输入别人的交易条件"></a-input>
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建时间" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人"></a-input>
        </a-form-item>
        <a-form-item label="更新时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新时间" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
  
  export default {
    name: "TradeUserProductCommitModal",
    components: { 
      JDate,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
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
        validatorRules: {
          myUserId: {rules: [
          ]},
          myProductId: {rules: [
          ]},
          myProductNum: {rules: [
          ]},
          myUserCommit: {rules: [
          ]},
          myTradeDesc: {rules: [
          ]},
          otherUserId: {rules: [
          ]},
          otherProductId: {rules: [
          ]},
          otherProductNum: {rules: [
          ]},
          otherUserCommit: {rules: [
          ]},
          otherTradeDesc: {rules: [
          ]},
          createBy: {rules: [
          ]},
          createTime: {rules: [
          ]},
          updateBy: {rules: [
          ]},
          updateTime: {rules: [
          ]},
        },
        url: {
          add: "/trade/tradeUserProductCommit/add",
          edit: "/trade/tradeUserProductCommit/edit",
        }
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
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'myUserId','myProductId','myProductNum','myUserCommit','myTradeDesc','otherUserId','otherProductId','otherProductNum','otherUserCommit','otherTradeDesc','createBy','createTime','updateBy','updateTime'))
        })
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
            console.log("表单提交数据",formData)
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
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'myUserId','myProductId','myProductNum','myUserCommit','myTradeDesc','otherUserId','otherProductId','otherProductNum','otherUserCommit','otherTradeDesc','createBy','createTime','updateBy','updateTime'))
      }
      
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