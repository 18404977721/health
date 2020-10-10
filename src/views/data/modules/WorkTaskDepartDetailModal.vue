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
          label="任务单位id">
          <a-input placeholder="请输入任务单位id" v-decorator="['taskDepartId', {}]" />
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
          label="当前节点状态：1节点落实 2、申请办结 3、申请延期">
          <a-input placeholder="请输入当前节点状态：1节点落实 2、申请办结 3、申请延期" v-decorator="['currentStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="反馈所处阶段 007持续推进 081延期 084督办 085通报期">
          <a-input placeholder="请输入反馈所处阶段 007持续推进 081延期 084督办 085通报期" v-decorator="['feedbackStage', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前进度  百分比值">
          <a-input-number v-decorator="[ 'progress', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划反馈时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'planTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="最晚反馈时间与本记录时间比较">
          <a-input placeholder="请输入最晚反馈时间与本记录时间比较" v-decorator="['mark', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="反馈时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'feedbackTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="反馈内容">
          <a-input placeholder="请输入反馈内容" v-decorator="['feedbackContent', {}]" />
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
          label="责任领导">
          <a-input placeholder="请输入责任领导" v-decorator="['headPersonMain', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任处室">
          <a-input placeholder="请输入责任处室" v-decorator="['headDuty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任人">
          <a-input placeholder="请输入责任人" v-decorator="['headPerson', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审批事项">
          <a-input placeholder="请输入审批事项" v-decorator="['examineItemList', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="投资计划">
          <a-input placeholder="请输入投资计划" v-decorator="['investPlan', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="推进预期">
          <a-input placeholder="请输入推进预期" v-decorator="['pushExpect', {}]" />
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
    name: "WorkTaskDepartDetailModal",
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
          add: "/data/workTaskDepartDetail/add",
          edit: "/data/workTaskDepartDetail/edit",
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
          this.form.setFieldsValue(pick(this.model,'taskDepartId','currentStage','currentStatus','feedbackStage','progress','mark','feedbackContent','backDesc','headPersonMain','headDuty','headPerson','examineItemList','investPlan','pushExpect'))
		  //时间格式化
          this.form.setFieldsValue({planTime:this.model.planTime?moment(this.model.planTime):null})
          this.form.setFieldsValue({feedbackTime:this.model.feedbackTime?moment(this.model.feedbackTime):null})
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
            formData.planTime = formData.planTime?formData.planTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.feedbackTime = formData.feedbackTime?formData.feedbackTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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