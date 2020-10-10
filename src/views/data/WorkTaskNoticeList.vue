<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="taskId">
              <a-input placeholder="请输入taskId" v-model="queryParam.taskId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="任务类型">
              <a-input placeholder="请输入任务类型" v-model="queryParam.sourceType"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="任务类型名称">
              <a-input placeholder="请输入任务类型名称" v-model="queryParam.sourceTypeName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="任务类型id">
              <a-input placeholder="请输入任务类型id" v-model="queryParam.sourceTypeId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="通报标题">
              <a-input placeholder="请输入通报标题" v-model="queryParam.noticeTitle"></a-input>
            </a-form-item>
          </a-col>
        </template>
          <a-col :md="6" :sm="8" >
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

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
    <workTaskNotice-modal ref="modalForm" @ok="modalFormOk"></workTaskNotice-modal>
  </a-card>
</template>

<script>
  import WorkTaskNoticeModal from './modules/WorkTaskNoticeModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "WorkTaskNoticeList",
    mixins:[JeecgListMixin],
    components: {
      WorkTaskNoticeModal
    },
    data () {
      return {
        description: '任务事项通报信息记录管理页面',
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
            title: 'taskId',
            align:"center",
            dataIndex: 'taskId'
           },
		   {
            title: '任务类型',
            align:"center",
            dataIndex: 'sourceType'
           },
		   {
            title: '任务类型名称',
            align:"center",
            dataIndex: 'sourceTypeName'
           },
		   {
            title: '任务类型id',
            align:"center",
            dataIndex: 'sourceTypeId'
           },
		   {
            title: '通报标题',
            align:"center",
            dataIndex: 'noticeTitle'
           },
		   {
            title: '通报内容',
            align:"center",
            dataIndex: 'noticeContent'
           },
		   {
            title: '通报落款',
            align:"center",
            dataIndex: 'noticeClose'
           },
		   {
            title: '通报时间',
            align:"center",
            dataIndex: 'noticeTime'
           },
		   {
            title: '通报状态：0隐藏 1展示',
            align:"center",
            dataIndex: 'noticeStatus'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/data/workTaskNotice/list",
          delete: "/data/workTaskNotice/delete",
          deleteBatch: "/data/workTaskNotice/deleteBatch",
          exportXlsUrl: "data/workTaskNotice/exportXls",
          importExcelUrl: "data/workTaskNotice/importExcel",
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