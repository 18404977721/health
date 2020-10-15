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

        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="产品编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'productNo', validatorRules.productNo]" placeholder="请输入产品编号"></a-input>
        </a-form-item>
        <a-form-item label="关键字" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'keyword', validatorRules.keyword]" placeholder="请输入关键字"></a-input>
        </a-form-item>
        <a-form-item label="价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'price', validatorRules.price]" placeholder="请输入价格"></a-input>
        </a-form-item>
        <a-form-item label="数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'porductNum', validatorRules.porductNum]" placeholder="请输入数量" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'descs', validatorRules.descs]" placeholder="请输入描述"></a-input>
        </a-form-item>
        <a-form-item label="产品状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'status', validatorRules.status]" placeholder="请输入产品状态" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="押金状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'depositState', validatorRules.depositState]" placeholder="请输入押金状态" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="删除标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'delFlag', validatorRules.delFlag]" placeholder="请输入删除标识" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建时间" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人"></a-input>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新人" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true" style="width: 100%"/>
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
    name: "TradeProductModal",
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
          title: {rules: [
          ]},
          productNo: {rules: [
          ]},
          keyword: {rules: [
          ]},
          price: {rules: [
          ]},
          porductNum: {rules: [
          ]},
          descs: {rules: [
          ]},
          status: {rules: [
          ]},
          depositState: {rules: [
          ]},
          delFlag: {rules: [
          ]},
          createTime: {rules: [
          ]},
          createBy: {rules: [
          ]},
          updateBy: {rules: [
          ]},
          updateTime: {rules: [
          ]},
        },
        url: {
          add: "/trade/tradeProduct/add",
          edit: "/trade/tradeProduct/edit",
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
          this.form.setFieldsValue(pick(this.model,'title','productNo','keyword','price','porductNum','descs','status','depositState','delFlag','createTime','createBy','updateBy','updateTime'))
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
        this.form.setFieldsValue(pick(row,'title','productNo','keyword','price','porductNum','descs','status','depositState','delFlag','createTime','createBy','updateBy','updateTime'))
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