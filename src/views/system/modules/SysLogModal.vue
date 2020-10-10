<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleCancel"
    @cancel="handleCancel"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="来源">
					{{model.fromClient}}
          <!-- <a-input placeholder="请输入访问来源客户端" v-decorator="['fromClient', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="服务">
					{{model.logModule}}
          <!-- <a-input placeholder="请输入操作模块" v-decorator="['logModule', {}]" /> -->
        </a-form-item>
				<a-form-item
				  :labelCol="labelCol"
				  :wrapperCol="wrapperCol"
				  label="创建人">
					{{model.createBy}}
				</a-form-item>
				<a-form-item
				  :labelCol="labelCol"
				  :wrapperCol="wrapperCol"
				  label="创建时间">
					{{model.createTime}}
				</a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="日志内容">
					{{model.logContent}}
          <!-- <a-input placeholder="请输入日志内容" v-decorator="['logContent', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作类型">
					{{model.operateType==0?'查询':model.operateType==1?'增加':model.operateType==2?'修改':'删除'}}
          <!-- <a-input placeholder="请输入操作类型" v-decorator="['operateType', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作用户账号">
					{{model.userid}}
          <!-- <a-input placeholder="请输入操作用户账号" v-decorator="['userid', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作用户名称">
					{{model.username}}
          <!-- <a-input placeholder="请输入操作用户名称" v-decorator="['username', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="操作人真实名称">
					{{model.realname}}
          <!-- <a-input placeholder="请输入操作人真实名称" v-decorator="['realname', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="IP">
					{{model.ip}}
          <!-- <a-input placeholder="请输入IP" v-decorator="['ip', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请求java方法">
					{{model.method}}
          <!-- <a-input placeholder="请输入请求java方法" v-decorator="['method', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请求路径">
					{{model.requestUrl}}
          <!-- <a-input placeholder="请输入请求路径" v-decorator="['requestUrl', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请求参数">
					{{model.requestParam}}
          <!-- <a-input placeholder="请输入请求参数" v-decorator="['requestParam', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="请求类型">
					{{model.requestType}}
          <!-- <a-input placeholder="请输入请求类型" v-decorator="['requestType', {}]" /> -->
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="耗时">
					{{model.costTime}}
          <!-- <a-input placeholder="请输入耗时" v-decorator="['costTime', {}]" /> -->
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"

  export default {
    name: "SysLogModal",
    data () {
      return {
        title:"查看",
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
          add: "/system/sysLog/add",
          edit: "/system/sysLog/edit",
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
          this.form.setFieldsValue(pick(this.model,'fromClient','logModule','logContent','operateType','userid','username','realname','ip','method','requestUrl','requestParam','requestType','costTime','createTime','createBy'))
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

<style scoped>
	.ant-form >>> .ant-form-item-label > label{font-weight:bold;}
</style>