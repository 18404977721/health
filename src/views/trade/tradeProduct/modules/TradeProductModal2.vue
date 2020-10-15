<template>
  <a-modal :title="title" :width="width" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="产品编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'productNo', validatorRules.productNo]" placeholder="请输入产品编号"></a-input>
        </a-form-item>
        <a-form-item label="关键字" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'keyword', validatorRules.keyword]" placeholder="请输入关键字"></a-input>
        </a-form-item>
        <a-form-item label="价格" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'price', validatorRules.price]" placeholder="请输入价格"></a-input>
        </a-form-item>
        <a-form-item label="数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'porductNum', validatorRules.porductNum]" placeholder="请输入数量" style="width: 100%" />
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'descs', validatorRules.descs]" placeholder="请输入描述"></a-input>
        </a-form-item>
        <a-form-item label="产品状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'status', validatorRules.status]" defaultValue='1' disabled=true placeholder="请输入产品状态" style="width: 100%" />
        </a-form-item>
        <a-form-item label="押金状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'depositState', validatorRules.depositState]" defaultValue='0' disabled=true placeholder="请输入押金状态" style="width: 100%" />
        </a-form-item>
        <a-form-item label="删除标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'delFlag', validatorRules.delFlag]" defaultValue='0' disabled=true placeholder="请输入删除标识" style="width: 100%" />
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建时间" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true"
            style="width: 100%" />
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人"></a-input>
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新人" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true"
            style="width: 100%" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import Vue from 'vue'
  import {
    httpAction
  } from '@/api/manage'
  import pick from 'lodash.pick'
  import {
    validateDuplicateValue
  } from '@/utils/util'
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
    name: "TradeProductModal",
    components: {
      JDate,
    },
    data() {
      return {
        tradeTypeList: [],
        tradeFileIdList: [],
        previewVisible: false,
        previewImage: '',
        form: this.$form.createForm(this),
        title: "操作",
        width: 800,
        visible: false,
        model: {},
        headers: {},
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 5
          },
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          },
        },
        confirmLoading: false,
        validatorRules: {
          title: {
            rules: []
          },
          productNo: {
            rules: []
          },
          keyword: {
            rules: []
          },
          price: {
            rules: []
          },
          porductNum: {
            rules: []
          },
          descs: {
            rules: []
          },
          status: {
            rules: []
          },
          depositState: {
            rules: []
          },
          delFlag: {
            rules: []
          },
          createTime: {
            rules: []
          },
          createBy: {
            rules: []
          },
          updateBy: {
            rules: []
          },
          updateTime: {
            rules: []
          },
        },
        url: {
          add: "/trade/tradeProduct/add",
          edit: "/trade/tradeProduct/edit",
          upload: "/trade/tradeFile/upload",
          allList: "/trade/tradeType/allList",
        }
      }
    },
    created() {
    },
    methods: {
      getType() {
        let httpurl = '';
        let method = 'get';
        httpurl += this.url.allList;
        httpAction(httpurl, "", method).then((res) => {
          this.tradeTypeList = res.result
        });
      },
      handleCancelPric() {
        this.previewVisible = false;
      },
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'title', 'productNo', 'keyword', 'price', 'porductNum', 'descs',
            'status', 'depositState', 'delFlag', 'createTime', 'createBy', 'updateBy', 'updateTime','fileList','fileIdList'))
        })
      },
      close() {
        this.$emit('close');
        this.visible = false;
      },
      handleOk() {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if (!this.model.id) {
              httpurl += this.url.add;
              method = 'post';
            } else {
              httpurl += this.url.edit;
              method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl, formData, method).then((res) => {
              if (res.success) {
                that.$message.success(res.message);
                that.$emit('ok');
              } else {
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }

        })
      },
      handleCancel() {
        this.close()
      },
      popupCallback(row) {
        this.form.setFieldsValue(pick(row, 'title', 'productNo', 'keyword', 'price', 'porductNum', 'descs', 'status',
          'depositState', 'delFlag', 'createTime', 'createBy', 'updateBy', 'updateTime'))
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
