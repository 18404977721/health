<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="保存"
    cancelText="关闭">
    
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
      
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="标题">
          <a-input placeholder="请输入标题" v-decorator="['title', { rules: [{ required: true, message: '请输入标题' }] }]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="来源">
          <a-input placeholder="请输入来源" v-decorator="['source', { rules: [{ required: false, message: '' }] }]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="发布时间">
          <a-date-picker format='YYYY-MM-DD HH:mm:ss' v-decorator="[ 'publishTime', { rules: [{ required: true, message: '请选择发布时间' }] }]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="类型">
          <a-select v-decorator="[
          		'type',
          		{ rules: [{ required: true, message: '请选择类型' }] },
          	]">
          	<template v-for="item in list">
          		<a-select-option :value="item.id">{{item.typeValue}}</a-select-option>
          	</template>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否为推荐话题">
          <a-select v-decorator="[
          		'isRecommend',
          		{ rules: [{ required: true, message: '请选择是否为推荐话题' }] },
          	]">
          	<a-select-option value="1">是</a-select-option>
            <a-select-option value="0">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="内容">
          <j-editor v-decorator="[ 'content', { rules: [{ required: true, message: '请输入内容' }] } ]" triggerChange></j-editor>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="上传图片">
        	<a-upload v-decorator="[
        			'picList',
        			{
        				rules: [{ required: true, message: '请上传图片' }],
        				valuePropName: 'fileList',
        				getValueFromEvent: normFile,
        			},
        		]"
        	  action="/jeecg-boot/sys/file/upload" list-type="picture">
        		<a-button>
        			<a-icon type="upload" /> 选择文件</a-button>
        	</a-upload>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpAction,getAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import JEditor from '@/components/jeecg/JEditor'

  export default {
    name: "HealthInfoCircleModal",
    components: { JEditor},
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
          add: "/health/healthInfoCircle/add",
          edit: "/health/healthInfoCircle/edit",
        },
        list:[]
      }
    },
    created () {
      this.getList()
    },
    methods: {
      normFile(e) {
      	if (Array.isArray(e)) {
      		return e;
      	}
      	return e && e.fileList;
      },
      getList(){
        let formData = {}
        formData.typeCode = 'xxq'
        formData.pageNo = 1
        formData.pageSize = 100
        getAction('/health/healthTypeValue/list',formData).then((res)=>{
          if(res.success){
            this.list = res.result.records
          }
        })
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'title','source','type','isRecommend','content'))
		  //时间格式化
          this.form.setFieldsValue({publishTime:this.model.publishTime?moment(this.model.publishTime):null})
          //图片，视频处理
          let picList = []
          if(this.model.picList){
            let picObj = this.model.picList
            for(let i = 0;i < picObj.length;i++){
              // let file = {}
              picObj[i].uid = picObj[i].fileId
              picObj[i].thumbUrl = picObj[i].filePath
              picObj[i].url = picObj[i].filePath
              picObj[i].type = picObj[i].fileType
              picObj[i].name = picObj[i].fileName
              picObj[i].status = "done"
              picList.push(picObj[i])
            }
          }
          this.form.setFieldsValue({picList:picList})
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
            formData.publishTime = formData.publishTime?formData.publishTime.format('YYYY-MM-DD HH:mm:ss'):null;
            var attach = values.picList;
            if (attach) {
            	for (var i = 0; i < attach.length; i++) {
            		if (attach[i].status != 'done') {
            			attach.splice(i, 1)
            		} else {
            			attach[i].fileName = attach[i].name;
            			attach[i].filePath = attach[i].filePath?attach[i].filePath:attach[i].response.message;
            			attach[i].fileType = attach[i].type;
            		}
            	}
            	formData.picList = attach
            }else{
              formData.picList = []
            }
            
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

<style lang="less" scoped>

</style>