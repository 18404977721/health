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
          label="计划时间1天">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'planTime1', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间3天">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'planTime3', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间7天">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'planTime7', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间30天">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'planTime30', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位1   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime1Status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位1   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime1RepeatStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位1   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime3RepeatStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位1   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime7RepeatStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位1   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime30RepeatStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位3   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime3Status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位7   0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime7Status', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="计划时间状态位30  0未发送 1已发送">
          <a-input-number v-decorator="[ 'planTime30Status', {}]" />
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
          label="反馈时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'endTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否逻辑删除 0未删除 1已删除">
          <a-input placeholder="请输入是否逻辑删除 0未删除 1已删除" v-decorator="['status', {}]" />
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
    name: "WorkTaskMessageScheduleModal",
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
          add: "/data/workTaskMessageSchedule/add",
          edit: "/data/workTaskMessageSchedule/edit",
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
          this.form.setFieldsValue(pick(this.model,'taskId','departId','planTime1Status','planTime1RepeatStatus','planTime3RepeatStatus','planTime7RepeatStatus','planTime30RepeatStatus','planTime3Status','planTime7Status','planTime30Status','status'))
		  //时间格式化
          this.form.setFieldsValue({taskTime:this.model.taskTime?moment(this.model.taskTime):null})
          this.form.setFieldsValue({planTime1:this.model.planTime1?moment(this.model.planTime1):null})
          this.form.setFieldsValue({planTime3:this.model.planTime3?moment(this.model.planTime3):null})
          this.form.setFieldsValue({planTime7:this.model.planTime7?moment(this.model.planTime7):null})
          this.form.setFieldsValue({planTime30:this.model.planTime30?moment(this.model.planTime30):null})
          this.form.setFieldsValue({feedbackTime:this.model.feedbackTime?moment(this.model.feedbackTime):null})
          this.form.setFieldsValue({endTime:this.model.endTime?moment(this.model.endTime):null})
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
            formData.planTime1 = formData.planTime1?formData.planTime1.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.planTime3 = formData.planTime3?formData.planTime3.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.planTime7 = formData.planTime7?formData.planTime7.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.planTime30 = formData.planTime30?formData.planTime30.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.feedbackTime = formData.feedbackTime?formData.feedbackTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.endTime = formData.endTime?formData.endTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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