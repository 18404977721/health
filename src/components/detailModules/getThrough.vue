<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="setTaskFinishData"
    @cancel="handleCancel"
    cancelText="关闭">
    <div>
      <a-form :form="form" >
        <a-alert
          style="margin-bottom: 15px"
          v-if="endFlag"
          message="申请办结前请确保任务完成进度为100%"
          type="warning"
        />
        <a-form-item
          style="margin: 0px"
          label="办结理由："
          :labelCol="{lg: {span:5}, sm: {span:5}}"
          :wrapperCol="{lg: {span: 19}, sm: {span: 19} }">
          <a-textarea
            @input="descInput"
            maxLength="350"
            rows="4"
            v-decorator="[
              'endVerifyDesc',
              {rules: [{ required: true, message: '请输入办结理由(最多350字)' }],
              }]">
          </a-textarea>
          <span style="padding: 4px 11px;color: #ccc;float: right">{{txtVal}}/350</span>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
  import {postAction} from '@/api/manage';

  export default {
    name: 'getThrough',
    data () {
      return {
        visible:false,
        form: this.$form.createForm(this),
        title:"办结理由",
        taskId:"",
        confirmLoading: false,
        taskDepartId:"",
        progress:0,
        endFlag:false,
        txtVal:350//办结理由剩余可输入字数
      }
    },
    methods: {
      descInput(e){
        let desc = e.target.value
        this.form.setFieldsValue({'endVerifyDesc':desc})
        this.txtVal = 350 - desc.length;
      },
      setTaskFinishData(){
        let that = this;
        let obj = {};
        this.form.validateFields((err, values) =>{
          if (!err){
            obj['taskId'] = that.taskId;
            obj['id'] = that.taskDepartId;
            obj['endVerifyDesc'] = values.endVerifyDesc;

            if(this.progress < 100){
              this.endFlag = true;
            }else{
              let url = '/task/workTaskDepart/toEnd';
              this.confirmLoading = true;
              postAction(url,obj).then((res) => {
                if (res.success) {
                  this.$notification['success']({
                    message: res.message,
                    description: ''
                  })
                }else{
                  this.$notification['error']({
                    message: res.message,
                    description: ''
                  })
                }
              }).finally(() => {
                that.$emit('pageReload');
                that.close()
              })
            }

          }
        })

      },
      openTaskFinishView(idData,taskDepartId,progress){
        this.taskId = idData;
        this.taskDepartId = taskDepartId;
        this.progress = progress;

        this.confirmLoading=false;
        this.endFlag = false;
        this.visible = true;
      },
      handleCancel() {
        this.visible = false;
        this.close()
      },
      close() {
        this.visible = false;
      },
    },
  }

</script>

<style scoped>

</style>