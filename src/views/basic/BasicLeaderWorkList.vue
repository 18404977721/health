<template>
  <a-card :bordered="false">
  <!--  &lt;!&ndash; 查询区域 &ndash;&gt;
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">

          <a-col :md="6" :sm="8">
            <a-form-item label="领导日常工作">
              <a-input placeholder="领导日常工作" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <a-col :md="6" :sm="8">
            <a-form-item label="领导名称">
              <a-input placeholder="请输入领导名称" v-model="queryParam.leaderId"></a-input>
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
    </div>-->
    <a-drawer
      :title="title"
      :maskClosable="true"
      width=650
      placement="right"
      :closable="true"
      @close="close"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="AddWithParam" type="primary" icon="plus">新增</a-button>
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
				<template slot="history" slot-scope="text, record">
					<p v-if="text == '1'">换岗</p>
					<p v-if="text == '0'">在职</p>
				</template>
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
    </a-drawer>
    <!-- 表单区域 -->
    <basic-leader-work-modal ref="modalForm" @ok="modalFormOk"></basic-leader-work-modal>
  </a-card>
</template>

<script>
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import { getUsercenterAction } from '@/api/manage';
  import BasicLeaderWorkModal from './modules/BasicLeaderWorkModal'
  export default {
    name: "BasicLeaderWorkList",
    mixins:[JeecgListMixin],
    components: {
      BasicLeaderWorkModal,
    },
    data () {
      return {
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
            title: '领导人',
            align:"center",
            dataIndex: 'leaderName'
           },{
            title: '领导日常工作内容',
            align:"center",
            dataIndex: 'name'
           },{
            title: '展示顺序',
            align:"center",
            dataIndex: 'sortOrder'
           },
					 {
					  title: '历史标志',
					  align:"center",
					  dataIndex: 'historyFlag',
						scopedSlots: { customRender: 'history' },
					 },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
            list: "/common/leaderWork/listWithParam",
            delete: "/common/leaderWork/delete",
            deleteBatch: "/common/leaderWork/deleteBatch",
            exportXlsUrl: "common/leaderWork/exportXls",
            importExcelUrl: "common/leaderWork/importExcel",
        },
        options: [],
        filter:true,
        //领导信息侧滑弹出需要用到的参数
        visible: false,
        leaderId:"",
        name:"",
        title:"领导日常工作安排",
      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    created() {
      //this.visible = true;
      //this.getMsg();
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
      show(leaderId,name){
        this.leaderId=leaderId;
        this.name = name;
        this.queryParam.leaderId = leaderId;
        //调用JeecgListMixin的刷新页面方法
        this.loadData();

        /*console.log(leaderId)
        console.log(leaderGroupCode)*/
        this.visible = true;

      },
      AddWithParam(){
        this.$refs.modalForm.addWithParam(this.leaderId,this.name);
        this.$refs.modalForm.title = "新增";
      },

      //放弃编辑按钮
      close () {
        //this.reset()
        this.$emit('close');
        this.visible = false;
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