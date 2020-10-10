<template>

  <a-drawer
    :title="title"
    :maskClosable="true"
    :width="drawerWidth"
    placement="right"
    :closable="true"
    @close="handleCancel"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <template slot="title">
      <div style="width: 100%;">
        <span>{{ title }}</span>
      </div>

    </template>

    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="可选择协办单位分配" :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-tree
            checkable
            :treeData="groupList"
            :checkedKeys="selectedGroups"
            @check="this.onCheck"
          >
          </a-tree>
        </a-form-item>

      </a-form>
    </a-spin>
    <div class="drawer-bootom-button" v-show="!disableSubmit">
      <a-popconfirm title="确定放弃编辑？" @confirm="handleCancel" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="confirmLoading">提交</a-button>
    </div>
  </a-drawer>
</template>

<script>
  import {editSzfCooperationGroups,queryDepartSzfCooperationGroup,queryallDepartGroup } from '@/api/api'
  export default {
    name: "SysDepartCooperationModal",
    components: {
      queryDepartSzfCooperationGroup,
      queryallDepartGroup
    },
    data () {
      return {
        modalWidth:800,
        drawerWidth:700,
        modaltoggleFlag:true,
        confirmDirty: false,
        departId:"", //保存单位id
        disableSubmit:false,
        title:"操作",
        visible: false,
        model: {},
        groupList:[],
        selectedGroups:[],
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        uploadLoading:false,
        confirmLoading: false,
        form:this.$form.createForm(this),
      }
    },
    methods: {
      onCheck (selectedGroups) {
        this.selectedGroups = selectedGroups;
      },
      initialGroupList(){
        queryallDepartGroup().then((res)=>{
          if(res.success){
            this.groupList = res.result;
            this.loadUserGroups(this.departId);
          }else{
            console.log(res.message);
          }
        });
      },
      loadUserGroups(departId){
        queryDepartSzfCooperationGroup({departId:departId}).then((res)=>{
          if(res.success){
            this.selectedGroups = res.result;
          }else{
            console.log(res.message);
          }
        });
      },
      edit (departId) {
        let that = this;
        that.initialGroupList();
        that.form.resetFields();
        that.departId = departId;
        that.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.selectedGroups = [];
      },
      handleSubmit () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            formData.departId = this.departId;
            formData.selectedGroups = this.selectedGroups.length>0?this.selectedGroups.join(","):'';
            let obj;
            obj=editSzfCooperationGroups(formData);

            obj.then((res)=>{
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

  .ant-table-tbody .ant-table-row td{
    padding-top:10px;
    padding-bottom:10px;
  }

  .drawer-bootom-button {
    position: absolute;
    bottom: -8px;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }
</style>