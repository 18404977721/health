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
          label="领导名称">
          <a-input placeholder="请输入领导名称" v-decorator="['name', {rules: [{ required: true, message: '请输入领导名称' }],}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务">
          <a-input placeholder="请输入职务" v-decorator="['duties', {rules: [{ required: true, message: '请输入职务' }],}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位名称">
          <a-input disabled v-decorator="['departName']" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位修改">
          <a-cascader :showSearch="filter" :options="options" :placeholder='leaderGroupCode' @change="changeValue" changeOnSelect  v-decorator="['leaderGroup', {rules: [{ required: false, message: '请选择单位' }],}]"/>
        </a-form-item>

        <a-form-item
          label="上传照片"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <div class="dropbox"  key={Math.random()}>
            <a-upload
              action="/api-file/file/upload"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
              :headers="headers"
              v-decorator="[
                  'imgPath', {
                  rules: [{ required: false, message: '请上传附件' }]},
                  ]"
            >
              <div v-if="fileList.length < 1">
                <a-icon type="plus" />
                <div class="ant-upload-text">点击上传</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleAreaCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-select   v-decorator="[ 'status', {}]" placeholder="请选择状态" >
            <a-select-option value="1">在任</a-select-option>
            <a-select-option value="2">离任</a-select-option>
          </a-select>

        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导级别">
          <a-select   v-decorator="[ 'level', {}]" placeholder="请选择领导级别">
            <a-select-option :value="1">正职</a-select-option>
            <a-select-option :value="2">副职</a-select-option>
            <a-select-option :value="3">秘书长/办公室主任</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序">
          <a-input-number v-decorator="[ 'sortOrder', {rules: [{ required: true, message: '请输入' }],}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="是否显示">
          <a-select   v-decorator="[ 'display', {}]" placeholder="请选择是否显示">
            <a-select-option value="0">不显示</a-select-option>
            <a-select-option value="1">显示</a-select-option>
          </a-select>
        </a-form-item>
		
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { httpUsercenterAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import moment from "moment"
  import Vue from 'vue'
  import {Authorization} from "@/store/mutation-types"
  import { getUsercenterAction } from '@/api/manage';

  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  export default {
    name: "BasicLeaderModal",
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
          add: "/common/leader/add",
          edit: "/common/leader/edit",
        },
        loading: false,
        imageUrl: '',
        headers:"",

        previewVisible: false,
        previewImage: '',
        fileList: [],
        options: [],
        leaderGroupCode:'',
        filter:true
      }
    },
    created () {
      const token = Vue.ls.get(Authorization);
      this.headers = {"Authorization": 'bearer ' +token,'client_id':'admin','client_secret':'admin'}

    },
    methods: {
      //获取页面初始化数据
      getMsg(){
        var that = this;
        var url = "/common/region/queryTreeListCascade";
        getUsercenterAction(url).then((res) => {
          if (res.success) {
            that.options = res.result;
          }
        })
      },
      add () {

        this.edit({'level':1,'status':'1','display':'1'});
      },
      edit (record) {
        this.form.resetFields();
        this.fileList = [];
        this.model = Object.assign({}, record);
        this.getMsg();
        this.visible = true;
        this.$nextTick(() => {
         this.form.setFieldsValue(pick(this.model,'name','duties','leaderGroupCode',this.imageUrl,'status','level','sortOrder','display','departName'))//时间格式化
        });
        this.leaderGroupCode = pick(this.model,'leaderGroupCode').leaderGroupCode;
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
            if(values.leaderGroup!=undefined){
              values.leaderGroupCode = values.leaderGroup[values.leaderGroup.length-1];
            }
            if(values.imgPath!=undefined){
              let an = values.imgPath.fileList[0].response.message;
              values.imgPath=an;
            }
            let formData = Object.assign(this.model, values);
            //时间格式化
            //console.log(formData)
            httpUsercenterAction(httpurl,formData,method).then((res)=>{
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
      changeValue(value,selectedOptions){
        let selecLength = selectedOptions.length;
        this.model.departName = selectedOptions[selecLength-1].label;
        this.form.setFieldsValue(pick(this.model,'departName'));
      },
      handleCancel () {
        this.close()
      },
      handleChange ({ fileList }) {
        this.fileList = fileList
      },
      handlePreview (file) {
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleAreaCancel() {
        this.previewVisible = false
      },
      // beforeUpload (file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isPNG = file.type === 'image/png';
      //   const isPic = isJPG || isPNG ;
      //   if (!isPic) {
      //     this.$message.error('请检查格式是否正确')
      //   }
      //   const isLt2M = file.size / 1024 / 1024 < 0.2
      //   if (!isLt2M) {
      //     this.$message.error('图片大小必须小于200M')
      //   }
      //   return isPic && isLt2M
      // },
    }
  }
</script>

<style scoped>


</style>