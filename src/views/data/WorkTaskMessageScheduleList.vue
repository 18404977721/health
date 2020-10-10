<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="任务id">
              <a-input placeholder="请输入任务id" v-model="queryParam.taskId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="任务开始时间">
              <a-input placeholder="请输入任务开始时间" v-model="queryParam.taskTime"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="承办部门id">
              <a-input placeholder="请输入承办部门id" v-model="queryParam.departId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="计划时间1天">
              <a-input placeholder="请输入计划时间1天" v-model="queryParam.planTime1"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="计划时间3天">
              <a-input placeholder="请输入计划时间3天" v-model="queryParam.planTime3"></a-input>
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
    <workTaskMessageSchedule-modal ref="modalForm" @ok="modalFormOk"></workTaskMessageSchedule-modal>
  </a-card>
</template>

<script>
  import WorkTaskMessageScheduleModal from './modules/WorkTaskMessageScheduleModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "WorkTaskMessageScheduleList",
    mixins:[JeecgListMixin],
    components: {
      WorkTaskMessageScheduleModal
    },
    data () {
      return {
        description: '任务事项1371各节点定时扫描信息管理页面',
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
            title: '任务id',
            align:"center",
            dataIndex: 'taskId'
           },
		   {
            title: '任务开始时间',
            align:"center",
            dataIndex: 'taskTime'
           },
		   {
            title: '承办部门id',
            align:"center",
            dataIndex: 'departId'
           },
		   {
            title: '计划时间1天',
            align:"center",
            dataIndex: 'planTime1'
           },
		   {
            title: '计划时间3天',
            align:"center",
            dataIndex: 'planTime3'
           },
		   {
            title: '计划时间7天',
            align:"center",
            dataIndex: 'planTime7'
           },
		   {
            title: '计划时间30天',
            align:"center",
            dataIndex: 'planTime30'
           },
		   {
            title: '计划时间状态位1   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime1Status'
           },
		   {
            title: '计划时间状态位1   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime1RepeatStatus'
           },
		   {
            title: '计划时间状态位1   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime3RepeatStatus'
           },
		   {
            title: '计划时间状态位1   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime7RepeatStatus'
           },
		   {
            title: '计划时间状态位1   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime30RepeatStatus'
           },
		   {
            title: '计划时间状态位3   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime3Status'
           },
		   {
            title: '计划时间状态位7   0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime7Status'
           },
		   {
            title: '计划时间状态位30  0未发送 1已发送',
            align:"center",
            dataIndex: 'planTime30Status'
           },
		   {
            title: '反馈时间',
            align:"center",
            dataIndex: 'feedbackTime'
           },
		   {
            title: '反馈时间',
            align:"center",
            dataIndex: 'endTime'
           },
		   {
            title: '是否逻辑删除 0未删除 1已删除',
            align:"center",
            dataIndex: 'status'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/data/workTaskMessageSchedule/list",
          delete: "/data/workTaskMessageSchedule/delete",
          deleteBatch: "/data/workTaskMessageSchedule/deleteBatch",
          exportXlsUrl: "data/workTaskMessageSchedule/exportXls",
          importExcelUrl: "data/workTaskMessageSchedule/importExcel",
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