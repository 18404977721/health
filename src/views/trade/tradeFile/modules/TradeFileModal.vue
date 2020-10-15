<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="商品名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['tradeProductId', validatorRules.tradeProductId]" :trigger-change="true" dictCode="" placeholder="请选择商品">
            <a-select-option v-for="(item, i) in tradeProductList" :key="item.id">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="商品类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['tradeTypeId', validatorRules.tradeTypeId]" :trigger-change="true" dictCode="" placeholder="请选择商品类型">
            <a-select-option v-for="(item, i) in tradeTypeList" :key="item.id">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
        <div class="clearfix">
          <a-upload action="/jeecg-boot/trade/tradeFile/upload" list-type="picture-card" 
            :file-list="fileList" :headers="headers" :remove="handleRemove" @preview="handlePreview" @change="handleChange">
            <div v-if="fileList.length < 20">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                Upload
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelPric">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import Vue from 'vue'
  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { ACCESS_TOKEN } from "@/store/mutation-types"
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
  export default {
    name: "TradeFileModal",
    components: { 
      JDate,
    },
    data () {
      return {
        tradeProductList:[],
        tradeTypeList:[],
        tradeFileIdList: [],
        previewVisible: false,
              previewImage: '',
              fileList: [
                
              ],
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        headers: {},
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
          tradeProductId: {rules: [
          ]},
          tradeTypeId: {rules: [
          ]},
        },
        url: {
          add: "/trade/tradeFile/addFile",
          edit: "/trade/tradeFile/edit",
          upload: "/trade/tradeFile/upload",
          allList: "/trade/tradeType/allList",
          tradeProductList: "/trade/tradeProduct/tradeProductList",
          commonUpload:window._CONFIG['domianURL']+"/sys/common/upload",
        }
      }
    },
    created () {
      console.log(Vue.ls.get(ACCESS_TOKEN))
      let headers = {
        'X-Access-Token': Vue.ls.get(ACCESS_TOKEN)
      };
      this.headers = headers;
    },
    methods: {
      //商品类型
      getType() {
        let httpurl = '';
        let method = 'get';
        httpurl += this.url.allList;
        httpAction(httpurl,"", method).then((res)=>{
          this.tradeTypeList = res.result
        });
      },
      //商品
      getTradeProductList() {
        let httpurl = '';
        let method = 'get';
        httpurl += this.url.tradeProductList;
        httpAction(httpurl,"", method).then((res)=>{
          this.tradeProductList = res.result
        });
      },
      handleCancelPric() {
        this.previewVisible = false;
      },
      async handlePreview(file) {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
      },
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
      },
      handleChange({
        file,
        fileList
      }) {
        this.fileList = fileList;
      },
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.getType();
        this.getTradeProductList();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'fileName','filePath','fileDesc','createBy','createTime','updateBy','updateTime'))
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
            var obj = {}
            obj.tradeProductId = values.tradeProductId
            obj.tradeTypeId = values.tradeTypeId
            let attachFileList = this.fileList
            let attach = attachFileList
            if (attach != undefined) {
              for (let j = 0; j < attach.length; j++) {
                if (attach[j].status != 'done') {
                  attach.splice(j, 1)
                } else {
                  attach[j].url = attach[j].response.message
                  attach[j].uid = attach[j].response.result
                  this.tradeFileIdList.push(attach[j].uid)
                }
              }
              obj.fileIdList = this.tradeFileIdList
              obj.fileList = attach
            } else {
              obj.fileList = []
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,obj,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                this.tradeFileIdList = [];
                this.fileList = [];
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
        this.form.setFieldsValue(pick(row,'fileName','filePath','fileDesc','createBy','createTime','updateBy','updateTime'))
      },

      
    }
  }
</script>

<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>