<template>
    <a-card :bordered="false">
        <!-- 查询区域 -->
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="24">
                    <a-col :md="6" :sm="8">
                        <a-form-item label="父机构ID">
                            <a-input placeholder="请输入上级单位ID" v-model="queryParam.parentId"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6" :sm="8">
                        <a-form-item label="单位">
                            <a-input hidden v-model="queryParam.departCode"></a-input>
                            <a-cascader :showSearch="filter" :options="options" placeholder="请选择单位" changeOnSelect
                                        @change="onAreaChange"/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="6" :sm="8">
                        <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
                            <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
                            <a-button type="primary" @click="searchReset" icon="reload"
                                      style="margin-left: 8px">重置</a-button>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <!-- 操作按钮区域 -->
        <div class="table-operator">
            <a-button @click="handleAdd" v-has="'btn:add'" type="primary" icon="plus">新增</a-button>
            <!--<a-button type="primary" icon="download" @click="handleExportXls">导出</a-button>-->
            <!--<a-upload name="file" :showUploadList="false" :multiple="false" :action="importExcelUrl" @change="handleImportExcel">-->
            <!--<a-button type="primary" icon="import">导入</a-button>-->
            <!--</a-upload>-->
            <a-dropdown v-if="selectedRowKeys.length > 0">
                <a-menu slot="overlay">
                    <a-menu-item key="1" v-has="'btn:batDel'" @click="batchDel">
                        <a-icon type="delete"/>
                        删除
                    </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px"> 批量操作
                    <a-icon type="down"/>
                </a-button>
            </a-dropdown>
        </div>

        <!-- table区域-begin -->
        <div>
            <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
                <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{selectedRowKeys.length
                }}</a>项
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
                    <a v-has="'btn:edit'" @click="handleEdit(record)">编辑</a>
                    <a-divider v-has="'btn:edit'" type="vertical"/>
                    <a-dropdown>
          <a class="ant-dropdown-link">
              省政府权限 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
                 <a-menu-item>
                <a v-has="'btn:assign'" @click="handleSzfAssignPerssion(record.id)">省政府交办授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:assign'" @click="handleSzfAssignSort(record.id)">省政府交办分组排序</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:cooperation'" @click="handleSzfCooperationPerssion(record.id)">省政府协办授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:cooperation'" @click="handleSzfCooperationSort(record.id)">省政府协办分组排序</a>
              </a-menu-item>
               </a-menu>
               </a-dropdown>
            <a-divider v-has="'btn:edit'" type="vertical"/>
             <a-dropdown>
          <a class="ant-dropdown-link">
              省委权限 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
                <a-menu-item>
                <a v-has="'btn:index'" @click="handleLeaderShowPerssion(record.id)">首页领导分组授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:index'" @click="handleLeaderShowSort(record.id)">首页领导分组排序</a>
              </a-menu-item>
               <a-menu-item>
                <a v-has="'btn:index'" @click="handleLeaderGroupPerssion(record.id)">批示分组授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:index'" @click="handleLeaderGroupSort(record.id)">批示分组排序</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:assign'" @click="handleAssignPerssion(record.id)">省委交办授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:assign'" @click="handleAssignSort(record.id)">省委交办分组排序</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:cooperation'" @click="handleCooperationPerssion(record.id)">省委协办授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:cooperation'" @click="handleCooperationSort(record.id)">省委协办分组排序</a>
              </a-menu-item>
                <a-menu-item>
              <a v-has="'btn:dataRole'" @click="handleDepartAreaRole(record.id)">开发区授权</a>
            </a-menu-item>
                <a-menu-item>
              <a v-has="'btn:dataRole'" @click="handleLeadaerDepart(record.id)">责任领导授权</a>
            </a-menu-item>
            <a-menu-item>
              <a v-has="'btn:dataRole'" @click="handleDepartServeLeadaer(record.id)">服务领导授权</a>
            </a-menu-item>
                <a-menu-item>
              <a v-has="'btn:dataRole'" @click="handleFileMeetingOrg(record.id)">文件会议填报组织授权</a>
            </a-menu-item>
               </a-menu>
               </a-dropdown>
            <a-divider v-has="'btn:edit'" type="vertical"/>
          <a-dropdown>
            <a class="ant-dropdown-link">
              更多 <a-icon type="down"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleEdit2(record)" v-has="'btn:edit2'">单位名称编辑</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:index'" @click="handleIndexPerssion(record.id)">首页部门授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:index'" @click="handleIndexSort(record.id)">首页分组排序</a>
              </a-menu-item>


              <a-menu-item>
                <a v-has="'btn:dataRole'" @click="handleDepartDataRole(record.id)">数据授权</a>
              </a-menu-item>
              <a-menu-item>
                <a v-has="'btn:taskRole'" @click="handleDepartTaskRole(record.id)">招商技改工程授权</a>
              </a-menu-item>

              <a-menu-item>
                <a-popconfirm v-has="'btn:del'" title="确定删除吗?" @confirm="() => handleDelete(record.id)">
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
        <sys-depart-modal2 ref="modalForm2" @ok="modalFormOk"></sys-depart-modal2>
        <sys-depart-modal ref="modalForm" @ok="modalFormOk"></sys-depart-modal>
        <sys-depart-index-modal ref="SysDepartIndexModal"></sys-depart-index-modal>
        <sys-depart-index-sort-modal ref="SysDepartIndexSortModal"></sys-depart-index-sort-modal>
        <sys-depart-leader-show-modal ref="SysDepartLeaderShowModal"></sys-depart-leader-show-modal>
        <sys-depart-leader-show-sort-modal ref="SysDepartLeaderShowSortModal"></sys-depart-leader-show-sort-modal>
        <sys-depart-leader-group-modal ref="SysDepartLeaderGroupModal"></sys-depart-leader-group-modal>
        <sys-depart-leader-group-sort-modal ref="SysDepartLeaderGroupSortModal"></sys-depart-leader-group-sort-modal>
        <sys-depart-assign-modal ref="SysDepartAssignModal"></sys-depart-assign-modal>
        <sys-depart-assign-sort-modal ref="SysDepartAssignSortModal"></sys-depart-assign-sort-modal>
        <sys-depart-cooperation-modal ref="SysDepartCooperationModal"></sys-depart-cooperation-modal>
        <sys-depart-cooperation-sort-modal ref="SysDepartCooperationSortModal"></sys-depart-cooperation-sort-modal>
        <sys-depart-szf-assign-modal ref="SysDepartSzfAssignModal"></sys-depart-szf-assign-modal>
        <sys-depart-szf-assign-sort-modal ref="SysDepartSzfAssignSortModal"></sys-depart-szf-assign-sort-modal>
        <sys-depart-szf-cooperation-modal ref="SysDepartSzfCooperationModal"></sys-depart-szf-cooperation-modal>
        <sys-depart-szf-cooperation-sort-modal
                ref="SysDepartSzfCooperationSortModal"></sys-depart-szf-cooperation-sort-modal>
        <sys-depart-data-role-modal ref="SysDepartDataRoleModal"></sys-depart-data-role-modal>
        <sys-depart-task-role-modal ref="SysDepartTaskRoleModal"></sys-depart-task-role-modal>
        <sys-dev-area-role-modal ref="SysDevAreaRoleModal"></sys-dev-area-role-modal>
        <leader-depart-modal ref="LeaderDepartModal"></leader-depart-modal>
        <sys-depart-serve-leader-modal ref="SysDepartServeLeaderModal"></sys-depart-serve-leader-modal>
        <file-meeting-org-modal ref="FileMeetingOrgModal"></file-meeting-org-modal>
    </a-card>
</template>

<script>
  import SysDepartModal from './modules/SysDepartModal'
  import SysDepartModal2 from './modules/SysDepartModal2'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import SysDepartIndexModal from './modules/SysDepartIndexModal'
  import SysDepartIndexSortModal from './modules/SysDepartIndexSortModal'
  import SysDepartLeaderShowModal from './modules/SysDepartLeaderShowModal'
  import SysDepartLeaderShowSortModal from './modules/SysDepartLeaderShowSortModal'
  import SysDepartLeaderGroupModal from './modules/SysDepartLeaderGroupModal'
  import SysDepartLeaderGroupSortModal from './modules/SysDepartLeaderGroupSortModal'
  import SysDepartAssignModal from './modules/SysDepartAssignModal'
  import SysDepartAssignSortModal from './modules/SysDepartAssignSortModal'
  import SysDepartCooperationModal from './modules/SysDepartCooperationModal'
  import SysDepartCooperationSortModal from './modules/SysDepartCooperationSortModal'
  import SysDepartSzfAssignModal from './modules/SysDepartSzfAssignModal'
  import SysDepartSzfAssignSortModal from './modules/SysDepartSzfAssignSortModal'
  import SysDepartSzfCooperationModal from './modules/SysDepartSzfCooperationModal'
  import SysDepartSzfCooperationSortModal from './modules/SysDepartSzfCooperationSortModal'
  import SysDepartDataRoleModal from './modules/SysDepartDataRoleModal'
  import SysDepartTaskRoleModal from './modules/SysDepartTaskRoleModal'
  import SysDevAreaRoleModal from './modules/SysDevAreaRoleModal'
  import LeaderDepartModal from './modules/LeaderDepartModal'
  import SysDepartServeLeaderModal from './modules/SysDepartServeLeaderModal'
  import FileMeetingOrgModal from './modules/FileMeetingOrgModal'
  import { getUsercenterAction } from '@/api/manage'

  export default {
    name: 'SysDepartList',
    mixins: [JeecgListMixin],
    components: {
      SysDepartModal,
      SysDepartModal2,
      SysDepartIndexModal,
      SysDepartIndexSortModal,
      SysDepartLeaderGroupModal,
      SysDepartLeaderGroupSortModal,
      SysDepartLeaderShowModal,
      SysDepartLeaderShowSortModal,
      SysDepartAssignModal,
      SysDepartAssignSortModal,
      SysDepartCooperationModal,
      SysDepartCooperationSortModal,
      SysDepartSzfAssignModal,
      SysDepartSzfAssignSortModal,
      SysDepartSzfCooperationModal,
      SysDepartSzfCooperationSortModal,
      SysDepartDataRoleModal,
      SysDepartTaskRoleModal,
      SysDevAreaRoleModal,
      LeaderDepartModal,
      SysDepartServeLeaderModal,
      FileMeetingOrgModal,
    },
    data() {
      return {
        description: '单位管理页面',
        options: [],
        filter: true,
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: 'center',
            customRender: function(t, r, index) {
              return parseInt(index) + 1
            }
          },
          // {
          //  title: '上级单位ID',
          //  align:"center",
          //  dataIndex: 'parentId'
          // },
          // {
          //  title: '单位编码',
          //  align:"center",
          //  dataIndex: 'departCode'
          // },
          {
            title: '单位名称',
            align: 'center',
            width: '300px',
            dataIndex: 'departName'
          },
          {
            title: '行政区划',
            align: 'center',
            width: '300px',
            dataIndex: 'regionCode'
          },
          {
            title: '所属行政区',
            align: 'center',
            width: '300px',
            dataIndex: 'regionName'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: '/sysdepart/sysDepart/list',
          delete: '/sysdepart/sysDepart/delete',
          deleteBatch: '/sysdepart/sysDepart/deleteBatch',
          exportXlsUrl: 'sysdepart/sysDepart/exportXls',
          importExcelUrl: 'sysdepart/sysDepart/importExcel'
        }
      }
    },
    computed: {
      importExcelUrl: function() {
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
      }
    },
    created() {
      this.getMsg()
    },
    methods: {
      //获取页面初始化数据
      getMsg() {
        var that = this
        var url = '/common/region/queryTreeListCascade'
        getUsercenterAction(url).then((res) => {
          if (res.success) {
            that.options = res.result
          }
        })
      },
      handleEdit2: function(record) {
        this.$refs.modalForm2.edit(record)
        this.$refs.modalForm2.title = '单位名称修改'
      },
      handleIndexPerssion: function(departId) {
        this.$refs.SysDepartIndexModal.edit(departId)
      },
      handleIndexSort: function(departId) {
        this.$refs.SysDepartIndexSortModal.show(departId)
      },
      handleLeaderShowPerssion: function(departId) {
        this.$refs.SysDepartLeaderShowModal.edit(departId)
      },
      handleLeaderShowSort: function(departId) {
        this.$refs.SysDepartLeaderShowSortModal.show(departId)
      },
      handleLeaderGroupPerssion: function(departId) {
        this.$refs.SysDepartLeaderGroupModal.edit(departId)
      },
      handleLeaderGroupSort: function(departId) {
        this.$refs.SysDepartLeaderGroupSortModal.show(departId)
      },
      //省委交办协办
      handleAssignPerssion: function(departId) {
        this.$refs.SysDepartAssignModal.edit(departId)
      },
      handleAssignSort: function(departId) {
        this.$refs.SysDepartAssignSortModal.show(departId)
      },
      handleCooperationPerssion: function(departId) {
        this.$refs.SysDepartCooperationModal.edit(departId)
      },
      handleCooperationSort: function(departId) {
        this.$refs.SysDepartCooperationSortModal.show(departId)
      },
      //省政府交办协办
      handleSzfAssignPerssion: function(departId) {
        this.$refs.SysDepartSzfAssignModal.edit(departId)
      },
      handleSzfAssignSort: function(departId) {
        this.$refs.SysDepartSzfAssignSortModal.show(departId)
      },
      handleSzfCooperationPerssion: function(departId) {
        this.$refs.SysDepartSzfCooperationModal.edit(departId)
      },
      handleSzfCooperationSort: function(departId) {
        this.$refs.SysDepartSzfCooperationSortModal.show(departId)
      },
      //单位数据权限授权
      handleDepartDataRole(departId) {
        this.$refs.SysDepartDataRoleModal.edit(departId)
      },
      //招商技改工程任务权限授权
      handleDepartTaskRole(departId) {
        this.$refs.SysDepartTaskRoleModal.edit(departId)
      },
      //区域变化的事件
      onAreaChange(value) {
        this.queryParam.departCode = value[value.length - 1]
      },
      //开发区权限授权
      handleDepartAreaRole(departId) {
        this.$refs.SysDevAreaRoleModal.edit(departId)
      },
      //责任领导授权
      handleLeadaerDepart(departId) {
        this.$refs.LeaderDepartModal.edit(departId)
      },
      //领导服务授权
      handleDepartServeLeadaer(departId) {
        this.$refs.SysDepartServeLeaderModal.edit(departId)
      },
      //文件会议填报组织授权
      handleFileMeetingOrg(departId) {
        this.$refs.FileMeetingOrgModal.edit(departId)
      }

    }
  }
</script>
<style lang="less" scoped>
    /** Button按钮间距 */
    .ant-btn {
        margin-left: 3px
    }

    .ant-card-body .table-operator {
        margin-bottom: 18px;
    }

    .ant-table-tbody .ant-table-row td {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .anty-row-operator button {
        margin: 0 5px
    }

    .ant-btn-danger {
        background-color: #ffffff
    }

    .ant-modal-cust-warp {
        height: 100%
    }

    .ant-modal-cust-warp .ant-modal-body {
        height: calc(100% - 110px) !important;
        overflow-y: auto
    }

    .ant-modal-cust-warp .ant-modal-content {
        height: 90% !important;
        overflow-y: hidden
    }
</style>