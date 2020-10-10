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

        <a-form-item
          label="省/市直单独显示"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          >
        <a-select
          mode="multiple"
          style="width: 500px;height:100%;"
          placeholder="请选择分组"
          v-model="untiGroupIds">
          <a-select-option  v-for="(group,groupindex) in groupList" :key="groupindex.toString()" :value="group.id">
            {{ group.groupName }}({{group.description}})
          </a-select-option>
        </a-select>
        </a-form-item>
        <a-form-item
          label="下级行政区显示"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select
            mode="multiple"
            style="width: 500px;height:100%;"
            placeholder="请选择分组"
            v-model="areaGroupIds">
            <a-select-option  v-for="(group,groupindex) in groupList" :key="groupindex.toString()" :value="group.id">
              {{ group.groupName }}({{group.description}})
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="省/市直按组显示"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select
            mode="multiple"
            style="width: 500px;height:100%;"
            placeholder="请选择分组"
            v-model="otherGroupIds">
            <a-select-option  v-for="(group,groupindex) in groupList" :key="groupindex.toString()" :value="group.id">
              {{ group.groupName }}({{group.description}})
            </a-select-option>
          </a-select>
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
  import {editBasicRegionScreenDataGroup,queryBasicRegionScreenDataGroup,queryallDepartGroup } from '@/api/api'

  export default {
    name: "BasicRegionScreenDataModal",
    components: {
      editBasicRegionScreenDataGroup,
      queryBasicRegionScreenDataGroup
    },
    data () {
      return {
        modalWidth:800,
        drawerWidth:700,
        modaltoggleFlag:true,
        confirmDirty: false,
        regionCode:"", //保存行政区划码
        disableSubmit:false,
        title:"数据权限授权",
        visible: false,
        model: {},
        groupList:[],
        untiGroupIds:[],
        areaGroupIds:[],
        otherGroupIds:[],
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
        radioStyle: {
          display: 'block',
          height: '50px',
          lineHeight: '50px',
        },
      }
    },
    methods: {

      initialGroupList(){
        queryallDepartGroup().then((res)=>{
          if(res.success){
            this.groupList = res.result;
          }else{
            console.log(res.message);
          }
        });
      },
      loadRegionGroups(regionCode){
        queryBasicRegionScreenDataGroup({regionCode:regionCode}).then((res)=>{
          if(res.success){
            if(res.result!=null){
              this.untiGroupIds = res.result.untiGroupIds;
              this.areaGroupIds = res.result.areaGroupIds;
              this.otherGroupIds = res.result.otherGroupIds;
            }
          }else{
            console.log(res.message);
          }
        });
      },
      edit (regionCode) {
        let that = this;
        that.initialGroupList();
        that.form.resetFields();
        that.regionCode = regionCode;
        that.loadRegionGroups(regionCode);
        that.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.untiGroupIds = [];
        this.areaGroupIds = [];
        this.otherGroupIds = [];
      },
      handleSubmit () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(that.model, values);
            formData.regionCode = that.regionCode;
            formData.untiGroupIds = that.untiGroupIds.length>0?that.untiGroupIds.join(","):'';
            formData.areaGroupIds = that.areaGroupIds.length>0?that.areaGroupIds.join(","):'';
            formData.otherGroupIds = that.otherGroupIds.length>0?that.otherGroupIds.join(","):'';
            let obj;
            obj=editBasicRegionScreenDataGroup(formData);

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

  .radioStyle {
    display:block;
    height:30px;
    lineHeight: 30px;
  }
</style>