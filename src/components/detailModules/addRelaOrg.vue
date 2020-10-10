<template>
  <a-modal
    :title="title"
    :width="500"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="setRelaOrgData"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <div>
        <a-alert
          v-if="orgFlag"
          :message="'已向 '+currentOrg+'发起协办，请勿重复选择'"
          type="error"
        />
        <a-row :gutter="16" style="margin-bottom: 15px">
          <a-col :span="8">
            <label>联系人：</label>
            <a-input placeholder="联系人" id="linkPerson"></a-input>
          </a-col>
          <a-col :span="16">
            <label>联系方式：</label>
            <a-input placeholder="联系方式" id="linkMobile"></a-input>
          </a-col>
        </a-row>
        <div style="margin-bottom: 15px">
          <label>协办要求：</label>
          <a-textarea placeholder="协办要求" id="organizedDesc" :rows="4" maxLength="350"/>
        </div>
        <div style="margin-bottom: 15px">
          <label>协办单位：</label>
          <a-tree-select
            :getPopupContainer="getPopupContainer"
            :dropdownStyle="{ maxHeight: '350px', overflow: 'auto'}"
            style="width: 100%"
            :treeData="treeData"
            @change="onChange"
            treeCheckStrictly
            treeCheckable
            searchPlaceholder=''
          />
        </div>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
  import { getAction,getUsercenterAction,postAction } from '@/api/manage'

  export default {
    name: 'addRelaOrg',
    data() {
      return {
        treeData: [],
        visible: false,
        title: '协办任务',
        value: [],
        confirmLoading: false,
        currentOrg:"",
        orgFlag:false,

        taskId:"",
        orgTabsVo:[],
      }
    },
    methods: {
      getPopupContainer(trigger) {
        return trigger.parentElement
      },
      onChange(value) {
        this.value = [];
        for(let i = 0;i < value.length;i++){
          this.value.push(value[i].value)
        }
      },
      setRelaOrgData() {
        let that = this;
        let obj = {};
        let count = 0;
        for(let i = 0;i < this.orgTabsVo.length;i++){
          for(let j = 0;j < this.value.length;j++){
            if(this.orgTabsVo[i].departId == this.value[j]){
              this.currentOrg+=this.orgTabsVo[i].orgName+" "
              count++;
            }
          }
        }
        let url = '/task/workTaskFeedback/organize';
        if(count == 0) {//本次选择协办单位都为新增协办单位
          obj['organizedDepartList'] = this.value;
          obj['organizedDesc'] = document.getElementById('organizedDesc').value;
          obj['linkPerson'] = document.getElementById('linkPerson').value;
          obj['linkMobile'] = document.getElementById('linkMobile').value;
          obj['taskId'] = this.taskId;
          that.confirmLoading = true;
          postAction(url, obj).then((res) => {
            if (res.success) {
              this.$notification['success']({
                message: res.message,
                description: ''
              })
            } else {
              this.$notification['error']({
                message: res.message,
                description: ''
              })
            }
          }).finally(() => {
            that.confirmLoading = false;
            that.$emit('pageReload');
            that.close();
          })
        }else{
          this.orgFlag = true
        }

      },
      openAddOrgView(id,orgTabsVo) {
        this.taskId = id;
        this.orgTabsVo = orgTabsVo
        this.visible = true
        this.confirmLoading = false
        this.getRegionList()
      },
      handleCancel() {
        this.visible = false
        this.close()
      },
      close() {
        this.visible = false
      },
      getRegionList() {
        var url = '/common/region/cooperation'
        getUsercenterAction(url).then((res) => {
          if (res.success) {
            this.treeData = res.result
          }
        })
      }
    }
  }

</script>

<style scoped>

</style>