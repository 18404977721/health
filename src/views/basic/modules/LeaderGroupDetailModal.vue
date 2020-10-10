<!--<template>-->
  <!--<a-drawer-->
    <!--:title="title"-->
    <!--:maskClosable="true"-->
    <!--width=650-->
    <!--placement="right"-->
    <!--:closable="true"-->
    <!--@close="close"-->
    <!--:visible="visible"-->
    <!--style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">-->

    <!--<a-form>-->
      <!--<a-form-item label='所拥有的领导'>-->
        <!--<a-tree-->
                <!--checkable-->
                <!--:treeData="leaderList"-->
                <!--:checkedKeys="selectedGroups"-->
                <!--@check="this.onCheck"-->
        <!--&gt;-->
        <!--</a-tree>-->
        <!--&lt;!&ndash;<a-tree&ndash;&gt;-->
          <!--&lt;!&ndash;checkable&ndash;&gt;-->
          <!--&lt;!&ndash;@check="onCheck"&ndash;&gt;-->
          <!--&lt;!&ndash;:checkedKeys="checkedKeys"&ndash;&gt;-->
          <!--&lt;!&ndash;:treeData="treeData"&ndash;&gt;-->
          <!--&lt;!&ndash;@expand="onExpand"&ndash;&gt;-->
          <!--&lt;!&ndash;@select="onTreeNodeSelect"&ndash;&gt;-->
          <!--&lt;!&ndash;:expandedKeys="expandedKeysss"&ndash;&gt;-->
          <!--&lt;!&ndash;:checkStrictly="checkStrictly">&ndash;&gt;-->
          <!--&lt;!&ndash;<span slot="hasDatarule" slot-scope="{slotTitle,icon}">&ndash;&gt;-->
            <!--&lt;!&ndash;{{ slotTitle }}<a-icon v-if="icon" type="align-left" style="margin-left:5px;color: red;"></a-icon>&ndash;&gt;-->
          <!--&lt;!&ndash;</span>&ndash;&gt;-->
        <!--&lt;!&ndash;</a-tree>&ndash;&gt;-->
      <!--</a-form-item>-->
    <!--</a-form>-->

    <!--<div class="drawer-bootom-button">-->
      <!--&lt;!&ndash;<a-dropdown style="float: left" :trigger="['click']" placement="topCenter">&ndash;&gt;-->
        <!--&lt;!&ndash;<a-menu slot="overlay">&ndash;&gt;-->
          <!--&lt;!&ndash;<a-menu-item key="1" @click="switchCheckStrictly(1)">父子关联</a-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-menu-item key="2" @click="switchCheckStrictly(2)">取消关联</a-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</a-menu>&ndash;&gt;-->
        <!--&lt;!&ndash;<a-button>&ndash;&gt;-->
          <!--&lt;!&ndash;树操作 <a-icon type="up" />&ndash;&gt;-->
        <!--&lt;!&ndash;</a-button>&ndash;&gt;-->
      <!--&lt;!&ndash;</a-dropdown>&ndash;&gt;-->
      <!--<a-popconfirm title="确定放弃编辑？" @confirm="close" okText="确定" cancelText="取消">-->
        <!--<a-button style="margin-right: .8rem">取消</a-button>-->
      <!--</a-popconfirm>-->
      <!--<a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>-->
    <!--</div>-->
  <!--</a-drawer>-->

<!--</template>-->
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
        <a-form-item label="所拥有的领导" :labelCol="labelCol" :wrapperCol="wrapperCol" >
          <a-tree
                  checkable
                  :treeData="groupList"
                  :checkedKeys="leaderIds"
                  @check="this.onCheck"
          >
          </a-tree>

          <!--<a-select-->
          <!--mode="multiple"-->
          <!--style="width: 100%;height:100%;"-->
          <!--placeholder="请选择分组"-->
          <!--v-model="selectedGroups">-->
          <!--<a-select-option v-for="(group,groupindex) in groupList" :key="groupindex.toString()" :value="group.id">-->
          <!--{{ group.groupName }}({{group.description}})-->
          <!--</a-select-option>-->
          <!--</a-select>-->
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
  import {queryTreeListForLeaderGroup,queryLeaderGroupLeaders,saveLeaderGroupLeaders} from '@/api/api'

  export default {
    name: "LeaderGroupDetailModal",
    components:{
    },
    data(){
      return {
        modalWidth:800,
        drawerWidth:700,
        modaltoggleFlag:true,
        confirmDirty: false,
        groupId:"", //保存单位id
        disableSubmit:false,
        title:"领导分组配置",
        visible: false,
        model: {},
        groupList:[],
        leaderIds:[],
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

      onCheck (leaderIds) {
        this.leaderIds = leaderIds;
      },
      initialGroupList(){
        queryTreeListForLeaderGroup().then((res)=>{
          if(res.success){
            this.groupList = res.result;
            this.loadUserGroups(this.groupId);
          }else{
            console.log(res.message);
          }
        });
      },
      loadUserGroups(groupId){
        queryLeaderGroupLeaders({groupId:groupId}).then((res)=>{

          if(res.success){
            this.leaderIds = res.result;
          }else{
            console.log(res.message);
          }
        });
      },
      edit (groupId) {
        let that = this;
        that.initialGroupList();
        that.form.resetFields();
        that.groupId = groupId;
        that.visible = true;
      },
      close () {
        this.$emit('close');
        this.visible = false;
        this.disableSubmit = false;
        this.leaderIds = [];
      },
      handleSubmit () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let formData = Object.assign(this.model, values);
            formData.groupId = this.groupId;
            formData.leaderIds = this.leaderIds.length>0?this.leaderIds.join(","):'';
            let obj;
            obj=saveLeaderGroupLeaders(formData);

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


      //
      // onTreeNodeSelect(id){
      //   this.$refs.datarule.show(id[0],this.groupId)
      // },
      // onCheck (o) {
      //   if(this.checkStrictly){
      //     this.checkedKeys = o.checked;
      //   }else{
      //     this.checkedKeys = o
      //   }
      // },
      // show(groupId){
      //   this.groupId=groupId
      //   this.visible = true;
      // },
      // close () {
      //   this.reset()
      //   this.$emit('close');
      //   this.visible = false;
      // },
      // onExpand(expandedKeys){
      //   this.expandedKeysss = expandedKeys;
      //   this.autoExpandParent = false
      // },
      // reset () {
      //   this.expandedKeysss = []
      //   this.checkedKeys = []
      //   this.defaultCheckedKeys = []
      //   this.loading = false
      // },
      // expandAll () {
      //   this.expandedKeysss = this.allTreeKeys
      // },
      // closeAll () {
      //   this.expandedKeysss = []
      // },
      // checkALL () {
      //   this.checkedKeys = this.allTreeKeys
      // },
      // cancelCheckALL () {
      //   //this.checkedKeys = this.defaultCheckedKeys
      //   this.checkedKeys = []
      // },
      // switchCheckStrictly (v) {
      //   if(v==1){
      //     this.checkStrictly = false
      //   }else if(v==2){
      //     this.checkStrictly = true
      //   }
      // },
      // handleCancel () {
      //   this.close()
      // },
      // handleSubmit(){
      //   let that = this;
      //   let params =  {
      //     departIds:that.checkedKeys.join(","),
      //     groupId:that.groupId
      //   };
      //   that.loading = true;
      //   console.log("请求参数：",params);
      //   saveLeaderGroupLeaders(params).then((res)=>{
      //     if(res.success){
      //       that.$message.success(res.message);
      //       that.loading = false;
      //       that.close();
      //     }else {
      //       that.$message.error(res.message);
      //       that.loading = false;
      //       that.close();
      //     }
      //   })
      // },
    },
  // watch: {
  //   visible () {
  //     if (this.visible) {
  //       queryTreeListForLeaderGroup().then((res) => {
  //
  //         if(res.success){
  //           this.leaderList = res.result;
  //           queryLeaderGroupLeaders({groupId:this.groupId}).then((res)=>{
  //             if(res.success){
  //               this.selectedGroups = res.result;
  //             }else{
  //               console.log(res.message);
  //             }
  //                 // this.checkedKeys = [...res.result];
  //                 // this.defaultCheckedKeys = [...res.result];
  //                 // this.expandedKeysss = this.allTreeKeys;
  //                 // //console.log(this.defaultCheckedKeys)
  //             })
  //         }else{
  //           console.log(res.message);
  //         }
  //         // this.treeData = res.result.treeList
  //         // this.allTreeKeys = res.result.ids
  //         // queryLeaderGroupLeaders({groupId:this.groupId}).then((res)=>{
  //         //     this.checkedKeys = [...res.result];
  //         //     this.defaultCheckedKeys = [...res.result];
  //         //     this.expandedKeysss = this.allTreeKeys;
  //         //     //console.log(this.defaultCheckedKeys)
  //         // })
  //       })
  //     }
  //   }
  // }
  }

</script>
<style lang="scss" scoped>
  .drawer-bootom-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }

</style>