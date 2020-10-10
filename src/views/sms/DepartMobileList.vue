<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="单位编码">
              <a-input hidden placeholder="请输入单位编码" v-model="queryParam.departCode"></a-input>
              <a-cascader  :showSearch="filter" :options="options"  placeholder="请选择单位" changeOnSelect @change="onAreaChange" />
            </a-form-item>
          </a-col>
        <a-col :md="6" :sm="8">
            <a-form-item label="单位名称">
              <a-input placeholder="请输入单位名称" v-model="queryParam.departName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- table区域-begin -->
    <div>
      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        @change="handleTableChange">

        <span slot="action" slot-scope="text, record">
          <a v-has="'btn:edit'" @click="handleEdit(record)">编辑</a>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <depart-mobile-modal ref="modalForm" @ok="modalFormOk"></depart-mobile-modal>
  </a-card>
</template>

<script>
  import Vue from 'vue'
  import {USER_INFO} from "@/store/mutation-types"
  import DepartMobileModal from './modules/DepartMobileModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getUsercenterAction } from '@/api/manage';

  export default {
    name: "DepartMobileList",
    mixins:[JeecgListMixin],
    components: {
      DepartMobileModal,
    },
    data () {
      return {
        description: '单位管理页面',
        // 表头
        columns: [
          {
            title: '所属行政区',
            align:"center",
            dataIndex: 'regionName'
          },
		   {
            title: '单位名称',
            align:"center",
            dataIndex: 'departName'
           },
          {
            title: '领导姓名',
            align:"center",
            dataIndex: 'mobileLeaderName'
          },
          {
            title: '手机',
            align:"center",
            dataIndex: 'mobileLeader'
          },
          {
            title: '办公室主任',
            align:"center",
            dataIndex: 'mobileHeadName'
          },
          {
            title: '手机',
            align:"center",
            dataIndex: 'mobileHead'
          },
          {
            title: '承办人员',
            align:"center",
            dataIndex: 'mobileName'
          },
          {
            title: '手机',
            align:"center",
            dataIndex: 'mobile'
          },
          // {
          //   title: '主管领导姓名',
          //   align:"center",
          //   dataIndex: 'mobileLeader2Name'
          // },
          // {
          //   title: '手机',
          //   align:"center",
          //   dataIndex: 'mobileLeader2'
          // },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/sms/mobile/list",
       },
        options: [],
        filter:true
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    created() {
      this.getMsg();
      //获取登陆用户信息
      const userInfo = Vue.ls.get(USER_INFO);
      if(userInfo.username.indexOf('secretary')!=-1){
        this.columns = [
          {
            title: '单位名称',
            align:"center",
            dataIndex: 'departName'
          },
          {
            title: '领导姓名',
            align:"center",
            dataIndex: 'mobileLeaderName'
          },
          {
            title: '手机',
            align:"center",
            dataIndex: 'mobileLeader'
          },
          {
            title: '处室负责人',
            align:"center",
            dataIndex: 'mobileHeadName'
          },
          {
            title: '手机',
            align:"center",
            dataIndex: 'mobileHead'
          },
          {
            title: '承办人员',
            align:"center",
            dataIndex: 'mobileName'
          },
          {
            title: '手机',
            align:"center",
            dataIndex: 'mobile'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ]
      }
    },
    methods: {
      //获取页面初始化数据
      getMsg(){
        var that = this;
        var url = "/common/region/queryTreeListCascade";
        getUsercenterAction(url).then((res) => {
          if (res.success) {
            that.options = res.result;
          }
        })
      },
      //区域变化的事件
      onAreaChange(value){
        this.queryParam.departCode = value[value.length-1];
      },
    }
  }
</script>
<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 3px
  }
  .ant-card-body .table-operator{
    margin-bottom: 18px;
  }
  .ant-table-tbody .ant-table-row td{
    padding-top:15px;
    padding-bottom:15px;
  }
  .anty-row-operator button{margin: 0 5px}
  .ant-btn-danger{background-color: #ffffff}

  .ant-modal-cust-warp{height: 100%}
  .ant-modal-cust-warp .ant-modal-body{height:calc(100% - 110px) !important;overflow-y: auto}
  .ant-modal-cust-warp .ant-modal-content{height:90% !important;overflow-y: hidden}
</style>