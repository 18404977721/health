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
          label="任务id">
          <a-input placeholder="请输入任务id" v-decorator="['taskId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务开始时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'taskTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="承办部门id">
          <a-input placeholder="请输入承办部门id" v-decorator="['departId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发起部门id">
          <a-input placeholder="请输入发起部门id" v-decorator="['departStartId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1天反馈的次数">
          <a-input-number v-decorator="[ 'oneNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="3天反馈的次数">
          <a-input-number v-decorator="[ 'threeNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="7天反馈的次数">
          <a-input-number v-decorator="[ 'sevenNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="1月反馈的次数">
          <a-input-number v-decorator="[ 'monthNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="持续推进反馈的次数">
          <a-input-number v-decorator="[ 'continuedNum', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前所处阶段,与basic_assign_status对应">
          <a-input placeholder="请输入当前所处阶段,与basic_assign_status对应" v-decorator="['currentStage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="反馈描述">
          <a-input placeholder="请输入反馈描述" v-decorator="['feedbackDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="退回描述">
          <a-input placeholder="请输入退回描述" v-decorator="['backDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否是牵头单位">
          <a-input-number v-decorator="[ 'mainStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价单位">
          <a-input placeholder="请输入评价单位" v-decorator="['evaluateDepart', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价结果">
          <a-input placeholder="请输入评价结果" v-decorator="['evaluateResult', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价描述">
          <a-input placeholder="请输入评价描述" v-decorator="['evaluateDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价分数">
          <a-input-number v-decorator="[ 'evaluateScore', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交办领导id">
          <a-input placeholder="请输入交办领导id" v-decorator="['leaderId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="交办领导名称">
          <a-input placeholder="请输入交办领导名称" v-decorator="['leaderName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结审核状态">
          <a-input-number v-decorator="[ 'endVerifyStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结审核描述">
          <a-input placeholder="请输入办结审核描述" v-decorator="['endVerifyDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结审核回复">
          <a-input placeholder="请输入办结审核回复" v-decorator="['endVerifyReply', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结审核前状态">
          <a-input placeholder="请输入办结审核前状态" v-decorator="['endBeforeStage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结申请时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endApplyTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结审核时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endVerifyTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="协办理由">
          <a-input placeholder="请输入协办理由" v-decorator="['organizedDesc', {}]" />
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
    name: "WorkTaskDepartModal",
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
          add: "/data/workTaskDepart/add",
          edit: "/data/workTaskDepart/edit",
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
          this.form.setFieldsValue(pick(this.model,'taskId','departId','departStartId','oneNum','threeNum','sevenNum','monthNum','continuedNum','currentStage','feedbackDesc','backDesc','mainStatus','evaluateDepart','evaluateResult','evaluateDesc','evaluateScore','leaderId','leaderName','endVerifyStatus','endVerifyDesc','endVerifyReply','endBeforeStage','organizedDesc'))
		  //时间格式化
          this.form.setFieldsValue({taskTime:this.model.taskTime?moment(this.model.taskTime):null})
          this.form.setFieldsValue({endApplyTime:this.model.endApplyTime?moment(this.model.endApplyTime):null})
          this.form.setFieldsValue({endVerifyTime:this.model.endVerifyTime?moment(this.model.endVerifyTime):null})
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
            formData.taskTime = formData.taskTime?formData.taskTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.endApplyTime = formData.endApplyTime?formData.endApplyTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.endVerifyTime = formData.endVerifyTime?formData.endVerifyTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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

</style>