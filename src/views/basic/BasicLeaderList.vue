<template>
  <a-card :bordered="false">

    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="领导名称">
              <a-input placeholder="请输入领导名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="单位">
              <a-input hidden v-model="queryParam.leaderGroupCode"></a-input>
              <a-cascader  :showSearch="filter" :options="options"  placeholder="请选择单位" changeOnSelect @change="onAreaChange" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="职务">
              <a-input placeholder="请输入职务" v-model="queryParam.duties"></a-input>
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
      <a-button @click="handleAdd" v-has="'btn:add'" type="primary" icon="plus">新增</a-button>

      <!--<a-button type="primary" icon="download" @click="handleExportXls">导出</a-button>-->
      <!--<a-upload name="file" :showUploadList="false" :multiple="false" :action="importExcelUrl" @change="handleImportExcel">-->
        <!--<a-button type="primary" icon="import">导入</a-button>-->
      <!--</a-upload>-->
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"  v-has="'btn:batDel'"><a-icon type="delete"/>删除</a-menu-item>
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

        <template slot="imgStyle" slot-scope="text,record">
          <!--{{record.imgPath}}-->
          <img :src="'http://59.195.205.101:8080'+record.imgPath" alt="" style="width:46px;height:63.5px;">
          <!-- <img
            v-else 
            :src="window.location.host+record.imgPath" alt="" style="width:46px;height:63.5px;"> -->
        </template>

        <template slot="displayStyle" slot-scope="text,record">
          <div v-if='record.display == "0"'>不显示</div>
          <div v-if='record.display == "1"'>显示</div>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)"  v-has="'btn:edit'">编辑</a>

          <a-divider type="vertical" v-has="'btn:manage1'"/>
          <!--<a-dropdown>-->
            <!--<a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
            <!--<a-menu slot="overlay">-->
              <!--<a-menu-item>-->
                <a @click="handleManageDepart(record.id,record.leaderGroupCode)" v-has="'btn:manage1'">所管理的部门</a>
          <a-divider type="vertical" v-has="'btn:manage2'"/>
              <!--</a-menu-item>-->
            <!--<a-divider type="vertical" />-->
              <!--<a-menu-item>-->
                <a @click="handleServiceDepart(record.id,record.leaderGroupCode)" v-has="'btn:manage2'">服务处室/科室</a>
          <a-divider v-has="'btn:del'" type="vertical" />
              <!--</a-menu-item>-->
              <!--<a-menu-item>-->
                <a-popconfirm title="确定删除吗?"  v-has="'btn:del'" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              <!--</a-menu-item>-->
            <!--</a-menu>-->
          <!--</a-dropdown>-->
          <a-divider type="vertical" v-has="'btn:manage3'"/>
          <!--<a-dropdown>-->
          <!--<a class="ant-dropdown-link">更多 <a-icon type="down" /></a>-->
          <!--<a-menu slot="overlay">-->
          <!--<a-menu-item>-->
                <a @click="handleLeaderWork(record.id,record.name)" v-has="'btn:manage3'">所管理的日常工作</a>

        </span>

      </a-table>
    </div>
    <!-- table区域-end -->

    <!-- 表单区域 -->
    <basicLeader-modal ref="modalForm" @ok="modalFormOk"></basicLeader-modal>
    <leader-manage-depart-modal ref="leaderManageDepartModal"></leader-manage-depart-modal>
    <leader-service-depart-modal ref="leaderServiceDepartModal"></leader-service-depart-modal>
    <basic-leader-work-list ref="BasicLeaderWorkList" ></basic-leader-work-list>
  </a-card>
</template>

<script>
  import BasicLeaderModal from './modules/BasicLeaderModal'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import LeaderManageDepartModal from './modules/LeaderManageDepartModal'
  import LeaderServiceDepartModal from './modules/LeaderServiceDepartModal'
  import { getUsercenterAction } from '@/api/manage';
  import BasicLeaderWorkList from './BasicLeaderWorkList'
  export default {
    name: "BasicLeaderList",
    mixins:[JeecgListMixin],
    components: {
      BasicLeaderWorkList,
      BasicLeaderModal,
      LeaderManageDepartModal,
      LeaderServiceDepartModal
    },
    data () {
      return {
        description: '领导信息管理管理页面',
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
           },{
            title: '领导名称',
            align:"center",
            dataIndex: 'name',
            width:'100px',
           },{
            title: '职务',
            align:"center",
            dataIndex: 'duties',
            width:'100px',
           },
          // {
          //   title: '领导组编码',
          //   align:"center",
          //   dataIndex: 'leaderGroupCode',
          //   width:'100px',
          //  },
          {
            title: '单位',
            align:"center",
            dataIndex: 'departName',
            width:'300px',
          },
          {
            title: '图片地址',
            align:"center",
            dataIndex: 'imgPath',
            scopedSlots: { customRender: 'imgStyle' },
            width:'100px',
           },{
            title: '排序',
            align:"center",
            dataIndex: 'sortOrder',
            width:'100px',
           },{
            title: '是否显示',
            align:"center",
            dataIndex: 'display',
            scopedSlots: { customRender: 'displayStyle' },
            width:'100px',
           },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
            list: "/common/leader/list",
            delete: "/common/leader/delete",
            deleteBatch: "/common/leader/deleteBatch",
            exportXlsUrl: "common/leader/exportXls",
            importExcelUrl: "common/leader/importExcel",
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
        this.queryParam.leaderGroupCode = value[value.length-1];
      },
      handleManageDepart: function(leaderId,leaderGroupCode){
         //alert(roleId);
        this.$refs.leaderManageDepartModal.show(leaderId,leaderGroupCode);
      },
      handleServiceDepart: function(leaderId,leaderGroupCode){
        //alert(roleId);
        this.$refs.leaderServiceDepartModal.show(leaderId,leaderGroupCode);
      },
      handleLeaderWork: function(leaderId,name){
        //alert(roleId);
        //alert(record);
        this.$refs.BasicLeaderWorkList.show(leaderId,name);
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