<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    width=650
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <a-form>
      <a-form-item label='选择管辖的部门'>
        <a-tree
          checkable
          @check="onCheck"
          :checkedKeys="checkedKeys"
          :treeData="treeData1"
          @expand="onExpand"
          :expandedKeys="expandedKeysss"
          :checkStrictly="checkStrictly">
        </a-tree>
      </a-form-item>
    </a-form>

    <div class="drawer-bootom-button">
      <a-dropdown style="float: left" :trigger="['click']" placement="topCenter">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="switchCheckStrictly(1)">父子关联</a-menu-item>
          <a-menu-item key="2" @click="switchCheckStrictly(2)">取消关联</a-menu-item>
          <a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>
          <a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>
          <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
          <a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>
        </a-menu>
        <a-button>
          树操作 <a-icon type="up" />
        </a-button>
      </a-dropdown>
      <a-popconfirm title="确定放弃编辑？" @confirm="close" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit" type="primary" :loading="loading">提交</a-button>
    </div>


  </a-drawer>

</template>
<script>
  //import {queryTreeListForRole,queryRolePermission,saveRolePermission} from '@/api/api'
  import {getUsercenterAction,postUsercenterAction} from "@/api/manage";

  export default {
    name: "LeaderManageDepartModal",
    components:{
    },
    data(){
      return {
        leaderId:"",
        treeData: [],//后台返回数据集合
        treeData1:[],//后台加工过的数据
        reData:[],//原始领导管理部门
        cancelData:[],//要取消的部门
        checkedKeys:[],//所有选中节点的集合
        expandedKeysss:[],
        allTreeKeys:[],//所有节点
        autoExpandParent: true,//自动展开父节点
        checkStrictly: true,//子父级节点关联控制的属性
        title:"领导管辖部门配置",
        visible: false,
        leaderGroupCode:"140000000000",
        loading: false,
      }
    },
    methods: {
      onCheck (o) {
        if(this.checkStrictly){
          this.checkedKeys = o.checked;
        }else{
          this.checkedKeys = o
        }
      },
      show(leaderId,leaderGroupCode){
        this.leaderId=leaderId;
        this.leaderGroupCode = leaderGroupCode;

        this.visible = true;

      },
      //放弃编辑按钮
      close () {
        this.reset()
        this.$emit('close');
        this.visible = false;
      },
      onExpand(expandedKeys){
        this.expandedKeysss = expandedKeys;
        this.autoExpandParent = false
      },
      reset () {
        this.expandedKeysss = []
        this.checkedKeys = []
        this.loading = false
      },
      //展开所有
      expandAll () {
        this.expandedKeysss = this.allTreeKeys
      },
      //树节点合并
      closeAll () {
        this.expandedKeysss = []
      },
      //选择所有节点
      checkALL () {
        this.checkedKeys = this.allTreeKeys
      },
      //取消选择所有节点
      cancelCheckALL () {
        //this.checkedKeys = this.defaultCheckedKeys
        this.checkedKeys = []
      },
      //子父级节点是否关联方法
      switchCheckStrictly (v) {
        if(v==1){
          this.checkStrictly = false
        }else if(v==2){
          this.checkStrictly = true
        }
      },
      //取消
      handleCancel () {
        this.close()
      },
      //提交逻辑
      handleSubmit(){
        let that = this;
        /*for(var i = 0; i < that.reData.length; i++){
          if(that.checkedKeys.indexOf(that.reData[i])<0){
            that.cancelData.push(that.reData[i])
          }
        }*/
        //alert(that.cancelData);
        let params =  {
          permissionIds:that.checkedKeys.join(","),
          leaderId:that.leaderId,
          //cancelData:that.cancelData.join(",")
          reData:that.reData
        };
        that.loading = true;
        console.log("请求参数：",params);
        //alert(JSON.stringify(params));
        let url="/common/leader/saveLeadManageDepart";
        postUsercenterAction(url,params).then((res)=>{
          if(res.success){
            that.$message.success(res.message);
            that.loading = false;
            that.close();
          }else {
            that.$message.error(res.message);
            that.loading = false;
            that.close();
          }
        })
      },
    },
  watch: {
    visible () {
      let that = this;
      if (this.visible) {
        let url="/common/leader/departTreeList?parentId="+that.leaderGroupCode;
        getUsercenterAction(url).then((res) => {
          this.treeData = res.result.treeList
          this.allTreeKeys = res.result.ids
          var output={};
          res.result.treeList.forEach(function(i){
            if(res.result.ids.indexOf(i.parentId)>-1){
              if(!output[i.parentId]){
                output[i.parentId]={
                  //title:i.parentId,
                  title:"下属部门",
                  key:i.parentId,
                  children:[]
                };
              }
              var obj={
                title:i.departName,
                key:i.id
              }
              output[i.parentId].children.push(obj)
            }
          })
          var result=[];
          for(var key in output){
            result.push(output[key]);
          }
         // console.log(result)
          this.treeData1 = result
        })

        //回显所有已选择部门
        let reurl="/common/leader/leaderManageDepartData";
        let params =  {
          leaderId:that.leaderId
        };
        console.log("请求参数：",params);
        postUsercenterAction(reurl,params).then((res)=>{

          that.checkedKeys = res.result
          that.reData = res.result

        })
      }
    }
  }
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