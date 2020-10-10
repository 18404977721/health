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
          label="身份证号码，唯一项">
          <a-input placeholder="请输入身份证号码，唯一项" v-decorator="['no', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="姓名">
          <a-input placeholder="请输入姓名" v-decorator="['name', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="性别">
          <a-input placeholder="请输入性别" v-decorator="['gender', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="民族">
          <a-input placeholder="请输入民族" v-decorator="['nationnality', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="电话号码">
          <a-input placeholder="请输入电话号码" v-decorator="['telephoneNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签名证书">
          <a-input placeholder="请输入签名证书" v-decorator="['signCert', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加密证书">
          <a-input placeholder="请输入加密证书" v-decorator="['encCert', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="签名证书序列号">
          <a-input placeholder="请输入签名证书序列号" v-decorator="['serialNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-input placeholder="请输入状态" v-decorator="['resourceStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="资源二级类型">
          <a-input placeholder="请输入资源二级类型" v-decorator="['type', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序值">
          <a-input placeholder="请输入排序值" v-decorator="['showOrder', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="账号">
          <a-input placeholder="请输入账号" v-decorator="['account', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="密码">
          <a-input placeholder="请输入密码" v-decorator="['password', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数字证书厂商代码">
          <a-input placeholder="请输入数字证书厂商代码" v-decorator="['certManufacturerNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="数字证书厂商名称">
          <a-input placeholder="请输入数字证书厂商名称" v-decorator="['certManufacturerName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="加密证书序列号">
          <a-input placeholder="请输入加密证书序列号" v-decorator="['encDerialNumber', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出生时间">
          <a-input placeholder="请输入出生时间" v-decorator="['birthday', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="出生地">
          <a-input placeholder="请输入出生地" v-decorator="['homePlace', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务级别">
          <a-input placeholder="请输入职务级别" v-decorator="['postLevelNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务">
          <a-input placeholder="请输入职务" v-decorator="['postNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="专业技术职务代码">
          <a-input placeholder="请输入专业技术职务代码" v-decorator="['techpostNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="证件类型">
          <a-input placeholder="请输入证件类型" v-decorator="['resourceNoType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="软件序列号">
          <a-input placeholder="请输入软件序列号" v-decorator="['softwareNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="用户漫游标识">
          <a-input placeholder="请输入用户漫游标识" v-decorator="['aoaming', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属组织架构编码">
          <a-input placeholder="请输入所属组织架构编码" v-decorator="['orgNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="信任号">
          <a-input placeholder="请输入信任号" v-decorator="['trustNo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="秘密级别:1国密；2机密；3秘密；4非密">
          <a-input placeholder="请输入秘密级别:1国密；2机密；3秘密；4非密" v-decorator="['secretLevel', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="邮箱地址">
          <a-input placeholder="请输入邮箱地址" v-decorator="['email', {}]" />
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpUaaAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "NwUserModal",
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
          add: "/nwUser/add",
          edit: "/nwUser/edit",
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
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'no','name','gender','nationnality','telephoneNumber','signCert','encCert','serialNumber','resourceStatus','type','showOrder','account','password','certManufacturerNo','certManufacturerName','encDerialNumber','birthday','homePlace','postLevelNo','postNo','techpostNo','resourceNoType','softwareNo','aoaming','orgNo','trustNo','secretLevel','email'))
		  //时间格式化
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
            httpUaaAction(httpurl,formData,method).then((res)=>{
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