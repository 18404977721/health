<template>
  <a-card :bordered="false" class="card-area">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <!-- 搜索区域 -->
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="分组编码" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
              <a-input placeholder="请输入分级编码" v-model="queryParam.groupCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="分组名称" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
              <a-input placeholder="请输入名称查询" v-model="queryParam.groupName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="备注" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
              <a-input placeholder="请输入备注" v-model="queryParam.description"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="24">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>

    <!-- 操作按钮区域 -->
    <div class="table-operator"  style="margin-top: 5px">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <!--<a-button type="primary" icon="download" @click="handleExportXls">导出</a-button>-->
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :action="importExcelUrl" @change="handleImportExcel">-->
        <!--<a-button type="primary" icon="import">导入</a-button>-->
      <!--</a-upload>-->

      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" v-has="'btn:batDel'" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项&nbsp;&nbsp;
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
          <a @click="handleEdit(record)" >编辑</a>
          <a-divider type="vertical"  />
          <a @click="handleShowGropu(record.id)">排序</a>
          <a-divider type="vertical" />
          <a @click="handlePerssion(record.id)">授权</a>
          <a-divider type="vertical" />
           <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
              <a>删除</a>
            </a-popconfirm>
        </span>


      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <leader-group-modal ref="modalForm" @ok="modalFormOk"></leader-group-modal>
    <leader-group-detail-modal ref="modalDetail"></leader-group-detail-modal>
    <leader-group-show-modal ref="modalDetailShow"></leader-group-show-modal>
  </a-card>
</template>

<script>
  import LeaderGroupModal from './modules/LeaderGroupModal'
  import LeaderGroupDetailModal from './modules/LeaderGroupDetailModal'
  import LeaderGroupShowModal from './modules/LeaderGroupShowModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: "LeaderGroupList",
    mixins:[JeecgListMixin],
    components: {
      LeaderGroupModal,
      LeaderGroupDetailModal,
      LeaderGroupShowModal
    },
    data () {
      return {

        description: '领导分组管理页面',
        // 查询条件
        queryParam: {groupName:'',createTimeIsRange:[]},
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
            title: '领导分组名称',
            align:"center",
            dataIndex: 'groupName'
          },
          {
            title: '领导分组编码',
            align:"center",
            dataIndex: 'groupCode'
          },
          {
            title: '备注',
            align:"center",
            dataIndex: 'description'
          },
          {
            title: '排序',
            align:"center",
            dataIndex: 'sortNo'
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            align:"center",
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/common/leaderGroup/list",
          delete: "/common/leaderGroup/delete",
          deleteBatch: "/common/leaderGroup/deleteBatch",
          exportXlsUrl: "common/leaderGroup/exportXls",
          importExcelUrl: "common/leaderGroup/importExcel",
        },
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {

      handlePerssion: function(groupId){
       // alert(roleId);
        this.$refs.modalDetail.edit(groupId);
      },
      onChangeDate(date, dateString) {
        console.log(date, dateString);
      },
      handleShowGropu(groupId){
        this.$refs.modalDetailShow.show(groupId);
      },
    }
  }
</script>
<style scoped>
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