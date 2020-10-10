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
          label="上级单位ID">
          <a-input placeholder="请输入上级单位ID" v-decorator="['parentId', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位编码">
          <a-input placeholder="请输入单位编码" v-decorator="['departCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位名称">
          <a-input placeholder="请输入单位名称" v-decorator="['departName', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="简称">
          <a-input placeholder="请输入简称" v-decorator="['departNameEn', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="排序"
        >
          <a-input-number style="width:500px" v-decorator="[ 'departOrder', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="节点类型">
          <a-select v-decorator="[ 'isLeaf', {}]" placeholder="节点类别" >
            <a-select-option :value="0">父节点</a-select-option>
            <a-select-option :value="1">子节点</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="单位类别">
          <a-select   v-decorator="[ 'departType', {}]" placeholder="单位类别" >
            <a-select-option value="0">单位</a-select-option>
            <a-select-option value="1">行政区</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="分组类型">
          <a-select  v-decorator="[ 'screenType', {}]" placeholder="分组类型" >
            <a-select-option value="1">无需分组</a-select-option>
            <a-select-option value="2">分组2</a-select-option>
            <a-select-option value="3">分组3</a-select-option>
            <a-select-option value="4">分组4</a-select-option>
            <a-select-option value="5">分组5</a-select-option>
            <a-select-option value="6">分组6</a-select-option>
            <a-select-option value="7">分组7</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="任务参与类型">
          <a-select  v-decorator="[ 'taskType', {}]" placeholder="任务参与类型" >
            <a-select-option value="1">交办单位</a-select-option>
            <a-select-option value="10">承办单位</a-select-option>
            <a-select-option value="11">既交办也承办</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="领导组编码">
          <a-input placeholder="请输入领导组编码" v-decorator="['leaderGroupCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="所属行政区">
          <a-input placeholder="请输入所属行政区" v-decorator="['regionCode', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="传真">
          <a-input placeholder="请输入传真" v-decorator="['fax', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="地址">
          <a-input placeholder="请输入地址" v-decorator="['address', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="备注">
          <a-input placeholder="请输入备注" v-decorator="['memo', {}]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="状态">
          <a-select  v-decorator="[ 'status', {}]" placeholder="任务参与类型" >
            <a-select-option value="0">不启用</a-select-option>
            <a-select-option value="1">启用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="删除状态">
          <a-select   v-decorator="[ 'delFlag', {}]" placeholder="请输入删除状态（0，正常，1已删除）" >
            <a-select-option value="0">正常</a-select-option>
            <a-select-option value="1">已删除</a-select-option>
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

  export default {
    name: "SysDepartModal",
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
          add: "/sysdepart/sysDepart/add",
          edit: "/sysdepart/sysDepart/edit",
        },
      }
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
          this.form.setFieldsValue(pick(this.model,'parentId','departCode','departName','departNameEn','departNameAbbr','departOrder','leaderGroupCode','description','isLeaf','departType','screenType','taskType','orgType','orgCode','regionCode','mobile','mobileHead','mobileLeader','fax','address','memo','status','delFlag'))
		  //时间格式化
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
            
            console.log(formData)
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
      handleCancel () {
        this.close()
      },


    }
  }
</script>

<style scoped>

</style>