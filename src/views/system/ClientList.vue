<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="应用标识">
              <a-input placeholder="请输入应用标识" v-model="queryParam.clientId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="应用描述">
              <a-input placeholder="请输入应用描述" v-model="queryParam.clientDesc"></a-input>
            </a-form-item>
          </a-col>
        
          <a-col :md="6" :sm="8">
            <a-form-item label="应用密钥(明文)">
              <a-input placeholder="请输入应用密钥(明文)" v-model="queryParam.clientSecretStr"></a-input>
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

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
     
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
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <client-modal ref="modalForm" @ok="modalFormOk"></client-modal>
  </a-card>
</template>

<script>
  import ClientModal from './modules/ClientModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "ClientList",
    mixins:[JeecgListMixin],
    components: {
      ClientModal
    },
    data () {
      return {
        description: '应用管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
           },
		   {
            title: '应用标识',
            align:"center",
            dataIndex: 'clientId'
           },
		   {
            title: '应用描述',
            align:"center",
            dataIndex: 'clientDesc'
           },
		   {
            title: '应用密钥(bcyt) 加密',
            align:"center",
            dataIndex: 'clientSecret'
           },
		   {
            title: '应用密钥(明文)',
            align:"center",
            dataIndex: 'clientSecretStr'
           },
		   
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/client/pageList",
          delete: "/client/delete"
       },
    }
  },
  computed: {
    importExcelUrl: function(){
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
    }
  },
    methods: {
     
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