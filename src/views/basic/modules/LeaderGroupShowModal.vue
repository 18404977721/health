<template>
  <a-drawer
    title="分组包含的领导"
    :maskClosable="true"
    width=650
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-button type="primary" @click="show(groupId)" style="margin-bottom:20px;">刷新</a-button>
    <a-list
      bordered
      :dataSource="treeData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <span>{{item.leaderName}}</span>
        <a-input  v-model="item.sortNo" :id="item.id" type="number" class='oinput' style="width:150px;margin-left:20px;"/>
        <span style="cursor:pointer;width:50px;" @click="save(item)">保存</span>
        <span style="cursor:pointer;width:50px;" @click="del(item)">删除</span>
      </a-list-item>
      <div slot="header" style="color:red;">共{{dataCount}}个领导</div>
    </a-list>
  </a-drawer>

</template>
<script>
  import {queryLeaderGroupLeadersName} from '@/api/api'
  import { putUsercenterAction } from '@/api/manage';

  export default {
    name: "DepartGroupShowModal",
    components:{
    },
    data(){
      return {
        groupId:"",
        visible:false,
        treeData: [],
        dataCount:0,
      }
    },
    methods: {
      show(groupId){
        let that = this;
        that.groupId=groupId
        that.visible = true;
        queryLeaderGroupLeadersName({groupId:that.groupId}).then((res)=>{
          that.treeData = res.result;
          if(that.treeData!=null){
            that.dataCount = that.treeData.length;
          }

        })
      },
      close () {
        this.visible = false;
      },
      save(item){
        var id= item.id;
        var sortNo = document.getElementById(id).value;
        if(sortNo==''){
          this.$notification.open({
            message: '排序不能为空',
            description: '',
            onClick: () => {
            },
          });
        }else{
          var url = "/common/leaderGroup/updateLeaderGroupLeaderSort?detailId="+id+'&sortNo='+sortNo;
          putUsercenterAction(url).then((res) => {
            if (res.success) {
              this.$notification.open({
                message: '修改成功',
                description: '',
                onClick: () => {
                },
              });
            }
          })
        }
      },
      del(item){
        var id= item.id;
        let that = this;
        var url = "/common/leaderGroup/deleteLeaderGroupLeaderDetail?detailId="+id;
        putUsercenterAction(url).then((res) => {
          if (res.success) {
            that.show(that.groupId);
            this.$notification.open({
              message: '删除成功',
              description: '',
              onClick: () => {
              },
            });
          }
        })
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
  span{
    display:inline-block;width:200px;text-align:center;height:30px;line-height:30px;
  }
</style>