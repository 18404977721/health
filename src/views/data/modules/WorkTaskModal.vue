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
          label="任务来源id">
          <a-input placeholder="请输入任务来源id" v-decorator="['sourceId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务编码">
          <a-input placeholder="请输入任务编码" v-decorator="['taskCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务名称">
          <a-input placeholder="请输入任务名称" v-decorator="['taskName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="事项内容">
          <a-input placeholder="请输入事项内容" v-decorator="['taskContent', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务接收时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'taskTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态 0未移交 1已移交">
          <a-input placeholder="请输入状态 0未移交 1已移交" v-decorator="['taskStatus', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分管领导id">
          <a-input placeholder="请输入分管领导id" v-decorator="['leaderId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分管领导名称">
          <a-input placeholder="请输入分管领导名称" v-decorator="['leaderNameDuty', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联副省长id">
          <a-input placeholder="请输入关联副省长id" v-decorator="['relateLeaderId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联副省长姓名">
          <a-input placeholder="请输入关联副省长姓名" v-decorator="['relateLeaderName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任单位id">
          <a-input placeholder="请输入责任单位id" v-decorator="['dutyDepartId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="责任单位名称">
          <a-input placeholder="请输入责任单位名称" v-decorator="['dutyDepartName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="办结时限 值域1天 3天 7天 1个月">
          <a-input placeholder="请输入办结时限 值域1天 3天 7天 1个月" v-decorator="['limitType', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前有反馈的数量">
          <a-input-number v-decorator="[ 'oneFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前申请完结/已完结数量">
          <a-input-number v-decorator="[ 'oneEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前延期数量">
          <a-input-number v-decorator="[ 'oneDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前阶段总数量">
          <a-input-number v-decorator="[ 'oneTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前有反馈的数量">
          <a-input-number v-decorator="[ 'threeFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前申请完结/已完结数量">
          <a-input-number v-decorator="[ 'threeEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前延期数量">
          <a-input-number v-decorator="[ 'threeDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前阶段总数量">
          <a-input-number v-decorator="[ 'threeTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前有反馈的数量">
          <a-input-number v-decorator="[ 'sevenFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前申请完结/已完结数量">
          <a-input-number v-decorator="[ 'sevenEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前延期数量">
          <a-input-number v-decorator="[ 'sevenDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前阶段总数量">
          <a-input-number v-decorator="[ 'sevenTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前有反馈的数量">
          <a-input-number v-decorator="[ 'monthFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前申请完结/已完结数量">
          <a-input-number v-decorator="[ 'monthEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前延期数量">
          <a-input-number v-decorator="[ 'monthDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="当前阶段总数量">
          <a-input-number v-decorator="[ 'monthTotal', {}]" />
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
          label="评价单位">
          <a-input placeholder="请输入评价单位" v-decorator="['evaluateDepart', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="评价时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'evaluateTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="完结时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'overTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="归档时间">
          <a-date-picker showTime format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'archiveTime', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核人">
          <a-input placeholder="请输入审核人" v-decorator="['verifyBy', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="审核意见">
          <a-input placeholder="请输入审核意见" v-decorator="['verifyDesc', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务标识（前端使用，后台无用">
          <a-input placeholder="请输入任务标识（前端使用，后台无用" v-decorator="['guid', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="februaryFeedback">
          <a-input-number v-decorator="[ 'februaryFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="februaryEnd">
          <a-input-number v-decorator="[ 'februaryEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="februaryDelay">
          <a-input-number v-decorator="[ 'februaryDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="februaryTotal">
          <a-input-number v-decorator="[ 'februaryTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="marchFeedback">
          <a-input-number v-decorator="[ 'marchFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="marchEnd">
          <a-input-number v-decorator="[ 'marchEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="marchDelay">
          <a-input-number v-decorator="[ 'marchDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="marchTotal">
          <a-input-number v-decorator="[ 'marchTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="aprilFeedback">
          <a-input-number v-decorator="[ 'aprilFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="aprilEnd">
          <a-input-number v-decorator="[ 'aprilEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="aprilDelay">
          <a-input-number v-decorator="[ 'aprilDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="aprilTotal">
          <a-input-number v-decorator="[ 'aprilTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="mayFeedback">
          <a-input-number v-decorator="[ 'mayFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="mayEnd">
          <a-input-number v-decorator="[ 'mayEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="mayDelay">
          <a-input-number v-decorator="[ 'mayDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="mayTotal">
          <a-input-number v-decorator="[ 'mayTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="juneFeedback">
          <a-input-number v-decorator="[ 'juneFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="juneEnd">
          <a-input-number v-decorator="[ 'juneEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="juneDelay">
          <a-input-number v-decorator="[ 'juneDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="juneTotal">
          <a-input-number v-decorator="[ 'juneTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="julyFeedback">
          <a-input-number v-decorator="[ 'julyFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="julyEnd">
          <a-input-number v-decorator="[ 'julyEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="julyDelay">
          <a-input-number v-decorator="[ 'julyDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="julyTotal">
          <a-input-number v-decorator="[ 'julyTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="augustFeedback">
          <a-input-number v-decorator="[ 'augustFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="augustEnd">
          <a-input-number v-decorator="[ 'augustEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="augustDelay">
          <a-input-number v-decorator="[ 'augustDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="augustTotal">
          <a-input-number v-decorator="[ 'augustTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="septemberFeedback">
          <a-input-number v-decorator="[ 'septemberFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="septemberEnd">
          <a-input-number v-decorator="[ 'septemberEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="septemberDelay">
          <a-input-number v-decorator="[ 'septemberDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="septemberTotal">
          <a-input-number v-decorator="[ 'septemberTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="octoberFeedback">
          <a-input-number v-decorator="[ 'octoberFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="octoberEnd">
          <a-input-number v-decorator="[ 'octoberEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="octoberDelay">
          <a-input-number v-decorator="[ 'octoberDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="octoberTotal">
          <a-input-number v-decorator="[ 'octoberTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="novemberFeedback">
          <a-input-number v-decorator="[ 'novemberFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="novemberEnd">
          <a-input-number v-decorator="[ 'novemberEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="novemberDelay">
          <a-input-number v-decorator="[ 'novemberDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="novemberTotal">
          <a-input-number v-decorator="[ 'novemberTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="decemberFeedback">
          <a-input-number v-decorator="[ 'decemberFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="decemberEnd">
          <a-input-number v-decorator="[ 'decemberEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="decemberDelay">
          <a-input-number v-decorator="[ 'decemberDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="decemberTotal">
          <a-input-number v-decorator="[ 'decemberTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sixtyDayFeedback">
          <a-input-number v-decorator="[ 'sixtyDayFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sixtyDayEnd">
          <a-input-number v-decorator="[ 'sixtyDayEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sixtyDayDelay">
          <a-input-number v-decorator="[ 'sixtyDayDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="sixtyDayTotal">
          <a-input-number v-decorator="[ 'sixtyDayTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eightyDayFeedback">
          <a-input-number v-decorator="[ 'eightyDayFeedback', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eightyDayEnd">
          <a-input-number v-decorator="[ 'eightyDayEnd', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eightyDayDelay">
          <a-input-number v-decorator="[ 'eightyDayDelay', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="eightyDayTotal">
          <a-input-number v-decorator="[ 'eightyDayTotal', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联评价手机号">
          <a-input placeholder="请输入关联评价手机号" v-decorator="['relatePhone', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="关联的业务主表id">
          <a-input placeholder="请输入关联的业务主表id" v-decorator="['masterTableId', {}]" />
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
    name: "WorkTaskModal",
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
          add: "/data/workTask/add",
          edit: "/data/workTask/edit",
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
          this.form.setFieldsValue(pick(this.model,'sourceId','taskCode','taskName','taskContent','taskStatus','leaderId','leaderNameDuty','relateLeaderId','relateLeaderName','dutyDepartId','dutyDepartName','limitType','oneFeedback','oneEnd','oneDelay','oneTotal','threeFeedback','threeEnd','threeDelay','threeTotal','sevenFeedback','sevenEnd','sevenDelay','sevenTotal','monthFeedback','monthEnd','monthDelay','monthTotal','currentStage','evaluateResult','evaluateDesc','evaluateScore','evaluateDepart','verifyBy','verifyDesc','guid','februaryFeedback','februaryEnd','februaryDelay','februaryTotal','marchFeedback','marchEnd','marchDelay','marchTotal','aprilFeedback','aprilEnd','aprilDelay','aprilTotal','mayFeedback','mayEnd','mayDelay','mayTotal','juneFeedback','juneEnd','juneDelay','juneTotal','julyFeedback','julyEnd','julyDelay','julyTotal','augustFeedback','augustEnd','augustDelay','augustTotal','septemberFeedback','septemberEnd','septemberDelay','septemberTotal','octoberFeedback','octoberEnd','octoberDelay','octoberTotal','novemberFeedback','novemberEnd','novemberDelay','novemberTotal','decemberFeedback','decemberEnd','decemberDelay','decemberTotal','sixtyDayFeedback','sixtyDayEnd','sixtyDayDelay','sixtyDayTotal','eightyDayFeedback','eightyDayEnd','eightyDayDelay','eightyDayTotal','relatePhone','masterTableId'))
		  //时间格式化
          this.form.setFieldsValue({taskTime:this.model.taskTime?moment(this.model.taskTime):null})
          this.form.setFieldsValue({evaluateTime:this.model.evaluateTime?moment(this.model.evaluateTime):null})
          this.form.setFieldsValue({overTime:this.model.overTime?moment(this.model.overTime):null})
          this.form.setFieldsValue({archiveTime:this.model.archiveTime?moment(this.model.archiveTime):null})
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
            formData.evaluateTime = formData.evaluateTime?formData.evaluateTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.overTime = formData.overTime?formData.overTime.format('YYYY-MM-DD HH:mm:ss'):null;
            formData.archiveTime = formData.archiveTime?formData.archiveTime.format('YYYY-MM-DD HH:mm:ss'):null;
            
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