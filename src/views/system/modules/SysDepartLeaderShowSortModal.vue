<template>
  <a-drawer
    title="包含的领导分组排序"
    :maskClosable="true"
    width=650
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-button type="primary" @click="show(departId)" style="margin-bottom:20px;">刷新</a-button>
    <a-list
      bordered
      :dataSource="treeData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <span>{{item.groupName}}</span>
        <a-input v-model="item.sortNo" :id="item.id" type="number" style="width:150px;margin-left:20px;"/>
        <span style="cursor:pointer;" @click="save(item)">保存</span>
      </a-list-item>
      <div slot="header" style="color:red;">共{{dataCount}}个分组</div>
    </a-list>
  </a-drawer>

</template>
<script>
  import {queryDepartLeaderShowGroupInfo} from '@/api/api'
  import { putUsercenterAction } from '@/api/manage';

  export default {
    name: "SysDepartLeaderCommentSortModal",
    components:{
    },
    data(){
      return {
        departId:"",
        visible:false,
        treeData: [],
        dataCount:0,
      }
    },
    methods: {
      show(departId){
        let that = this;
        this.departId=departId
        this.visible = true;
        queryDepartLeaderShowGroupInfo({departId:that.departId}).then((res)=>{
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
          var url = "/sysdepart/sysDepart/updateDepartLeaderShowGroupSort?indexId="+id+'&sortNo='+sortNo;
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
    display:inline-block;width:160px;text-align:center;height:30px;line-height:30px;
  }
</style>