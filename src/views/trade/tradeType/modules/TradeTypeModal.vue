<template>
  <a-modal :title="title" :width="width" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk" @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="父类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['parentId', validatorRules.parentId]" :trigger-change="true" dictCode="" placeholder="请选择父类型">
            <a-select-option v-for="(item, i) in tradeTypeList" :key="item.id">{{item.title}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="序号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'orders', validatorRules.orders]" placeholder="请输入序号" style="width: 100%" />
        </a-form-item>
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'descs', validatorRules.descs]" placeholder="请输入描述"></a-input>
        </a-form-item>
        <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'status', validatorRules.status]" defaultValue='1' disabled=true placeholder="请输入状态"></a-input>
        </a-form-item>
        <a-form-item label="创建人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'createBy', validatorRules.createBy]" placeholder="请输入创建人"></a-input>
        </a-form-item>
        <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择创建时间" v-decorator="[ 'createTime', validatorRules.createTime]" :trigger-change="true"
            style="width: 100%" />
        </a-form-item>
        <a-form-item label="更新人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'updateBy', validatorRules.updateBy]" placeholder="请输入更新人"></a-input>
        </a-form-item>
        <a-form-item label="更新时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择更新时间" v-decorator="[ 'updateTime', validatorRules.updateTime]" :trigger-change="true"
            style="width: 100%" />
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import {
    httpAction
  } from '@/api/manage'
  import pick from 'lodash.pick'
  import {
    validateDuplicateValue
  } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'

  export default {
    name: "TradeTypeModal",
    components: {
      JDate,
    },
    data() {
      return {
        form: this.$form.createForm(this),
        title: "操作",
        width: 800,
        visible: false,
        model: {},
        tradeTypeList:[],
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
          parentId: {
            rules: []
          },
          orders: {
            rules: []
          },
          title: {
            rules: []
          },
          descs: {
            rules: []
          },
          status: {
            rules: []
          },
          createBy: {
            rules: []
          },
          createTime: {
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
          add: "/trade/tradeType/add",
          edit: "/trade/tradeType/edit",
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
        httpAction(httpurl,"", method).then((res)=>{
          this.tradeTypeList = res.result
        });
      },
      add() {
        this.edit({});
      },
      edit(record) {
        this.form.resetFields();
        this.getType();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model, 'parentId', 'orders', 'title', 'descs', 'status', 'createBy',
            'createTime', 'updateBy', 'updateTime'))
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
            console.log("表单提交数据", formData)
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
        this.form.setFieldsValue(pick(row, 'parentId', 'orders', 'title', 'descs', 'status', 'createBy', 'createTime',
          'updateBy', 'updateTime'))
      },


    }
  }
</script>
