<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="任务单位id">
              <a-input placeholder="请输入任务单位id" v-model="queryParam.taskDepartId"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="当前所处阶段,与basic_assign_status对应">
              <a-input placeholder="请输入当前所处阶段,与basic_assign_status对应" v-model="queryParam.currentStage"></a-input>
            </a-form-item>
          </a-col>
        <template v-if="toggleSearchStatus">
        <a-col :md="6" :sm="8">
            <a-form-item label="当前节点状态：1节点落实 2、申请办结 3、申请延期">
              <a-input placeholder="请输入当前节点状态：1节点落实 2、申请办结 3、申请延期" v-model="queryParam.currentStatus"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="反馈所处阶段 007持续推进 081延期 084督办 085通报期">
              <a-input placeholder="请输入反馈所处阶段 007持续推进 081延期 084督办 085通报期" v-model="queryParam.feedbackStage"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="当前进度  百分比值">
              <a-input placeholder="请输入当前进度  百分比值" v-model="queryParam.progress"></a-input>
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
    <workTaskDepartDetail-modal ref="modalForm" @ok="modalFormOk"></workTaskDepartDetail-modal>
  </a-card>
</template>

<script>
  import WorkTaskDepartDetailModal from './modules/WorkTaskDepartDetailModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "WorkTaskDepartDetailList",
    mixins:[JeecgListMixin],
    components: {
      WorkTaskDepartDetailModal
    },
    data () {
      return {
        description: '任务事项办理单位反馈节点信息管理页面',
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
            title: '任务单位id',
            align:"center",
            dataIndex: 'taskDepartId'
           },
		   {
            title: '当前所处阶段,与basic_assign_status对应',
            align:"center",
            dataIndex: 'currentStage'
           },
		   {
            title: '当前节点状态：1节点落实 2、申请办结 3、申请延期',
            align:"center",
            dataIndex: 'currentStatus'
           },
		   {
            title: '反馈所处阶段 007持续推进 081延期 084督办 085通报期',
            align:"center",
            dataIndex: 'feedbackStage'
           },
		   {
            title: '当前进度  百分比值',
            align:"center",
            dataIndex: 'progress'
           },
		   {
            title: '计划反馈时间',
            align:"center",
            dataIndex: 'planTime'
           },
		   {
            title: '最晚反馈时间与本记录时间比较',
            align:"center",
            dataIndex: 'mark'
           },
		   {
            title: '反馈时间',
            align:"center",
            dataIndex: 'feedbackTime'
           },
		   {
            title: '反馈内容',
            align:"center",
            dataIndex: 'feedbackContent'
           },
		   {
            title: '退回描述',
            align:"center",
            dataIndex: 'backDesc'
           },
		   {
            title: '责任领导',
            align:"center",
            dataIndex: 'headPersonMain'
           },
		   {
            title: '责任处室',
            align:"center",
            dataIndex: 'headDuty'
           },
		   {
            title: '责任人',
            align:"center",
            dataIndex: 'headPerson'
           },
		   {
            title: '审批事项',
            align:"center",
            dataIndex: 'examineItemList'
           },
		   {
            title: '投资计划',
            align:"center",
            dataIndex: 'investPlan'
           },
		   {
            title: '推进预期',
            align:"center",
            dataIndex: 'pushExpect'
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
		url: {
          list: "/data/workTaskDepartDetail/list",
          delete: "/data/workTaskDepartDetail/delete",
          deleteBatch: "/data/workTaskDepartDetail/deleteBatch",
          exportXlsUrl: "data/workTaskDepartDetail/exportXls",
          importExcelUrl: "data/workTaskDepartDetail/importExcel",
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