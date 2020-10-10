<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="任务来源id">
              <a-input placeholder="请输入任务来源id" v-model="queryParam.sourceId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="任务编码">
              <a-input placeholder="请输入任务编码" v-model="queryParam.taskCode"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="任务名称">
              <a-input placeholder="请输入任务名称" v-model="queryParam.taskName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="事项内容">
              <a-input placeholder="请输入事项内容" v-model="queryParam.taskContent"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="任务接收时间">
              <a-input placeholder="请输入任务接收时间" v-model="queryParam.taskTime"></a-input>
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
    <workTask-modal ref="modalForm" @ok="modalFormOk"></workTask-modal>
  </a-card>
</template>

<script>
  import WorkTaskModal from './modules/WorkTaskModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "WorkTaskList",
    mixins:[JeecgListMixin],
    components: {
      WorkTaskModal
    },
    data () {
      return {
        description: '任务事项管理页面',
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
            title: '任务来源id',
            align:"center",
            dataIndex: 'sourceId'
           },
		   {
            title: '任务编码',
            align:"center",
            dataIndex: 'taskCode'
           },
		   {
            title: '任务名称',
            align:"center",
            dataIndex: 'taskName'
           },
		   {
            title: '事项内容',
            align:"center",
            dataIndex: 'taskContent'
           },
		   {
            title: '任务接收时间',
            align:"center",
            dataIndex: 'taskTime'
           },
		   {
            title: '状态 0未移交 1已移交',
            align:"center",
            dataIndex: 'taskStatus'
           },
		   {
            title: '分管领导id',
            align:"center",
            dataIndex: 'leaderId'
           },
		   {
            title: '分管领导名称',
            align:"center",
            dataIndex: 'leaderNameDuty'
           },
		   {
            title: '关联副省长id',
            align:"center",
            dataIndex: 'relateLeaderId'
           },
		   {
            title: '关联副省长姓名',
            align:"center",
            dataIndex: 'relateLeaderName'
           },
		   {
            title: '责任单位id',
            align:"center",
            dataIndex: 'dutyDepartId'
           },
		   {
            title: '责任单位名称',
            align:"center",
            dataIndex: 'dutyDepartName'
           },
		   {
            title: '办结时限 值域1天 3天 7天 1个月',
            align:"center",
            dataIndex: 'limitType'
           },
           // {
           //  title: '当前有反馈的数量',
           //  align:"center",
           //  dataIndex: 'oneFeedback'
           // },
           // {
           //  title: '当前申请完结/已完结数量',
           //  align:"center",
           //  dataIndex: 'oneEnd'
           // },
           // {
           //  title: '当前延期数量',
           //  align:"center",
           //  dataIndex: 'oneDelay'
           // },
           // {
           //  title: '当前阶段总数量',
           //  align:"center",
           //  dataIndex: 'oneTotal'
           // },
           // {
           //  title: '当前有反馈的数量',
           //  align:"center",
           //  dataIndex: 'threeFeedback'
           // },
           // {
           //  title: '当前申请完结/已完结数量',
           //  align:"center",
           //  dataIndex: 'threeEnd'
           // },
           // {
           //  title: '当前延期数量',
           //  align:"center",
           //  dataIndex: 'threeDelay'
           // },
           // {
           //  title: '当前阶段总数量',
           //  align:"center",
           //  dataIndex: 'threeTotal'
           // },
           // {
           //  title: '当前有反馈的数量',
           //  align:"center",
           //  dataIndex: 'sevenFeedback'
           // },
           // {
           //  title: '当前申请完结/已完结数量',
           //  align:"center",
           //  dataIndex: 'sevenEnd'
           // },
           // {
           //  title: '当前延期数量',
           //  align:"center",
           //  dataIndex: 'sevenDelay'
           // },
           // {
           //  title: '当前阶段总数量',
           //  align:"center",
           //  dataIndex: 'sevenTotal'
           // },
           // {
           //  title: '当前有反馈的数量',
           //  align:"center",
           //  dataIndex: 'monthFeedback'
           // },
           // {
           //  title: '当前申请完结/已完结数量',
           //  align:"center",
           //  dataIndex: 'monthEnd'
           // },
           // {
           //  title: '当前延期数量',
           //  align:"center",
           //  dataIndex: 'monthDelay'
           // },
           // {
           //  title: '当前阶段总数量',
           //  align:"center",
           //  dataIndex: 'monthTotal'
           // },
           // {
           //  title: '当前所处阶段,与basic_assign_status对应',
           //  align:"center",
           //  dataIndex: 'currentStage'
           // },
           // {
           //  title: '评价结果',
           //  align:"center",
           //  dataIndex: 'evaluateResult'
           // },
           // {
           //  title: '评价描述',
           //  align:"center",
           //  dataIndex: 'evaluateDesc'
           // },
           // {
           //  title: '评价分数',
           //  align:"center",
           //  dataIndex: 'evaluateScore'
           // },
           // {
           //  title: '评价单位',
           //  align:"center",
           //  dataIndex: 'evaluateDepart'
           // },
           // {
           //  title: '评价时间',
           //  align:"center",
           //  dataIndex: 'evaluateTime'
           // },
           // {
           //  title: '完结时间',
           //  align:"center",
           //  dataIndex: 'overTime'
           // },
           // {
           //  title: '归档时间',
           //  align:"center",
           //  dataIndex: 'archiveTime'
           // },
           // {
           //  title: '审核人',
           //  align:"center",
           //  dataIndex: 'verifyBy'
           // },
           // {
           //  title: '审核意见',
           //  align:"center",
           //  dataIndex: 'verifyDesc'
           // },
           // {
           //  title: '任务标识（前端使用，后台无用',
           //  align:"center",
           //  dataIndex: 'guid'
           // },
           // {
           //  title: 'februaryFeedback',
           //  align:"center",
           //  dataIndex: 'februaryFeedback'
           // },
           // {
           //  title: 'februaryEnd',
           //  align:"center",
           //  dataIndex: 'februaryEnd'
           // },
           // {
           //  title: 'februaryDelay',
           //  align:"center",
           //  dataIndex: 'februaryDelay'
           // },
           // {
           //  title: 'februaryTotal',
           //  align:"center",
           //  dataIndex: 'februaryTotal'
           // },
           // {
           //  title: 'marchFeedback',
           //  align:"center",
           //  dataIndex: 'marchFeedback'
           // },
           // {
           //  title: 'marchEnd',
           //  align:"center",
           //  dataIndex: 'marchEnd'
           // },
           // {
           //  title: 'marchDelay',
           //  align:"center",
           //  dataIndex: 'marchDelay'
           // },
           // {
           //  title: 'marchTotal',
           //  align:"center",
           //  dataIndex: 'marchTotal'
           // },
           // {
           //  title: 'aprilFeedback',
           //  align:"center",
           //  dataIndex: 'aprilFeedback'
           // },
           // {
           //  title: 'aprilEnd',
           //  align:"center",
           //  dataIndex: 'aprilEnd'
           // },
           // {
           //  title: 'aprilDelay',
           //  align:"center",
           //  dataIndex: 'aprilDelay'
           // },
           // {
           //  title: 'aprilTotal',
           //  align:"center",
           //  dataIndex: 'aprilTotal'
           // },
           // {
           //  title: 'mayFeedback',
           //  align:"center",
           //  dataIndex: 'mayFeedback'
           // },
           // {
           //  title: 'mayEnd',
           //  align:"center",
           //  dataIndex: 'mayEnd'
           // },
           // {
           //  title: 'mayDelay',
           //  align:"center",
           //  dataIndex: 'mayDelay'
           // },
           // {
           //  title: 'mayTotal',
           //  align:"center",
           //  dataIndex: 'mayTotal'
           // },
           // {
           //  title: 'juneFeedback',
           //  align:"center",
           //  dataIndex: 'juneFeedback'
           // },
           // {
           //  title: 'juneEnd',
           //  align:"center",
           //  dataIndex: 'juneEnd'
           // },
           // {
           //  title: 'juneDelay',
           //  align:"center",
           //  dataIndex: 'juneDelay'
           // },
           // {
           //  title: 'juneTotal',
           //  align:"center",
           //  dataIndex: 'juneTotal'
           // },
           // {
           //  title: 'julyFeedback',
           //  align:"center",
           //  dataIndex: 'julyFeedback'
           // },
           // {
           //  title: 'julyEnd',
           //  align:"center",
           //  dataIndex: 'julyEnd'
           // },
           // {
           //  title: 'julyDelay',
           //  align:"center",
           //  dataIndex: 'julyDelay'
           // },
           // {
           //  title: 'julyTotal',
           //  align:"center",
           //  dataIndex: 'julyTotal'
           // },
           // {
           //  title: 'augustFeedback',
           //  align:"center",
           //  dataIndex: 'augustFeedback'
           // },
           // {
           //  title: 'augustEnd',
           //  align:"center",
           //  dataIndex: 'augustEnd'
           // },
           // {
           //  title: 'augustDelay',
           //  align:"center",
           //  dataIndex: 'augustDelay'
           // },
           // {
           //  title: 'augustTotal',
           //  align:"center",
           //  dataIndex: 'augustTotal'
           // },
           // {
           //  title: 'septemberFeedback',
           //  align:"center",
           //  dataIndex: 'septemberFeedback'
           // },
           // {
           //  title: 'septemberEnd',
           //  align:"center",
           //  dataIndex: 'septemberEnd'
           // },
           // {
           //  title: 'septemberDelay',
           //  align:"center",
           //  dataIndex: 'septemberDelay'
           // },
           // {
           //  title: 'septemberTotal',
           //  align:"center",
           //  dataIndex: 'septemberTotal'
           // },
           // {
           //  title: 'octoberFeedback',
           //  align:"center",
           //  dataIndex: 'octoberFeedback'
           // },
           // {
           //  title: 'octoberEnd',
           //  align:"center",
           //  dataIndex: 'octoberEnd'
           // },
           // {
           //  title: 'octoberDelay',
           //  align:"center",
           //  dataIndex: 'octoberDelay'
           // },
           // {
           //  title: 'octoberTotal',
           //  align:"center",
           //  dataIndex: 'octoberTotal'
           // },
           // {
           //  title: 'novemberFeedback',
           //  align:"center",
           //  dataIndex: 'novemberFeedback'
           // },
           // {
           //  title: 'novemberEnd',
           //  align:"center",
           //  dataIndex: 'novemberEnd'
           // },
           // {
           //  title: 'novemberDelay',
           //  align:"center",
           //  dataIndex: 'novemberDelay'
           // },
           // {
           //  title: 'novemberTotal',
           //  align:"center",
           //  dataIndex: 'novemberTotal'
           // },
           // {
           //  title: 'decemberFeedback',
           //  align:"center",
           //  dataIndex: 'decemberFeedback'
           // },
           // {
           //  title: 'decemberEnd',
           //  align:"center",
           //  dataIndex: 'decemberEnd'
           // },
           // {
           //  title: 'decemberDelay',
           //  align:"center",
           //  dataIndex: 'decemberDelay'
           // },
           // {
           //  title: 'decemberTotal',
           //  align:"center",
           //  dataIndex: 'decemberTotal'
           // },
           // {
           //  title: 'sixtyDayFeedback',
           //  align:"center",
           //  dataIndex: 'sixtyDayFeedback'
           // },
           // {
           //  title: 'sixtyDayEnd',
           //  align:"center",
           //  dataIndex: 'sixtyDayEnd'
           // },
           // {
           //  title: 'sixtyDayDelay',
           //  align:"center",
           //  dataIndex: 'sixtyDayDelay'
           // },
           // {
           //  title: 'sixtyDayTotal',
           //  align:"center",
           //  dataIndex: 'sixtyDayTotal'
           // },
           // {
           //  title: 'eightyDayFeedback',
           //  align:"center",
           //  dataIndex: 'eightyDayFeedback'
           // },
           // {
           //  title: 'eightyDayEnd',
           //  align:"center",
           //  dataIndex: 'eightyDayEnd'
           // },
           // {
           //  title: 'eightyDayDelay',
           //  align:"center",
           //  dataIndex: 'eightyDayDelay'
           // },
           // {
           //  title: 'eightyDayTotal',
           //  align:"center",
           //  dataIndex: 'eightyDayTotal'
           // },
		   {
            title: '关联评价手机号',
            align:"center",
            dataIndex: 'relatePhone'
           },
		   {
            title: '关联的业务主表id',
            align:"center",
            dataIndex: 'masterTableId'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/data/workTask/list",
          delete: "/data/workTask/delete",
          deleteBatch: "/data/workTask/deleteBatch",
          exportXlsUrl: "data/workTask/exportXls",
          importExcelUrl: "data/workTask/importExcel",
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